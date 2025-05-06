import { View, Text } from 'react-native'

interface ITaskCardProps {
    status?: string
    title: string
    description: string
    current?: number
    required?: number
    reward: number
    category?: string
}

export const TaskCard = ({ status, title, description, current, reward, category, required, }: ITaskCardProps) => {
    const isCompleted = status === 'completed'
    const isExp = category === 'Exp';

    return (
        <View
            className={
                `w-[92%] mx-auto mt-4 p-4 rounded-[12px] ${isCompleted ? 'bg-[#30CFA0]' : 'bg-[#4D4D4D]'
                }`
            }
        >
            <View className="flex-row justify-between items-start">
                <Text className={`text-[16px] max-w-[50%] font-bold ${isCompleted ? 'text-white' : 'text-white'}`}>
                    {title}
                </Text>
                {!isExp && current !== undefined && required !== undefined && (
                    <Text className={`text-[14px] ${isCompleted ? 'text-white' : 'text-[#ccc]'}`}>
                        {current}/{required}
                    </Text>
                )}
                <Text className="font-bold text-white">{reward} exp</Text>
            </View>

            <Text
                numberOfLines={status === 'default' ? 1 : undefined}
                className={`mt-2 text-[14px] leading-[20px] ${isCompleted ? 'text-white' : 'text-[#ccc]'}`}
            >
                {description}
            </Text>
        </View>
    )
}