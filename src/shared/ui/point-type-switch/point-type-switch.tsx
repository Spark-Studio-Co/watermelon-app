import { View } from "react-native";
import { Button } from "../button/button";
import Text from "../text/text";

interface Props {
    value: string;
    onChange: (type: string) => void;
}

export const PointTypeSwitch = ({ value, onChange }: Props) => {
    return (
        <View className="flex flex-row items-center justify-between w-[120px] h-[35px] border border-[#E6E6E6] rounded-[14.5px]">
            <Button
                variant="custom"
                className={`${value === 'standard' ? "bg-white" : 'bg-transparent'} rounded-[12.5px] flex items-center justify-center h-full w-[58px]`}
                onPress={() => onChange('standard')}
            >
                <Text weight="bold" className={`${value === 'standard' ? "text-black" : 'text-white'} text-[12px]`}>Point</Text>
            </Button>
            <Button
                variant="custom"
                className={`${value === 'chat' ? "bg-white" : 'bg-transparent'} rounded-[12.5px] flex items-center justify-center h-full w-[58px]`}
                onPress={() => onChange('chat')}
            >
                <Text weight="bold" className={`${value === 'chat' ? "text-black" : 'text-white'} text-[12px]`}>Chat</Text>
            </Button>
        </View>
    );
};