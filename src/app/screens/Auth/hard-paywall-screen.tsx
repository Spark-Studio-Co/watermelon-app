import React from 'react'
import { AuthLayout } from '../../layouts/auth-layout'
import { View, Alert } from 'react-native'
import Text from '@/src/shared/ui/text/text'
import { Button } from '@/src/shared/ui/button/button'
import { useAuthToken } from '@/src/entities/registration/api/use-auth-token'
import { hp } from '@/src/shared/utils/resize-dimensions'
import PremiumIcon from '@/src/shared/icons/premium-icon'

export const HardPaywall = () => {
    const { saveToken, setIsAuthenticated } = useAuthToken()

    const handleSubscribe = async () => {
        try {
            console.log('Subscribing...');
            const newToken = 'subscription-token-' + Date.now();
            await saveToken(newToken);
            console.log('Token saved:', newToken);

            setIsAuthenticated(true);
            console.log('Authentication state updated');

            Alert.alert(
                'Subscription Successful',
                'You are now subscribed! The app will switch to the dashboard.'
            );
        } catch (error) {
            console.error('Error during subscription:', error);
            Alert.alert('Subscription Failed', 'There was an error processing your subscription.');
        }
    }

    return (
        <AuthLayout>
            <View className='flex items-center flex-col' style={{ marginTop: hp(4) }}>
                <PremiumIcon />
                <Text weight='bold' className='text-white text-[40px] mt-2'>Premium</Text>
                <Text weight='bold' className='text-white text-[24px] mt-3'>Subscription</Text>
                <View className='flex flex-row justify-between w-full mt-5'>
                    <Button variant='paywall' className='w-[46%]'><Text weight='medium' className='text-white text-[16px]'>Annual</Text></Button>
                    <Button variant='paywall' className='w-[46%]'><Text weight='medium' className='text-white text-[16px]'>Monthly</Text></Button>
                </View>
                <Text weight='regular' className='text-left text-white text-[15px] mt-4'>
                    Lorem ipsum dolor sit amet consectetur. Elit enim sollicitudin malesuada cras viverra aliquam massa. Sed diam nunc adipiscing sem. A libero morbi duis id in. Pulvinar consequat felis habitasse id pretium arcu. Ultrices varius fringilla viverra id amet amet. Id ipsum urna lectus pellentesque ac nisl accumsan blandit phasellus. Fringilla adipiscing at nibh purus nunc. Duis pulvinar quis tellus vel euismod quam. Eros dolor aliquet etiam id amet id netus. Est purus quis nunc faucibus elementum rhoncus. Morbi ultrices sed lacus ullamcorper etiam erat nunc morbi. Libero vitae amet lacinia sit. Orci sed rhoncus ut suscipit vitae tortor commodo.
                    Libero fames fames mattis orci mauris. Sit mi at ipsum euismod. Mauris vitae facilisi ultricies sit. Nibh cras diam nunc amet auctor vitae. Sagittis turpis sed
                </Text>
                <Button onPress={handleSubscribe} variant='blue' className='w-full flex items-center justify-center' style={{ marginTop: hp(8) }}><Text weight='regular' className='text-[22px] text-[#FFFFFF] flex'>Subscribe</Text></Button>
            </View>
        </AuthLayout>
    )
}
