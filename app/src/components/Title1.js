import React from 'react';
import { StyleSheet, Text } from 'react-native';


export default function Title1(props) {
    return (
        <Text style={Style.title1}>{ props.text }</Text>
    )
}

const Style = StyleSheet.create({
    title1: {
        color: '#B125B4',
        fontSize: 50,
        margin: 5,
        marginTop: 95
    }
})