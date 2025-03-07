

import React, { useState } from 'react';
import { View, TouchableOpacity, } from 'react-native';

interface SwitchProps {
    defaultValue?: boolean;
    onValueChange?: (value: boolean) => void;
    className?: string;
}

export const Switch = ({ defaultValue = false, onValueChange, className = '' }: SwitchProps) => {
    const [isEnabled, setIsEnabled] = useState(defaultValue);

    const toggleSwitch = () => {
        const newValue = !isEnabled;
        setIsEnabled(newValue);
        onValueChange?.(newValue);
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleSwitch}
            className={`items-center justify-center ${className}`}
        >
            <View
                className="w-14 h-8 rounded-full p-1 bg-gray-500"
            >
                <View
                    className={`w-6 h-6 rounded-full bg-white shadow-md ${isEnabled ? 'translate-x-6' : 'translate-x-0'}`}
                />
            </View>
        </TouchableOpacity>
    );
};
