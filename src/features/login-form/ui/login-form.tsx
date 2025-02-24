import React from 'react'
import { View } from 'react-native';
import Text from '@/src/shared/ui/text/text';
import { Input } from '@/src/shared/ui/input/input';
import { Button } from '@/src/shared/ui/button/button';

import { useNavigation } from '@react-navigation/native';

import { hp } from '@/src/shared/utils/resize-dimensions';

import { useLoginStore } from '../../../entities/login/model/login-store';

export const LoginForm = () => {
    const navigation = useNavigation()
    const { password, username, setPassword, setUsername } = useLoginStore()

    const handleSubmit = () => {
        if (!username.trim() || !password.trim()) {
            console.log('sername and password cannot be empty.')
            return;
        }
        navigation.navigate("SuccessScreen" as never)
    }

    return (
        <View className='flex items-center justify-center w-full mt-20'>
            <Text className="text-[48px] text-[#FFFFFF] font-poppins-medium">Login</Text>
            <Text className='text-[16px] text-[#FFFFFF] mt-8 font-poppins-regular'>Login to your account</Text>
            <Input placeholder='Username' variant='auth' className='mt-16' value={username} onChangeText={setUsername} />
            <Input placeholder='Password' variant='auth' className='mt-14' type='password' value={password} onChangeText={setPassword} />
            <Button variant='custom' className='mt-2 w-full flex items-end'><Text className='text-[15px] text-[#FFFFFF] font-poppins-regular flex'>Forgot password</Text></Button>
            <Button onPress={handleSubmit} variant='blue' className='w-full flex items-center justify-center' style={{ marginTop: hp(30) }}><Text className='text-[22px] text-[#FFFFFF] font-poppins-regular flex'>Login</Text></Button>
            <View className='flex flex-row mt-5 items-center gap-x-2'>
                <Text className='text-[14px] text-[#FFFFFF] font-poppins-regular'>Don’t have an account?</Text>
                <Button variant='custom'><Text className='text-[14px] font-[700] text-[#000AFF]'>Sign up</Text></Button>
            </View>
        </View>
    )
}
