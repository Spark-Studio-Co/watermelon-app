import { AuthLayout } from "../../layouts/auth-layout";
import { View, Image } from "react-native";
import Text from "@/src/shared/ui/text/text";
import { useNavigation } from "@react-navigation/native";

import { hp, wp } from "@/src/shared/utils/resize-dimensions";
import { Button } from "@/src/shared/ui/button/button";


export const SuccessSignInScreen = () => {

    const { navigate } = useNavigation()

    return (
        <AuthLayout>
            <View
                style={{ height: hp(90), width: wp(90), marginTop: hp(-10) }}
            >
                <Image
                    className={`w-full h-full`}
                    resizeMode="contain"
                    source={require("../../../images/success_sign_in.png")}
                />
            </View>
            <Button onPress={() => navigate('Login' as never)} variant='blue' className='w-full flex items-center justify-center'><Text weight="regular" className='text-[22px] text-[#FFFFFF] flex'>Login</Text></Button>
        </AuthLayout >
    );
};