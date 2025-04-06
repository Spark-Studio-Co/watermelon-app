import { View } from 'react-native'
import { MainLayout } from '@/src/app/layouts/main-layout'
import { FeedCard } from '@/src/features/feed/ui/feed-card'

import { useNavigation } from '@react-navigation/native'
import { useActiveStore } from '@/src/shared/model/use-active-store'

export const FeedScreen = () => {
    const navigation = useNavigation()
    const { active, setActive } = useActiveStore("post", '')

    const images = [
        { uri: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80' },
        { uri: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { uri: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { uri: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80' },
        { uri: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { uri: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80' },
        { uri: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { uri: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' }]

    const posts = [
        {
            username: "Erlan Erlanov",
            date: "14.10.2025",
            image: images[0].uri,
            likes: 123,
            views: 300,
            comments: 3,
            text: 'Lorem ipsum dolor sit amet consectetur. Elit enim sollicitudin malesuada cras viverra aliquam massa. Sed diam nunc adipiscing sem. A libero morbi duis id in. Pulvinar consequat felis habitasse id pretium arcu. Ultrices varius fringilla viverra id amet amet. Id ipsum urna lectus pellentesque ac nisl accumsan blandit phasellus. Fringilla adipiscing at nibh purus nunc. Duis pulvinar quis tellus vel euismod quam. Eros dolor aliquet etiam id amet id netus. Est purus quis nunc faucibus elementum rhoncus. Morbi ultrices sed lacus ullamcorper etiam erat nunc morbi. Libero vitae amet lacinia sit. Orci sed rhoncus ut suscipit vitae tortor commodo.'
        },
        {
            username: "Ruslan Zhirdosob",
            date: "16.10.2025",
            image: images[1].uri,
            likes: 123,
            views: 300,
            comments: 3,
        },
        {
            username: "John Doe",
            date: "2 days ago",
            image: images[2].uri,
            likes: 123,
            views: 300,
            comments: 3,
        },
        {
            username: "John Doe",
            date: "2 days ago",
            image: images[3].uri,
            likes: 123,
            views: 300,
            comments: 3,
        },
        {
            username: "John Doe",
            date: "2 days ago",
            image: images[4].uri,
            likes: 123,
            views: 300,
            comments: 3,
        },
        {
            username: "John Doe",
            date: "2 days ago",
            image: images[5].uri
        },
        {
            username: "John Doe",
            date: "2 days ago",
            image: images[6].uri
        },
        {
            username: "John Doe",
            date: "2 days ago",
            image: images[7].uri
        }
    ]

    const handleLike = (image: string) => {
        setActive(active === image ? '' : image)
    }

    return (
        <MainLayout>
            <View className="mt-6">
                {posts.map((post, index) => (
                    <View key={index} className="mb-6">
                        <FeedCard
                            key={index}
                            username={post.username}
                            date={post.date}
                            image={post.image}
                            text={post.text}
                            likes={post.likes}
                            views={post.views}
                            comments={post.comments}
                            //@ts-ignore
                            onPress={() => navigation.navigate('FullPost' as never, { imageUri: post.image, index, storeKey: 'feed' })}
                            onLike={() => handleLike(post.image)}
                            active={active === post.image}
                        />
                    </View>
                ))}
            </View>
        </MainLayout>
    )
}
