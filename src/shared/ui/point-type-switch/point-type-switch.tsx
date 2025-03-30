import { View } from "react-native"
import { Button } from "../button/button"
import Text from "../text/text"
import { useActiveStore } from "../../model/use-active-store"


export const PointTypeSwitch = () => {
    const { active, setActive } = useActiveStore('pointSwitch', 'Point')


    return (
        <View className="flex flex-row items-center justify-between w-[120px] h-[35px] border border-[#E6E6E6] rounded-[14.5px]">
            <Button variant="custom" className={`${active === 'Point' ? "bg-white" : 'bg-transparent'} rounded-[12.5px] flex items-center justify-center h-full w-[58px]`} onPress={() => setActive('Point')}>
                <Text weight="bold" className={`${active === 'Point' ? "text-black" : 'text-white'} text-[12px]`}>Point</Text>
            </Button>
            <Button variant="custom" className={`${active === 'Chat' ? "bg-white" : 'bg-transparent'} rounded-[12.5px] flex items-center justify-center h-full w-[58px]`} onPress={() => setActive('Chat')}>
                <Text weight="bold" className={`${active === 'Chat' ? "text-black" : 'text-white'} text-[12px]`}>Chat</Text>
            </Button>
        </View>
    )
}
