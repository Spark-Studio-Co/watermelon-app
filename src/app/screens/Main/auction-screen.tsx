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

    const statusMap: Record<string, 'new' | 'sold' | 'myBets'> = {
        'New': 'new',
        'On sold': 'sold',
        'My bet': 'myBets',
    };
    const { active, setActive } = useActiveStore('auction', 'New')
    const queryClient = useQueryClient()
    const [filterMethod, setFilterMethod] = useState<AuctionSort | null>()
    const { data: auctions, isLoading, refetch } = useAuctionsData(undefined, filterMethod, statusMap[active as string]); const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState(2)
    const [nameMap, setNameMap] = useState<Record<string, string>>({})

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

    useEffect(() => {
        refetch();

        if (active === 'My bet') {
            console.log('[AuctionScreen] My bet auctions:', auctions);
        }
    }, [active, filterMethod]);


    useEffect(() => {
        if (Array.isArray(auctions)) {
            const updatedMap = { ...nameMap }
            auctions.forEach((auction, i) => {
                if (!updatedMap[auction.id]) {
                    updatedMap[auction.id] = `Point #${Object.keys(updatedMap).length + 1}`
                }
            })
            setNameMap(updatedMap)
        }
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
                                navigation.navigate('AuctionInner' as never, { id: auction.id, name: nameMap[auction.id] || 'Unnamed', start: auction.startingBid, startDate: auction.startDate, endDate: auction.endDate })
                            }}>
                                <View className="mb-4">
                                    <PointTab
                                        status={active}
                                        type={auction.marker?.type}
                                        name={nameMap[auction.id] || 'Unnamed'}
                                        subscribers={auction.subscribers}
                                        views={auction.marker?.views}
                                        members={auction.members}
                                    />
                                </View>
                            </Button>
                        ))}

                        {(active === 'On sold' || active === 'My bet') && Array.isArray(auctions) && (
                            auctions.length > 0 ? (
                                auctions.map((auction: any, index: number) => (
                                    <Button key={index} variant='custom' onPress={() => {
                                        //@ts-ignore
                                        navigation.navigate('AuctionInner' as never, { id: auction.id, name: nameMap[auction.id] || 'Unnamed', start: auction.startingBid, startDate: auction.startDate, endDate: auction.endDate })
                                    }}>
                                        <View key={index} className="mb-4">
                                            <PointTab
                                                status={active}
                                                type={auction.marker?.type}
                                                name={nameMap[auction.id] || 'Unnamed'}
                                                subscribers={auction.subscribers}
                                                views={auction.marker?.views}
                                                members={auction.members}
                                            />
                                        </View>
                                    </Button>
                                ))
                            ) : (
                                <View className="items-center mt-10">
                                    <Text className="text-white text-[16px]">
                                        No auctions found for this tab.
                                    </Text>
                                </View>
                            )
                        )}

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
