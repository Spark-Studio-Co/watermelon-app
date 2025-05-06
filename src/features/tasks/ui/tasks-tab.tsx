//@ts-nocheck

import { View } from 'react-native'
import Text from '@/src/shared/ui/text/text'
import { LevelTab } from '@/src/features/tasks/ui/level-tab'
import { Button } from '@/src/shared/ui/button/button'

import { useActiveStore } from '@/src/shared/model/use-active-store'
import { useGetMe } from '@/src/entities/users/api/use-get-me';

export const TasksTab = () => {
    const { active, setActive } = useActiveStore('tasks', 'Coins')
    const { data: me } = useGetMe()

    const categories = ["Coins", 'Exp', 'Boost']
    return (
        <View className="flex flex-col items-center mt-5 mb-5 px-4">
            <Text weight="medium" className="text-white text-[32px]">Tasks</Text>
            <LevelTab level={me?.level?.id ?? 0} max={200} current={me?.level?.expNeeded} />
            <View className='bg-black w-[92%] mt-3.5 mx-auto flex flex-row items-center justify-between h-[46px] rounded-[8px] px-1.5'>
                {categories.map((category) => (
                    <Button key={category} onPress={() => setActive(category)} className={`px-7 py-2 ${active === category && 'border border-white rounded-[8px]'}`}>
                        <Text weight="medium" className="text-white text-[15px]">{category}</Text>
                    </Button>
                ))}
            </View>
        </View>)
}
