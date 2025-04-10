import React from 'react'
import { View } from 'react-native';
import Text from '@/src/shared/ui/text/text';
import { Input } from '@/src/shared/ui/input/input';
import { Button } from '@/src/shared/ui/button/button';

import { useNavigation } from '@react-navigation/native';

import { useLoginStore } from '../../../entities/login/model/login-store';
import { useLogin } from '@/src/entities/login/api/use-login';
import { useAuthStore } from '@/src/entities/registration/api/use-auth-store';

export const LoginForm = () => {
    const { mutate, isPending, isError } = useLogin()
    const { navigate } = useNavigation()
    const { password, email, setPassword, setEmail, setResponseData } = useLoginStore()
    const { setId, id } = useAuthStore()

    const handleSubmit = () => {
        if (!email.trim() || !password.trim()) {
            console.log('Username and password cannot be empty.')
            return;
        }
        mutate({ email, password }, {
            onSuccess: async (data: any) => {
                if (data?.token || data?.user) {
                    setId(data.user.id)
                    setResponseData(data.token)
                } else {
                    console.log('There is an error with data')
                }
                navigate("SuccessSignUp" as never)
            },
            onError: (error: any) => {
                console.log(error)
            }
        })
    }

    return (
        <View className='flex flex-col justify-between h-full w-full'>
            <View className='flex items-center w-full mt-20'>
                <Text weight='medium' className="text-[48px] text-[#FFFFFF]">Login</Text>
                <Text weight='regular' className='text-[16px] text-[#FFFFFF] mt-6'>Login to your account</Text>
                <Input placeholder='Email' variant='auth' className='mt-16' value={email} onChangeText={setEmail} />
                <Input placeholder='Password' variant='auth' className='mt-14' type='password' value={password} onChangeText={setPassword} />
                <Button variant='custom' className='mt-2 w-full flex items-end'><Text weight='regular' className='text-[15px] text-[#FFFFFF] flex'>Forgot password</Text></Button>
                <Text className='text-[16px] text-red-500 mt-6'>{isError && 'There is an error with password or email'}</Text>
            </View>
            <View className='w-full mb-10'>
                <Button onPress={handleSubmit} variant='blue' className='w-full'>
                    <Text weight='regular' className='text-[22px] text-[#FFFFFF] flex'>{isPending ? 'Sending...' : 'Next'}</Text>
                </Button>
                <View className='flex flex-row mt-5 items-center justify-center gap-x-2'>
                    <Text weight='regular' className='text-[14px] text-[#FFFFFF]'>Don't have an account?</Text>
                    <Button onPress={() => navigate('Registration' as never)} variant='custom'><Text weight='bold' className='text-[14px] underline text-[#57AEF1]'>Sign up</Text></Button>
                </View>
            </View>
        </View>
    )
}
