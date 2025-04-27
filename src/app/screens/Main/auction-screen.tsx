import React, { useEffect, useState } from 'react'
import { MainLayout } from '../../layouts/main-layout'
import { ScrollView, View, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import Text from '@/src/shared/ui/text/text'
import { SearchInput } from '@/src/features/auction/ui/search-input/search-input'
import { PointTab } from '@/src/features/auction/ui/point-tab/point-tab'
import { useNavigation } from '@react-navigation/native'
import { Button } from '@/src/shared/ui/button/button'

import DarkBurgerIcon from '@/src/shared/icons/dark-burger-icon'

import { useActiveStore } from '@/src/shared/model/use-active-store'
import { useAuctionsData } from '@/src/entities/auction/api/use-auctions-data'
import { useQueryClient } from '@tanstack/react-query'

import { AuctionSort } from '@/src/entities/auction/types/auction-sort.t'

const tabs = [
    "New",
    "On sold",
    "My bet"
]

const onSoldPointTabs = [
    {
        type: "Premium",
        name: "Hustle",
        subscribers: 80,
        views: 12
    },
    {
        type: "Chat",
        name: "El ",
        members: 11
    },
    {
        type: "Standard",
        name: "New York"
    },
    {
        type: "Premium",
        name: "Rio de Janeiro"
    },
    {
        type: "Chat",
        name: "El Diablo"
    },
    {
        type: "Standard",
        name: "New York"
    },
    {
        type: "Premium",
        name: "Rio de Janeiro"
    },
    {
        type: "Chat",
        name: "El Diablo"
    },
    {
        type: "Standard",
        name: "New York"
    },
]

const myBetPointTabs = [
    {
        type: "Premium",
        name: "Rio de Janeiro",
        subscribers: 787,
        views: 123
    },
    {
        type: "Chat",
        name: "El Diablo",
        members: 123
    },
    {
        type: "Standard",
        name: "New York"
    },
    {
        type: "Premium",
        name: "Rio de Janeiro"
    },
    {
        type: "Chat",
        name: "El Diablo"
    },
    {
        type: "Standard",
        name: "New York"
    },
    {
        type: "Premium",
        name: "Rio de Janeiro"
    },
    {
        type: "Chat",
        name: "El Diablo"
    },
    {
        type: "Standard",
        name: "New York"
    },
]

const filterOptions = [
    {
        label: "by range",
        filter: null
    },
    {
        label: "on last time",
        filter: "lastTime"
    },
    {
        label: "on low bid",
        filter: "lowBid"
    },
    {
        label: "on high bid",
        filter: "highBid"
    }
]

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        borderRadius: 15,
        backgroundColor: 'rgba(230, 230, 230, 0.8)',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    radioButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonSelected: {
        backgroundColor: '#000',
    },
})


export const AuctionScreen = () => {
    const queryClient = useQueryClient()
    const [filterMethod, setFilterMethod] = useState<AuctionSort | null>()
    const { data: auctions, isLoading, refetch } = useAuctionsData(undefined, filterMethod)
    const navigation = useNavigation()
    const { active, setActive } = useActiveStore('auction', 'New')
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState(2)

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

    useEffect(() => {
        refetch()
    }, [auctions])

    return (
        <MainLayout isScrollable={false}>
            <View className='mt-7 flex flex-col'>
                <View className='flex flex-row items-center justify-between'>
                    <SearchInput />
                    <Button
                        variant="custom"
                        className="bg-[#E6E6E6] rounded-full w-[42px] h-[42px] flex items-center justify-center"
                        onPress={toggleModal}
                    >
                        <DarkBurgerIcon />
                    </Button>
                </View>
                <View className='flex flex-row items-center justify-between w-[80%] mx-auto mt-7'>
                    {tabs.map((tab, index) => (
                        <View key={index} className="flex flex-col items-center">
                            <Text weight="regular" className="text-white text-[15px] mb-[3px]" onPress={() => setActive(tab)}>{tab}</Text>
                            {active === tab && <View className="w-[59px] h-[2px] rounded-[5px] bg-white" />}
                        </View>
                    ))}
                </View>
                {isLoading ? <View className='flex items-center justify-center w-full h-[90%]'><Text className='text-white text-[20px]'>Loading...</Text></View> :
                    <ScrollView
                        className="mt-7"
                        showsVerticalScrollIndicator={false}
                    >
                        {active === 'New' && Array.isArray(auctions) && auctions?.map((auction: any, index: number) => (
                            <Button key={index} variant='custom' onPress={() => {
                                //@ts-ignore
                                navigation.navigate('AuctionInner' as never, { id: auction.id, name: `Point #${index + 1}`, start: auction.startingBid, startDate: auction.startDate, endDate: auction.endDate })
                            }}>
                                <View className="mb-4">
                                    <PointTab
                                        status={active}
                                        type={auction.marker?.type}
                                        name={`Point #${index + 1}`}
                                        subscribers={auction.subscribers}
                                        views={auction.marker?.views}
                                        members={auction.members}
                                    />
                                </View>
                            </Button>
                        ))}

                        {active === 'On sold' && onSoldPointTabs.map((tab, index) => (
                            <View key={index} className="mb-4">
                                <PointTab
                                    status={active}
                                    type={tab.type}
                                    name={tab.name}
                                    subscribers={tab.subscribers}
                                    views={tab.views}
                                    members={tab.members}
                                />
                            </View>
                        ))}

                        {active === 'My bet' && myBetPointTabs.map((tab, index) => (
                            <View key={index} className="mb-4">
                                <PointTab
                                    status={active}
                                    type={tab.type}
                                    name={tab.name}
                                    subscribers={tab.subscribers}
                                    views={tab.views}
                                    members={tab.members}
                                />
                            </View>
                        ))}
                    </ScrollView>}
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={toggleModal}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={toggleModal}
                >
                    <View style={styles.modalContainer}>
                        {filterOptions.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.optionRow}
                                onPress={() => {
                                    setFilterMethod(option.filter as AuctionSort | null)
                                    setSelectedFilter(index)

                                    queryClient.invalidateQueries({
                                        queryKey: ['auctions']
                                    })

                                    toggleModal()
                                }}
                            >
                                <View style={[styles.radioButton, selectedFilter === index && styles.radioButtonSelected]} />
                                <Text weight="regular" className="text-black text-[16px] ml-3">{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </MainLayout>
    )
}
