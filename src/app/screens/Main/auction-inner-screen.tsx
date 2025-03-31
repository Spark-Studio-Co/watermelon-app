import React, { useState, useEffect } from "react"
import { MainLayout } from "../../layouts/main-layout"
import { View, Image } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { Button } from "@/src/shared/ui/button/button"
import { BetPlaceTab } from "@/src/features/auction/ui/bet-place-tab/bet-place-tab"
import { AuctionOfferModal } from "@/src/features/auction/ui/auction-offer-modal/auction-offer-modal"
import { WinModal } from "@/src/features/auction/ui/win-modal/win-modal"
import { useNavigation } from "@react-navigation/native"

import { bets } from "@/src/features/auction/lib/bets"

export const AuctionInnerScreen = () => {
    const navigation = useNavigation()
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    })
    const [offerModalVisible, setOfferModalVisible] = useState(false)
    const [winModalVisible, setWinModalVisible] = useState(false)

    const handleCloseWinModal = () => {
        setWinModalVisible(false)
        setTimeout(() => {
            navigation.navigate("PrivatePointCreation" as never)
        }, 500)
    }

    useEffect(() => {
        if (timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
            if (bets.length > 0) {
                const highestPoints = Math.max(...bets.map(bet => bet.points));
                if (highestPoints) {
                    setWinModalVisible(true);
                }
            }
            return;
        }

        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => {
                const newSeconds = prevTime.seconds - 1
                const newMinutes = newSeconds < 0 ? prevTime.minutes - 1 : prevTime.minutes
                const newHours = newMinutes < 0 ? prevTime.hours - 1 : prevTime.hours

                const newTime = {
                    hours: newHours,
                    minutes: newMinutes < 0 ? 59 : newMinutes,
                    seconds: newSeconds < 0 ? 59 : newSeconds
                };

                if (newTime.hours === 0 && newTime.minutes === 0 && newTime.seconds === 0) {
                    if (bets.length > 0) {
                        const highestPoints = Math.max(...bets.map(bet => bet.points));
                        if (highestPoints) {
                            setTimeout(() => setWinModalVisible(true), 500);
                        }
                    }
                }

                return newTime;
            })
        }, 1000)

        return () => clearInterval(intervalId)
    }, [timeLeft, bets])

    const formatTime = (value: number) => {
        return value < 10 ? `0${value}` : `${value}`
    }

    const handlePlaceOffer = () => {
        setOfferModalVisible(true)
    }


    useEffect(() => {
        if (bets.length === 0) return
        const highestPoints = Math.max(...bets.map(bet => bet.points))
        if (highestPoints && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) return setWinModalVisible(true)
    }, [bets])

    return (
        <MainLayout>
            <View className="flex flex-col items-end mt-4">
                <Text weight="bold" className="text-white text-[24px]">Point #12123</Text>
            </View>
            <Image source={require('@/src/images/point_image.png')} className="w-full h-[182px] rounded-[12px] mt-1" />
            <View className="flex flex-col items-center w-full rounded-[12px]" style={{ boxShadow: '0px 4px 4px 0px #11D4994D' }}>
                <View className="flex flex-row items-center w-[95%] justify-center border border-white rounded-[15px] h-[65px] mt-8">
                    <Text weight="regular" className="text-white text-[16px]">Last</Text>
                    <Text weight="regular" className="text-white text-[24px] ml-1">{bets[0].points}</Text>
                    <Text weight="regular" className="text-white text-[16px] ml-[18px]">Start</Text>
                    <Text weight="regular" className="text-white text-[24px] ml-1"> {bets[bets.length - 1].points}</Text>
                    <Button
                        variant="custom"
                        className="bg-[#14A278] rounded-[6px] ml-14 w-[132px] h-[42px] flex items-center justify-center"
                        onPress={handlePlaceOffer}
                    >
                        <Text weight="regular" className="text-white text-[16px]">Place Offer</Text>
                    </Button>
                </View>
                <View className="flex flex-row items-center mt-8 mb-8 gap-x-2">
                    <Text weight="regular" className="text-white text-[20px]">TIME</Text>
                    <View className="flex flex-row items-center justify-center">
                        <Text weight="bold" className="text-white text-[40px]">
                            {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
                        </Text>
                    </View>
                </View>
            </View>
            <View className="flex flex-col items-center w-full gap-y-2.5 mt-7">
                {bets.sort((a, b) => b.points - a.points).map((bet, index) => (
                    <BetPlaceTab
                        key={index}
                        points={bet.points}
                        date={bet.date}
                        time={bet.time}
                        place={index + 1}
                    />
                ))}
            </View>
            <AuctionOfferModal
                visible={offerModalVisible}
                onClose={() => {
                    setOfferModalVisible(false);
                    if (timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
                        setTimeout(() => {
                            setWinModalVisible(true);
                        }, 1000);
                    }
                }}
                onSaveOffer={() => {
                    setOfferModalVisible(false);
                }}
            />
            <WinModal
                visible={winModalVisible}
                onClose={handleCloseWinModal}
            />
        </MainLayout>
    )
}


