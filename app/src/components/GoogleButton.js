import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

export default function GoogleButton(props) {
    return (
        <>
            <TouchableOpacity style={Style.button} onPress={() => { props.actionOnPress() }}>
                <Image style={Style.img} source={ require('../assets/img/google.png') }></Image>
            </TouchableOpacity>
        </>
    )
}

const Style = StyleSheet.create({
    img: {
        width: 30,
        height: 30
    },
    button: {
        width: Dimensions.get('window').width - 60,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 12
    }
});