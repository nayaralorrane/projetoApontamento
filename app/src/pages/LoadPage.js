import React, { useEffect } from 'react';
import { StyleSheet } from "react-native";
import { ActivityIndicator, View, Text } from 'react-native';
import { signService } from '../controllers/services/signService';

import axios from 'axios';
import generalStyle from './../assets/generalStyle';
import LocalStorage from './../controllers/LocalStorage';

const serviceSign = new signService()
const localStorage = new LocalStorage()

export default function LoadPage({ navigation }) {
    const failed = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login'}]
        });
    }

    const success = (response, dataSignIn) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
        var data = {
            token: response.token,
            idUser: response.id_user,
            email: dataSignIn.email,
            password: dataSignIn.password
        };
        localStorage.setItem('userData', JSON.stringify(data));

        navigation.reset({
            index: 0,
            routes: [{ name: 'MenuRoute' }]
        });
    }

    const ssoToken = (responseLocalStorage) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${responseLocalStorage.token}`;
        serviceSign.validateToken()
        .then(() => navigation.reset({
            index: 0,
            routes: [{ name: 'MenuRoute' }]
        }))
        .catch(() => signIn(responseLocalStorage))
    }

    const signIn = (dataSignIn) => {
        serviceSign.singIn(dataSignIn)
        .then(response => {
            success(response, dataSignIn);
        })
        .catch(error => {
            failed();
        })
    }

    useEffect(() => {
        localStorage.getItem('userData').then(responseLocalStorage => {
            if(responseLocalStorage) {
                responseLocalStorage = JSON.parse(responseLocalStorage);
                ssoToken(responseLocalStorage)
            } else {
                failed();
            }
        })
    });

    return (
        <View style={generalStyle.fullScreenContainer}>
            <View style={Style.container}>
                <Text style={Style.textStyle}>Bem Vindo !</Text>
                <ActivityIndicator size={'large'} color={'#fff'}/>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#B125B4'
    },
    textStyle: {
        color: '#fff',
        fontSize: 20,
        marginBottom: 100
    }
});