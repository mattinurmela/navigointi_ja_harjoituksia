import React from "react"
import StyleSheet from './Styles'
import { BackHandler, Button, Text, View } from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation'
import { useEffect, useState } from 'react'

export default function SecondScreen({route, navigation}) {
    useEffect(() => {
        if (route.params?.message) {
            alert(route.params.message)
        }
        BackHandler.addEventListener('hardwareBackPress', close)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', close)
        }
    }, [])

    function close() {
        navigation.goBack(null)
        return true
    }

    const [screenOrientation, setScreenOrientation] = useState('portrait')
    const [isPortrait, setIsPortrait] = useState('true')


    useEffect(() => {
        const subscription = ScreenOrientation.addOrientationChangeListener((value) => {
            if (value.orientationInfo.orientation === ScreenOrientation.Orientation.PORTRAIT_UP) {
                setScreenOrientation('portrait')
                setIsPortrait(true)
            } else if (value.orientationInfo.orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT || value.orientationInfo.orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT) {
                setScreenOrientation('landscape')
                setIsPortrait(false)
            }
        })

        return () => {
            ScreenOrientation.removeOrientationChangeListener(subscription)
        }
    }, [])

    const lockToPortrait = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    }


    return (
        <View style={[StyleSheet.container, isPortrait ? StyleSheet.portrait : StyleSheet.landscape]}>
            <Text>{screenOrientation}</Text>
            <Button title="Lock to portrait" onPress={lockToPortrait} />
        </View>
    );
}