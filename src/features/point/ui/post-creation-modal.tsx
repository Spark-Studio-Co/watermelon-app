import React, { useRef, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    Platform,
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback
} from "react-native";
import Text from "@/src/shared/ui/text/text";
import { useVisibleStore } from "@/src/shared/model/use-visible-store";
import { useCameraStore } from "@/src/widget/camera/model/camera-store";

interface PostCreationModalProps {
    storeKey: string;
    onPost: (caption: string) => void;
    onCancel: () => void;
}

export const PostCreationModal = ({ storeKey, onPost, onCancel }: PostCreationModalProps) => {
    const postInput = useRef(null);
    const { image } = useCameraStore(storeKey);
    const { isVisible } = useVisibleStore("addPost");
    const { open: openPhotoOptions } = useVisibleStore("photoOptions");
    const [postCaption, setPostCaption] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    useEffect(() => {
        console.log('📷 PostCreationModal update', { image, isVisible });
    }, [image, isVisible]);

    const handlePost = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            onPost(postCaption);
            setPostCaption('');
            setIsSubmitting(false);
        }, 1500);
    };

    const handleCancel = () => {
        setPostCaption('');
        onCancel();
    };


    if (isSubmitting) {
        return (
            <View className="h-[250px] rounded-[15px] overflow-hidden bg-[#1B1C1E] items-center justify-center">
                <ActivityIndicator size="large" color="#5992FF" />
                <Text weight="medium" className="text-white mt-4">Posting...</Text>
            </View>
        );
    }

    if (image !== null) {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : 0}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        style={{ flexGrow: 1, height: '100%', top: '30%' }}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    >
                        <View className='bg-[#313034] p-6 rounded-[20px]'>
                            <Text weight="bold" className="text-white text-[20px] mb-6 text-center">Create Post</Text>
                            <View className="bg-[#1B1C1E] rounded-[15px] overflow-hidden">
                                <Image
                                    source={{ uri: image }}
                                    style={{ width: '100%', height: 200, resizeMode: 'cover' }}
                                />
                                <View className="p-4">
                                    <TextInput
                                        ref={postInput}
                                        placeholder="Add a caption..."
                                        placeholderTextColor="#888888"
                                        multiline
                                        value={postCaption}
                                        onChangeText={setPostCaption}
                                        style={{
                                            color: 'white',
                                            fontSize: 16,
                                            minHeight: 80,
                                            textAlignVertical: 'top',
                                        }}
                                    />
                                    <View className="flex-row justify-between mt-4">
                                        <TouchableOpacity
                                            onPress={handleCancel}
                                            className="bg-[#313034] px-4 py-2 rounded-[10px] items-center justify-center w-[48%]"
                                        >
                                            <Text weight="medium" className="text-[#888888] text-[16px]">Cancel</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={handlePost}
                                            className="bg-[#5992FF] px-4 py-2 rounded-[10px] items-center justify-center w-[48%]"
                                        >
                                            <Text weight="medium" className="text-white text-[16px]">Post</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }

    return (
        <View className="items-center justify-center h-[200px]">
            <Text weight="medium" className="text-[#888888] mb-4">No image selected</Text>
            <TouchableOpacity
                onPress={openPhotoOptions}
                className="bg-[#5992FF] px-4 py-3 rounded-[10px] items-center w-[80%]"
            >
                <Text weight="medium" className="text-white text-[16px]">Select Photo</Text>
            </TouchableOpacity>
        </View>
    );
};
