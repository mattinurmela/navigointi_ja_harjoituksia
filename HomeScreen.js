import React, { useLayoutEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";
import StyleSheet from './Styles';
import { AntDesign } from '@expo/vector-icons';

export default function HomeScreen({navigation}) {
    const [message, setMessage] = useState('') 

    useLayoutEffect(() => {
      navigation.setOptions({
        headerStyle: {
            backgroundColor: '#f0f0f0'
        },
        headerRight: () => (
            <AntDesign
                style={StyleSheet.navButton}
                name="arrowright"
                size={24}
                onPress={() => {
                    navigation.navigate('Second', { message: message })
                }}
            />
        )
      })
    }, [message])

  return (
    <View style={StyleSheet.container}>
      <Text style={StyleSheet.text}>HomeScreen</Text>
      <TextInput onChangeText={text => setMessage(text)} value={message} placeholder="Type message here"/>
    </View>
  );
}