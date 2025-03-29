import { View, TextInput, StyleSheet } from 'react-native'
import DarkSearchIcon from '@/src/shared/icons/dark-search-icon'

export const SearchInput = () => {
    return (
        <View style={styles.container}>
            <View style={styles.searchIconContainer}>
                <DarkSearchIcon />
            </View>
            <TextInput
                style={styles.input}
                className='font-poppins-regular'
                placeholder="Search.."
                placeholderTextColor="#666666"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E6E6E6',
        borderRadius: 30,
        paddingHorizontal: 16,
        height: 50,
        width: '85%',
    },
    searchIconContainer: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333333',
        padding: 0,
    }
})