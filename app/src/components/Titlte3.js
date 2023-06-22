import React from 'react';
import { StyleSheet, Text } from 'react-native';


export default function Title3(props) {
    return (
        <Text style={Style.title1}>{ props.text }</Text>
    )
}

const Style = StyleSheet.create({
    title1: {
        color: '#B125B4',
        fontSize: 10,
        margin: 5
    }
})