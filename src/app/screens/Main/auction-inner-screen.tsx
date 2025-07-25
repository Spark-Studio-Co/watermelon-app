import React, { useState, useEffect, useMemo, useRef } from "react";
import { MainLayout } from "../../layouts/main-layout";
import { View, Image, Dimensions } from "react-native";
import Text from "@/src/shared/ui/text/text";
import { Button } from "@/src/shared/ui/button/button";
import { BetPlaceTab } from "@/src/features/auction/ui/bet-place-tab/bet-place-tab";
import { AuctionOfferModal } from "@/src/features/auction/ui/auction-offer-modal/auction-offer-modal";
import { WinModal } from "@/src/features/auction/ui/win-modal/win-modal";
import { BetSuccessModal } from "@/src/features/auction/ui/bet-success-modal/bet-success-modal";
import { Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { customMapStyle } from "@/src/features/map/config/map-styles";

import { useBidsData } from "@/src/entities/auction/api/use-bids-data";
import { useMakeBid } from "@/src/entities/auction/api/use-make-bid";
import { useAuctionWin } from "@/src/entities/auction/api/use-auction-win";

export const AuctionInnerScreen = ({
  route,
}: {
  route: {
    params: {
      id: string;
      name: string;
      start: number;
      startDate: string;
      endDate: string;
      latitude?: number;
      longitude?: number;
      type: string;
    };
  };
}) => {
  const hasSeenWinModal = useRef(false);
  const { id, name, start, startDate, endDate, latitude, longitude, type } =
    route.params;
  const [mapRegion, setMapRegion] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);
  const { data: bids, refetch } = useBidsData(id);
  const { mutate: makeBid } = useMakeBid();
  const { data: isWin } = useAuctionWin(id);

  const getMarkerBorderColor = (pointType: string) => {
    switch (pointType) {
      case "premium":
        return "#A009CD";
      case "chat":
        return "#93E0FF";
      case "standard":
        return "#FFFFFF";
      default:
        return "";
    }
  };

  const handleMakeBid = (bidAmount: number) => {
    // Reset bid success state
    setBidSuccessful(false);

    if (
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0
    ) {
      Alert.alert("Ошибка", "⛔ Нельзя сделать ставку: таймер истёк.");
      setOfferModalVisible(false); // Close the offer modal on error
      return;
    }

    // Принудительно обновим ставки перед проверкой
    refetch()
      .then((res) => {
        const latestBids = res.data;
        const latestHighest =
          latestBids && latestBids.length > 0
            ? Math.max(...latestBids.map((bid: any) => bid.bidAmount || 0))
            : 0;

        if (bidAmount <= latestHighest || bidAmount < start) {
          Alert.alert(
            "Ошибка",
            `Ставка должна быть выше текущей (${latestHighest}) и выше стартовой (${start})`
          );
          setOfferModalVisible(false); // Close the offer modal on error
          return;
        }

        makeBid(
          { auctionId: id, bidAmount },
          {
            onSuccess: () => {
              console.log("✅ Ставка успешно сделана");
              refetch(); // обновим снова после успеха
              // Set bid as successful
              setBidSuccessful(true);
              // Close the offer modal on success
              setOfferModalVisible(false);
            },
            onError: (error: any) => {
              console.error(
                "❌ Ошибка при ставке:",
                error?.response?.data || error
              );
              Alert.alert(
                "Ошибка",
                error?.response?.data?.message || "Не удалось сделать ставку"
              );
              setOfferModalVisible(false); // Close the offer modal on error
              setBidSuccessful(false);
            },
          }
        );
      })
      .catch((error) => {
        console.error("❌ Ошибка при получении ставок:", error);
        Alert.alert("Ошибка", "Не удалось получить текущие ставки");
        setOfferModalVisible(false); // Close the offer modal on error
        setBidSuccessful(false);
      });
  };

  const calculateTimeLeft = () => {
    try {
      const now = new Date();
      if (!endDate || isNaN(new Date(endDate).getTime())) {
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      const end = new Date(endDate);

      if (now >= end) {
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      const diff = end.getTime() - now.getTime();

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      return { hours, minutes, seconds };
    } catch (error) {
      console.error("Error calculating time left:", error);
      return { hours: 0, minutes: 0, seconds: 0 };
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [offerModalVisible, setOfferModalVisible] = useState(false);
  const [winModalVisible, setWinModalVisible] = useState(false);
  const [bidSuccessful, setBidSuccessful] = useState(false);

  const highestBid = useMemo(() => {
    if (!bids || bids.length === 0) return 0;
    return Math.max(...bids.map((bid: any) => bid.bidAmount || 0));
  }, [bids]);

  const handleCloseWinModal = () => {
    hasSeenWinModal.current = true;
    setWinModalVisible(false);
  };

  useEffect(() => {
    const checkWinCondition = () => {
      const now = new Date();
      const end = new Date(endDate);

      const auctionEnded = !isNaN(end.getTime()) && now >= end;
      const hasBids = bids && bids.length > 0 && highestBid > 0;

      if (auctionEnded && hasBids && !hasSeenWinModal.current) {
        hasSeenWinModal.current = true;
        setWinModalVisible(true);
      }
    };

    checkWinCondition(); // сразу при монтировании

    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
      checkWinCondition(); // также периодически, пока открыт экран
    }, 1000);

    return () => clearInterval(intervalId);
  }, [bids, highestBid, endDate]);

  useEffect(() => {
    if (latitude && longitude) {
      setMapRegion({
        latitude,
        longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  }, [latitude, longitude]);

  const formatTime = (value: number) => {
    return value < 10 ? `0${value}` : `${value}`;
  };

  const handlePlaceOffer = () => {
    setOfferModalVisible(true);
  };

  return (
    <MainLayout>
      <View className="flex flex-col items-end mt-4">
        <Text weight="bold" className="text-white text-[24px]">
          {name}
        </Text>
      </View>
      <View className="w-full h-[182px] rounded-[12px] mt-1 overflow-hidden">
        {mapRegion && latitude && longitude ? (
          <MapView
            style={{ width: "100%", height: "100%" }}
            region={mapRegion}
            customMapStyle={customMapStyle}
            scrollEnabled={false}
            zoomEnabled={false}
            rotateEnabled={false}
            pitchEnabled={false}
            mapType="standard"
            showsPointsOfInterest={false}
            showsBuildings={false}
            showsTraffic={false}
            showsIndoors={false}
          >
            <Marker coordinate={{ latitude, longitude }}>
              <View
                className="bg-[#2E2E2E] w-[25px] h-[25px] rounded-full"
                style={{
                  borderColor: getMarkerBorderColor(type),
                  borderWidth: 2,
                }}
              />
            </Marker>
          </MapView>
        ) : (
          <Image
            source={require("@/src/images/point_image.png")}
            className="w-full h-[182px]"
          />
        )}
      </View>
      <View
        className="flex flex-col items-center w-full rounded-[12px]"
        style={{ boxShadow: "0px 4px 4px 0px #11D4994D" }}
      >
        <View className="flex flex-row items-center w-[95%] justify-center border border-white rounded-[15px] h-[65px] mt-8">
          <Text weight="regular" className="text-white text-[16px]">
            Last
          </Text>
          <Text weight="regular" className="text-white text-[24px] ml-1">
            {highestBid || 0}
          </Text>
          <Text weight="regular" className="text-white text-[16px] ml-[18px]">
            Start
          </Text>
          <Text weight="regular" className="text-white text-[24px] ml-1">
            {start}
          </Text>
          <Button
            variant="custom"
            className={`rounded-[6px] ml-14 w-[132px] h-[42px] flex items-center justify-center bg-[#14A278] ${timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? "opacity-40" : "opacity-100"}`}
            onPress={handlePlaceOffer}
            disabled={
              timeLeft.hours === 0 &&
              timeLeft.minutes === 0 &&
              timeLeft.seconds === 0
            }
          >
            <Text weight="regular" className="text-white text-[16px]">
              Place Offer
            </Text>
          </Button>
        </View>
        <View className="flex flex-col items-center mt-8 mb-8 gap-y-2">
          <Text weight="regular" className="text-white text-[20px]">
            TIME LEFT
          </Text>
          <View className="flex flex-row items-center justify-center">
            <Text weight="bold" className="text-white text-[40px]">
              {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:
              {formatTime(timeLeft.seconds)}
            </Text>
          </View>
          <View className="flex flex-row justify-between w-full mt-2 px-4">
            <View className="flex flex-col items-center">
              <Text weight="regular" className="text-white text-[14px]">
                Start Date
              </Text>
              <Text weight="medium" className="text-white text-[16px]">
                {startDate && !isNaN(new Date(startDate).getTime())
                  ? new Date(startDate).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "Pending"}
              </Text>
              <Text weight="regular" className="text-white text-[14px]">
                {startDate && !isNaN(new Date(startDate).getTime())
                  ? new Date(startDate).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </Text>
            </View>
            <View className="flex flex-col items-center">
              <Text weight="regular" className="text-white text-[14px]">
                End Date
              </Text>
              <Text weight="medium" className="text-white text-[16px]">
                {endDate && !isNaN(new Date(endDate).getTime())
                  ? new Date(endDate).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "Pending"}
              </Text>
              <Text weight="regular" className="text-white text-[14px]">
                {endDate && !isNaN(new Date(endDate).getTime())
                  ? new Date(endDate).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View className="flex flex-col items-center w-full gap-y-2.5 mt-7">
        {Array.isArray(bids) && bids.length > 0 ? (
          [...bids]
            .sort((a, b) => (b.bidAmount || 0) - (a.bidAmount || 0))
            .map((bid: any, index: number) => {
              const bidDate = bid.bidTime || bid.createdAt;
              const createdAt = bidDate ? new Date(bidDate) : null;
              const formattedDate = createdAt
                ? createdAt.toISOString().split("T")[0]
                : "";
              const formattedTime = createdAt
                ? `${createdAt.getHours().toString().padStart(2, "0")}:${createdAt.getMinutes().toString().padStart(2, "0")}`
                : "";

              return (
                <BetPlaceTab
                  key={bid.id || `bid-${index}`}
                  points={bid.bidAmount || 0}
                  date={formattedDate || ""}
                  time={formattedTime || ""}
                  place={index + 1}
                />
              );
            })
        ) : (
          <Text weight="regular" className="text-white text-[16px] mt-4">
            No bids yet
          </Text>
        )}
      </View>
      <AuctionOfferModal
        name={name}
        visible={offerModalVisible}
        onClose={() => {
          setOfferModalVisible(false);
          if (
            timeLeft.hours === 0 &&
            timeLeft.minutes === 0 &&
            timeLeft.seconds === 0 &&
            highestBid > 0
          ) {
            setTimeout(() => {
              setWinModalVisible(true);
            }, 1000);
          }
        }}
        onSaveOffer={(points: number) => {
          // Don't close the modal here - let the API response determine what happens
          handleMakeBid(points);
        }}
        start={start}
      />
      <WinModal
        name={name}
        id={isWin?.markerId}
        visible={winModalVisible}
        onClose={handleCloseWinModal}
        type={type}
      />
      <BetSuccessModal
        visible={bidSuccessful}
        onClose={() => setBidSuccessful(false)}
      />
    </MainLayout>
  );
};
