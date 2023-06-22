import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';

export default function Button(props) {
    return (
        <>
            { props.setType === 'primary'
                ? <TouchableOpacity
                    style={[Style.btn, Style.primary]}
                    onPress={() => { props.actionOnPress() }}
                >
                    <Text style={Style.primary} >{props.label}</Text>
                </TouchableOpacity>
                : <TouchableOpacity
                    style={[Style.btn, Style.secondary]}
                    onPress={() => { props.actionOnPress() }}
                >
                    <Text style={Style.secondary}>{props.label}</Text>
                </TouchableOpacity>
            }
        </>
    )
}

const Style = StyleSheet.create({
    btn: {
        width: Dimensions.get('window').width - 60,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 12,
    },
    primary: {
        backgroundColor: '#B125B4',
        color: '#fff',
        fontSize: 18
    },
    secondary: {
        color: '#898686',
        fontSize: 18
    }
});