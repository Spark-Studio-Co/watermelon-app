import { View } from 'react-native'
import { MainLayout } from '../../layouts/main-layout'


import { useActiveStore } from '@/src/shared/model/use-active-store'
import { TaskCard } from '@/src/features/tasks/ui/task-card'

export const TasksScreen = () => {
    const { active } = useActiveStore('tasks', 'Coins')


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
        <MainLayout isTasks>
            <View className="flex flex-col items-center mt-5">
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
