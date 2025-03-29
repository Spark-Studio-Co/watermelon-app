import React, { useState, useEffect } from "react"
import { MainLayout } from "../../layouts/main-layout"
import { View, Image, Alert } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { Button } from "@/src/shared/ui/button/button"
import { BetPlaceTab } from "@/src/features/auction/ui/bet-place-tab/bet-place-tab"
import { AuctionOfferModal } from "@/src/features/auction/ui/auction-offer-modal/auction-offer-modal"

// Bets are already sorted by points (highest to lowest)
const bets = [
    {
        points: 23,
        date: "2025-03-30",
        time: "14:00"
    },
    {
        points: 20,
        date: "2025-03-30",
        time: "15:00"
    },
    {
        points: 15,
        date: "2025-03-30",
        time: "16:00"
    },
    {
        points: 13,
        date: "2025-03-30",
        time: "17:00"
    },
    {
        points: 10,
        date: "2025-03-30",
        time: "18:00"
    }
]

export const AuctionInnerScreen = () => {
    const [timeLeft, setTimeLeft] = useState({
        hours: 4,
        minutes: 20,
        seconds: 0
    })
    const [offerModalVisible, setOfferModalVisible] = useState(false)

    useEffect(() => {
        if (timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
            return
        }

        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => {
                const newSeconds = prevTime.seconds - 1
                const newMinutes = newSeconds < 0 ? prevTime.minutes - 1 : prevTime.minutes
                const newHours = newMinutes < 0 ? prevTime.hours - 1 : prevTime.hours

                return {
                    hours: newHours,
                    minutes: newMinutes < 0 ? 59 : newMinutes,
                    seconds: newSeconds < 0 ? 59 : newSeconds
                }
            })
        }, 1000)

        return () => clearInterval(intervalId)
    }, [timeLeft])

    const formatTime = (value: number) => {
        return value < 10 ? `0${value}` : `${value}`
    }

    return (
        <MainLayout>
            <View className="flex flex-col items-end mt-4">
                <Text weight="bold" className="text-white text-[24px]">Point #12123</Text>
            </View>
            <Image source={require('@/src/images/point_image.png')} className="w-full h-[182px] rounded-[12px] mt-1" />
            <View className="flex flex-col items-center w-full rounded-[12px]" style={{ boxShadow: '0px 4px 4px 0px #11D4994D' }}>
                <View className="flex flex-row items-center w-[95%] justify-center border border-white rounded-[15px] h-[65px] mt-8">
                    <Text weight="regular" className="text-white text-[16px]">Last</Text>
                    <Text weight="regular" className="text-white text-[32px] ml-1">32</Text>
                    <Text weight="regular" className="text-white text-[16px] ml-[18px]">Start</Text>
                    <Text weight="regular" className="text-white text-[32px] ml-1">14</Text>
                    <Button
                        variant="custom"
                        className="bg-[#14A278] rounded-[6px] ml-14 w-[132px] h-[42px] flex items-center justify-center"
                        onPress={() => setOfferModalVisible(true)}
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
                {bets.map((bet, index) => (
                    <BetPlaceTab
                        key={index}
                        points={bet.points}
                        date={bet.date}
                        time={bet.time}
                        place={index + 1} // Assign place based on index (1-based)
                    />
                ))}
            </View>

            {/* Auction Offer Modal */}
            <AuctionOfferModal
                visible={offerModalVisible}
                onClose={() => setOfferModalVisible(false)}
                onSaveOffer={() => {
                    setOfferModalVisible(false)
                }}
            />
        </MainLayout>
    )
}


