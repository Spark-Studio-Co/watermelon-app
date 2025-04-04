import { View } from 'react-native'
import { MainLayout } from '../../layouts/main-layout'
import Text from '@/src/shared/ui/text/text'
import { LevelTab } from '@/src/features/tasks/ui/level-tab'
import { Button } from '@/src/shared/ui/button/button'

import { useActiveStore } from '@/src/shared/model/use-active-store'
import { TaskCard } from '@/src/features/tasks/ui/task-card'

export const TasksScreen = () => {
    const { active, setActive } = useActiveStore('tasks', 'Coins')

    const categories = ["Coins", 'Exp', 'Boost']

    const tasksData = [
        {
            title: 'Weekly tasks',
            description: 'Spend 200 minutes in the app...',
            current: 91,
            max: 200,
            exp: 212
        },
        {
            title: 'Spend 200 minutes in the app',
            description: `Spend 200 minutes in the app text
more text
more text
a lot of text
It’s a difficult task, that’s why there’s
a lot of text`,
            current: 91,
            max: 200,
            exp: 212
        },
        {
            status: 'completed',
            title: 'Weekly tasks',
            description: 'Spend 200 minutes in the app...',
            current: 200,
            max: 200,
            exp: 212
        }
    ];

    const expData = [
        {
            title: 'Первый point',
            description: 'Установите  свой первый point на глобальной карте. Выйграйте в аукционе...',
            exp: 212,
        },
        {
            title: 'Первый point',
            description: "Установите  свой первый point на глобальной карте.Выйграйте в аукционе и установите точку.",
            exp: 212,
        },
        {
            status: 'completed',
            title: 'Weekly tasks',
            description: 'Spend 200 minutes in the app...',
            exp: 212,
        }
    ];


    return (
        <MainLayout>
            <View className="flex flex-col items-center mt-5">
                <Text weight="medium" className="text-white text-[32px]">Tasks</Text>
                <LevelTab level={12} max={200} current={91} />
                <View className='bg-black w-[92%] mt-3.5 mx-auto flex flex-row items-center justify-between h-[46px] rounded-[8px] px-1.5'>
                    {categories.map((category) => (
                        <Button key={category} onPress={() => setActive(category)} className={`px-7 py-2 ${active === category && 'border border-white rounded-[8px]'}`}>
                            <Text weight="medium" className="text-white text-[15px]">{category}</Text>
                        </Button>
                    ))}
                </View>
                {active === 'Coins' && tasksData.map((task, index) => (
                    <TaskCard key={index} {...task} />
                ))}
                {active === 'Exp' && expData.map((task, index) => (
                    <TaskCard isExp key={index} {...task} />
                ))}
            </View>
        </MainLayout>
    )
}
