import React from 'react';
import { StyleSheet, TextInput, Dimensions } from 'react-native';

export default function Input(props) {
    return (
        <TextInput
            style={[Style.input, props.error ? Style.errorStyle : Style.defaultStyle ]}
            placeholder={props.placeholder}
            value={props.value}
            onChangeText={text => props.vModel(text)}
            secureTextEntry={props.password}
        />
    )
}

const Style = StyleSheet.create({
    input: {
        borderWidth: 2,
        width: Dimensions.get('window').width - 60,
        height: 50,
        padding: 15,
        borderRadius: 5,
        margin: 12
    },
    defaultStyle: {
        borderColor: '#898686'
    },
    errorStyle: {
        borderColor: '#DC0139'
    }
});