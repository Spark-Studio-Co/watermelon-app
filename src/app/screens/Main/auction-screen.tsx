import React, { useState } from 'react'
import { MainLayout } from '../../layouts/main-layout'
import { ScrollView, View, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import Text from '@/src/shared/ui/text/text'
import { SearchInput } from '@/src/features/auction/ui/search-input/search-input'
import { PointTab } from '@/src/features/auction/ui/point-tab/point-tab'
import { useNavigation } from '@react-navigation/native'
import { Button } from '@/src/shared/ui/button/button'

import DarkBurgerIcon from '@/src/shared/icons/dark-burger-icon'

import { useActiveStore } from '@/src/shared/model/use-active-store'

const tabs = [
    "New",
    "On sold",
    "My bet"
]

const newPointTabs = [
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
    "by range",
    "on last time",
    "on low bit",
    "on hight bit"
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
    const navigation = useNavigation()
    const { active, toggle } = useActiveStore('auction', 'New')
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState(2)

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

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
                            <Text weight="regular" className="text-white text-[15px] mb-[3px]" onPress={() => toggle(tab)}>{tab}</Text>
                            {active === tab && <View className="w-[59px] h-[2px] rounded-[5px] bg-white" />}
                        </View>
                    ))}
                </View>
                <ScrollView
                    className="mt-7"
                    showsVerticalScrollIndicator={false}
                >
                    {active === 'New' && newPointTabs.map((tab, index) => (
                        <Button key={index} variant='custom' onPress={() => navigation.navigate('AuctionInner' as never)}>
                            <View className="mb-4">
                                <PointTab
                                    status={active}
                                    type={tab.type}
                                    name={tab.name}
                                    subscribers={tab.subscribers}
                                    views={tab.views}
                                    members={tab.members}
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
                </ScrollView>
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
                                    setSelectedFilter(index)
                                    toggleModal()
                                }}
                            >
                                <View style={[styles.radioButton, selectedFilter === index && styles.radioButtonSelected]} />
                                <Text weight="regular" className="text-black text-[16px] ml-3">{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </MainLayout>
    )
}
