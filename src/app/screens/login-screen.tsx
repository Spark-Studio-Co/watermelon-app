import { View, Text } from 'react-native';
import { Input } from '@/src/shared/ui/input/input';
import { Button } from '@/src/shared/ui/button/button';

import { hp } from '@/src/shared/utils/resize-dimensions';

import { AuthLayout } from '../layouts/auth-layout';

export const LoginScreen = () => {
  return (
    <AuthLayout>
      <View className='flex items-center justify-center w-full'>
        <Text className="text-[48px] text-[#FFFFFF] mt-16 font-[500]">Login</Text>
        <Text className='text-[16px] text-[#FFFFFF] mt-[8] font-[400]'>Login to your account</Text>
        <Input placeholder='Username' variant='auth' className='mt-16' />
        <Input placeholder='Password' variant='auth' className='mt-14' type='password' />
        <Button variant='custom' className='mt-2 w-full flex items-end'><Text className='text-[15px] text-[#FFFFFF] font-[400] flex'>Forgot password</Text></Button>
        <Button variant='blue' className='w-full flex items-center justify-center' style={{ marginTop: hp(30) }}><Text className='text-[22px] text-[#FFFFFF] font-[400] flex'>Login</Text></Button>
        <View className='flex flex-row mt-5 items-center gap-x-2'>
          <Text className='text-[14px] text-[#FFFFFF] font-[400]'>Don’t have an account?</Text>
          <Button variant='custom'><Text className='text-[14px] font-[700] text-[#000AFF]'>Sign up</Text></Button>
        </View>
      </View>
    </AuthLayout>
  );
};
