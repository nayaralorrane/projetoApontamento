import React from 'react';
import { StyleSheet, Text } from 'react-native';


export default function Title2(props) {
    return (
        <Text style={Style.title1}>{ props.text }</Text>
    )
}

const Style = StyleSheet.create({
    title1: {
        color: '#898686',
        fontSize: 20,
        margin: 5
    }
})