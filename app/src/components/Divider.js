import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';

export default function Divider() {
    return (
        <View style={Style.container}>
            <View  style={Style.line}/>
            <View  style={Style.line}/>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: Dimensions.get('window').width,
        margin: 30
    },
    line: {
        height: 2,
        width: Dimensions.get('window').width - 252,
        backgroundColor: '#898686'
    }
})