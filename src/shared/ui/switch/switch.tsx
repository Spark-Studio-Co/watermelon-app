import React, { useState } from 'react';
import { View, TouchableOpacity, } from 'react-native';

interface SwitchProps {
    enabled: boolean;
    className?: string;
    toggle: () => void
}

export const Switch = ({ toggle, enabled, className = '' }: SwitchProps) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={toggle}
            className={`items-center justify-center ${className}`}
        >
            <View
                className="w-14 h-8 rounded-full p-1 bg-gray-500"
            >
                <View
                    className={`w-6 h-6 rounded-full bg-white shadow-md ${enabled ? 'translate-x-6' : 'translate-x-0'}`}
                />
            </View>
        </TouchableOpacity>
    );
};
