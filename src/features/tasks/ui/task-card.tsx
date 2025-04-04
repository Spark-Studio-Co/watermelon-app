import { View, Text } from 'react-native'

interface ITaskCardProps {
    status?: string
    title: string
    description: string
    current?: number
    max?: number
    exp: number
    isExp?: boolean
}

export const TaskCard = ({ status, title, description, current, max, exp, isExp }: ITaskCardProps) => {
    const isCompleted = status === 'completed'

    return (
        <View
            className={
                `w-[92%] mx-auto mt-4 p-4 rounded-[12px] ${isCompleted ? 'bg-[#30CFA0]' : 'bg-[#4D4D4D]'
                }`
            }
        >
            <View className="flex-row justify-between items-center">
                <Text className={`text-[16px] font-bold ${isCompleted ? 'text-white' : 'text-white'}`}>
                    {title}
                </Text>
                {!isExp && <Text className={`text-[14px] ${isCompleted ? 'text-white' : 'text-[#ccc]'}`}>
                    {current}/{max}
                </Text>}
                <Text className="font-bold text-white">{exp} exp</Text>
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