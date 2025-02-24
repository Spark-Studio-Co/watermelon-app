import { View, Text } from 'react-native';
import { Input } from '@/src/shared/ui/input/input';

import { AuthLayout } from '../layouts/auth-layout';

export const LoginScreen = () => {
  return (
    <AuthLayout>
      <View className='flex items-center justify-center'>
        <Text className="text-[48px] text-[#FFFFFF] mt-16 font-[500]">Login</Text>
        <Text className='text-[16px] text-[#FFFFFF] mt-[8] font-[400]'>Login to your account</Text>
        <Input placeholder='Username' variant='auth' className='mt-24' />
      </View>
    </AuthLayout>
  );
};
