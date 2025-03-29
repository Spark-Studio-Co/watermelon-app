import React, { useState, useEffect, useRef } from "react"
import { View, Modal } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { Button } from "@/src/shared/ui/button/button"
import { Input } from "@/src/shared/ui/input/input"
import AddPcIcon from "@/src/shared/icons/add-pc-icon"
import { useActiveStore } from "@/src/shared/model/use-active-store"
import CloseModalIcon from "@/src/shared/icons/close-modal-icon"
import { BetSuccessModal } from "../bet-success-modal/bet-success-modal"

interface AuctionOfferModalProps {
    visible: boolean
    onClose: () => void
    onSaveOffer: () => void
}

export const AuctionOfferModal = ({ visible, onClose, onSaveOffer }: AuctionOfferModalProps) => {
    const { active, toggle } = useActiveStore('offer', '')
    const [activeOffer, setActiveOffer] = useState('')
    const [value, setValue] = useState('')
    const [isOfferSet, setIsOfferSet] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const hasMadeOffer = useRef(false)

    const offers = ['Pc 5', 'Pc 10', 'Pc 20', 'Pc 50', 'Pc 100', 'Pc 200', 'Pc 500']

    const handleMakeOffer = () => {
        if (isOfferSet && (activeOffer || value)) {
            hasMadeOffer.current = true
            onSaveOffer()
            setShowSuccessModal(true)
        }
    }

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false)
        onClose()
    }

    useEffect(() => {
        if (value) {
            if (active) {
                toggle('')
            }
            setActiveOffer('')
            setIsOfferSet(true)
        } else if (active) {
            setIsOfferSet(true)
        } else {
            setActiveOffer('')
            setIsOfferSet(false)
        }
    }, [value, active])

    useEffect(() => {
        return () => {
            hasMadeOffer.current = false
        }
    }, [])

    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}
            >
                <View className="flex-1 justify-center items-center bg-black/70">
                    <View className="bg-[#1B1C1E] rounded-[12px] w-[90%] max-w-[400px]">
                        <Button variant="custom" className="absolute -top-4 right-0" onPress={onClose}>
                            <CloseModalIcon />
                        </Button>
                        <View className="flex items-center flex-col w-[95%] mx-auto">
                            <View className="flex justify-between flex-row items-center w-full mt-4">
                                <Text weight="bold" className="text-white text-[24px]">Point #12123</Text>
                                <View className="flex flex-row gap-x-2.5">
                                    <Button variant="custom" className="bg-[#F3F4F5] rounded-[4px]">
                                        <AddPcIcon />
                                    </Button>
                                    <Text weight="bold" className="text-white text-[16px]">Pc 12,580</Text>
                                </View>
                            </View>
                            <View className="bg-[#C4C4C4] opacity-[50%] w-full h-[1px] mt-2" />
                            <View className="flex flex-row w-[70%] gap-x-2 justify-center items-center mt-5">
                                <Input
                                    keyboardType="numeric"
                                    returnKeyType="done"
                                    type="numeric"
                                    placeholder=''
                                    value={activeOffer || value}
                                    variant="point"
                                    className="w-[79%]"
                                    onChangeText={(text: string) => {
                                        setValue(text);
                                    }}
                                />
                                <Button
                                    variant="custom"
                                    className={`px-4 py-3.5 rounded-[6px] ${isOfferSet && (activeOffer || value) ? 'bg-[#14A278]' : 'bg-[#14A278] opacity-50'}`}
                                    onPress={handleMakeOffer}
                                    disabled={!activeOffer && !value}>
                                    <Text weight="bold" className="text-white text-[11.74px]">Make a bet</Text>
                                </Button>
                            </View>
                            <View className="flex flex-row gap-x-1.5 mt-8 mb-8">
                                {offers.map((offer) => (
                                    <Button
                                        key={offer}
                                        variant="bet"
                                        className={`${active === offer ? 'bg-black border-black' : "bg-[#F3F4F5] border-[#0000000D]"}`}
                                        onPress={() => {
                                            toggle(offer)
                                            setActiveOffer(offer)
                                        }}
                                    >
                                        <Text weight="medium" className="text-black text-[12px]" style={{ color: active === offer ? '#FFFFFF' : '#000000' }}>{offer}</Text>
                                    </Button>
                                ))}
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <BetSuccessModal
                visible={showSuccessModal}
                onClose={handleSuccessModalClose}
            />
        </>
    )
}


