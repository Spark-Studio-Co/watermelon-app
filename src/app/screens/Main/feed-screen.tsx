import { View } from 'react-native'
import { MainLayout } from '@/src/app/layouts/main-layout'
import { FeedCard } from '@/src/features/feed/ui/feed-card'
import { useNavigation } from '@react-navigation/native'
import { useFeedData } from '@/src/entities/feed/api/use-feed-data'
import { useLikePost } from '@/src/entities/feed/api/use-like-post'
import { useUnlikePost } from '@/src/entities/feed/api/use-unlike-post'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

export const FeedScreen = () => {
    const navigation = useNavigation()
    const queryClient = useQueryClient()
    const { data: feed, refetch } = useFeedData()
    const { mutate: likePost } = useLikePost()
    const { mutate: unlikePost } = useUnlikePost()

    useEffect(() => {
        refetch()
    }, [feed])

    const handleLike = (id: string) => {
        const previousFeed = queryClient.getQueryData(['feed'])

        queryClient.setQueryData(['feedAll'], (oldFeed: any) => {
            if (!Array.isArray(oldFeed)) return oldFeed
            return oldFeed.map((post: any) => {
                if (post.id === id) {
                    return {
                        ...post,
                        isLiked: true,
                        _count: {
                            ...post._count,
                            likes: (post._count?.likes || 0) + 1,
                        },
                    }
                }
                return post
            })
        })

        likePost(id, {
            onError: () => {
                queryClient.setQueryData(['feedAll'], previousFeed)
            },
        })
    }

    const handleUnLike = (id: string) => {
        const previousFeed = queryClient.getQueryData(['feedAll'])

        queryClient.setQueryData(['feedAll'], (oldFeed: any) => {
            if (!Array.isArray(oldFeed)) return oldFeed
            return oldFeed.map((post: any) => {
                if (post.id === id) {
                    return {
                        ...post,
                        isLiked: false,
                        _count: {
                            ...post._count,
                            likes: Math.max((post._count?.likes || 1) - 1, 0),
                        },
                    }
                }
                return post
            })
        })

        unlikePost(id, {
            onError: () => {
                queryClient.setQueryData(['feedAll'], previousFeed)
            },
        })
    }

    return (
        <MainLayout>
            <View className="mt-6">
                {Array.isArray(feed) && feed.map((post, index) => {
                    const createdAtDate = new Date(post?.createdAt)
                    const options: Intl.DateTimeFormatOptions = {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    }
                    const formattedDate = createdAtDate.toLocaleDateString('ru-RU', options)

                    return (
                        <View key={index} className="mb-6">
                            <FeedCard
                                username={`@${post?.ownerUsername === '' ? 'username' : post?.ownerUsername}`}
                                date={formattedDate}
                                image={post?.image}
                                text={post?.caption}
                                likes={post?._count?.likes || 0}
                                views={post?.views ?? 0}
                                //@ts-ignore
                                onPress={() => navigation.navigate('FullPost' as never, { id: post.id })}
                                onLike={() => post?.isLiked ? handleUnLike(post.id) : handleLike(post.id)}
                                active={post?.isLiked}
                            />
                        </View>
                    )
                })}
            </View>
        </MainLayout>
    )
}