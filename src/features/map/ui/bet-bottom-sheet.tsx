import AddPcIcon from "@/src/shared/icons/add-pc-icon"
import Text from "@/src/shared/ui/text/text"
import { View } from "react-native"
import { Button } from "@/src/shared/ui/button/button"
import { Input } from "@/src/shared/ui/input/input"

import { useVisibleStore } from "@/src/shared/model/use-visible-store"
import { useActiveStore } from "@/src/shared/model/use-active-store"
import { useTypePointStore } from "../model/type-point-store"
import { useEffect, useState, useRef } from "react"

export const BetBottomContent = ({ onSavePoint }: { onSavePoint: () => void }) => {
    const { close } = useVisibleStore('bet')
    const { active, toggle } = useActiveStore('bet', '')
    const { type, setType } = useTypePointStore()
    const [activeBet, setActiveBet] = useState('')
    const [value, setValue] = useState('')
    const [isBetSet, setIsBetSet] = useState(false)
    const hasMadeBet = useRef(false)

    const bets = ['Pc 5', 'Pc 10', 'Pc 20', 'Pc 50', 'Pc 100', 'Pc 200', 'Pc 500']

    const handleMakeBet = () => {
        if (isBetSet && type && (activeBet || value)) {
            hasMadeBet.current = true;
            onSavePoint()
            setTimeout(() => close(), 500)
        }
    }

    useEffect(() => {
        if (value) {
            if (active) {
                toggle('');
            }
            setActiveBet('');
            setIsBetSet(true);
        } else if (active) {
            setIsBetSet(true);
        } else {
            setActiveBet('');
            setIsBetSet(false);
        }
    }, [value, active]);

    useEffect(() => {
        return () => {
            if (!hasMadeBet.current) {
                setType('');
            }
            hasMadeBet.current = false;
        };
    }, []);

    return (
        <View className="flex items-center flex-col h-[305px] w-[95%] mx-auto">
            <View className="flex justify-between flex-row items-center w-full mt-1.5">
                <Text weight="bold" className=" text-white text-[24px]">new point</Text>
                <View className="flex flex-row gap-x-2.5">
                    <Button variant="custom" className="bg-[#F3F4F5] rounded-[4px]">
                        <AddPcIcon />
                    </Button>
                    <Text weight="bold" className="text-white text-[16px]">Pc 12,580</Text>
                </View>
            </View>
            <View className="bg-[#C4C4C4] opacity-[50%] w-full h-[1px] mt-2" />
            <Text weight="bold" className="mt-5 text-white text-[20px]">Начальная ставка</Text>
            <View className="flex flex-row w-[75%] gap-x-2 justify-center items-center mt-5">
                <Input keyboardType="numeric" returnKeyType="done"
                    type="numeric" placeholder='' value={activeBet || value} variant="point" className="w-[220px]" onChangeText={(text: string) => {
                        setValue(text);
                    }} />
                <Button
                    variant="custom"
                    className={`px-4 py-3.5 rounded-[6px] ${isBetSet && type && (activeBet || value) ? 'bg-[#14A278]' : 'bg-[#14A278] opacity-50'}`}
                    onPress={handleMakeBet}
                    disabled={!type || (!activeBet && !value)}>
                    <Text weight="bold" className="text-white text-[11.74px]">Make a bet</Text>
                </Button>
            </View>
            <View className="flex flex-row gap-x-2 mt-8">
                {bets.map((bet) => (
                    <Button
                        key={bet}
                        variant="bet"
                        className={`${active === bet ? 'bg-black border-black' : "bg-[#F3F4F5] border-[#0000000D]"}`}
                        onPress={() => {
                            toggle(bet)
                            setActiveBet(bet)
                        }}
                    >
                        <Text weight="medium" className="text-black text-[12px]" style={{ color: active === bet ? '#FFFF' : '#000000' }}>{bet}</Text>
                    </Button>
                ))}
            </View>
        </View>
    )
}
