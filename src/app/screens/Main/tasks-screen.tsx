import { View } from 'react-native'
import { MainLayout } from '../../layouts/main-layout'


import { useActiveStore } from '@/src/shared/model/use-active-store'
import { TaskCard } from '@/src/features/tasks/ui/task-card'
import { useTasksData } from '@/src/entities/tasks/api/use-tasks-data'

import { TasksCategories } from '@/src/entities/tasks/api/use-tasks-data'

export const TasksScreen = () => {
    const { active } = useActiveStore('tasks', 'Coins')
    const { data: tasks } = useTasksData(active as TasksCategories)


    return (
        <MainLayout isTasks>
            <View className="flex flex-col items-center mt-5">
                {active === 'Coins' && tasks?.map((task: any, index: number) => (
                    <TaskCard key={index} {...task} />
                ))}
                {active === 'Exp' && tasks?.map((task: any, index: number) => (
                    <TaskCard isExp key={index} {...task} />
                ))}
            </View>
        </MainLayout>
    )
}
