import { TextInput } from "react-native";
import { TextInputProps } from "react-native";

interface IInputProps extends TextInputProps {
    inputRef: (ref: TextInput | null) => void;
    onComplete?: () => void;
    index: number;
    value: string;
}

export const SingleValueInput = ({
    value,
    inputRef,
    onComplete,
    index,
    onChangeText,
    ...props
}: IInputProps) => {
    return (
        <TextInput
            ref={inputRef}
            className="bg-[#FFFFFF] border border-[#9EA1A8] w-[77px] h-[48px] rounded-[12px] text-[#17171780] font-[400] text-[20px] text-center"
            maxLength={1}
            value={value}
            keyboardType="numeric"
            returnKeyType={index === 4 ? "done" : "next"}
            onSubmitEditing={() => {
                if (index === 4) {
                    onComplete?.();
                }
            }}
            onChangeText={onChangeText}
            {...props}
        />
    );
};