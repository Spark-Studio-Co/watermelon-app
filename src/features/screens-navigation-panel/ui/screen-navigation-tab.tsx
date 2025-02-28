import React from 'react'
import { ImageBackground } from 'react-native'
import { Button } from '@/src/shared/ui/button/button'

interface IScreenNavigationTab {
    uri: any
    width?: number
    margin?: number
}

export const ScreenNavigationTab = ({ uri, width = 190, margin,
}: IScreenNavigationTab) => {
    return (
        <Button variant="custom">
            <ImageBackground
                source={uri}
                style={{ width: width, height: 160, margin: margin }}
            />
        </Button>
    )
}
