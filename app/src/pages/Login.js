import React, { useEffect, useState } from 'react';
// import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';

import { StyleSheet, View, ScrollView, Dimensions, ToastAndroid } from "react-native";
import { signService } from '../controllers/services/signService';
import { Formik } from 'formik';
import axios from 'axios';

import Title1 from '../components/Title1';
import Title2 from '../components/Title2';
import Divider from '../components/Divider';
import Input from '../components/Input';
import Button from '../components/Button';
import GoogleButton from '../components/GoogleButton';
import validate from '../controllers/validations/login';
import LocalStorage from '../controllers/LocalStorage';

const serviceSign = new signService();
const localStorage = new LocalStorage();

// WebBrowser.maybeCompleteAuthSession();

export default function Login({ navigation }) {
    // const [request, response, promptAsync] = Google.useAuthRequest({
    //     expoClientId: '718770038310-419c4b0qpfdk3tkcbd1useeq3sm9qfdv.apps.googleusercontent.com'
    // });
    
    const ssoSign = (accessToken) => {
        serviceSign.ssoSign({
            'access_token': accessToken
        })
        .then(response => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
            var data = {
                token: response.token,
                idUser: response.id_user,
                email: response.email,
            };
            localStorage.setItem('userData', JSON.stringify(data));

            navigation.reset({
                index: 0,
                routes: [{ name: 'MenuRoute' }]
            });
        })
        .catch(() => ToastAndroid.show('Error on sing-in !', ToastAndroid.LONG, ToastAndroid.BOTTOM))
    }
    
    // useEffect(() => {
    //     if (response?.type === 'success') {
    //         const { authentication } = response;
    //         ssoSign(authentication.accessToken)
    //     }
    // }, [response]);

    const signIn = (dataSignIn) => {
        serviceSign.singIn(dataSignIn)
        .then(response => {
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
        })
        .catch(() => {
            ToastAndroid.show('Error on sing-in !', ToastAndroid.LONG, ToastAndroid.BOTTOM)
        });
    }

    return (
        <ScrollView style={Style.screenViewStyle}>
            <View style={Style.container}>
                <Title1 text={'Time Task'} />
                <Title2 text={'ACESSE O TIME TASK'} />
                <Title2 text={'Preencha os campos abaixo'} />
                <Divider/>
                <Formik
                    initialValues={{
                        email: null,
                        password: null
                    }}
                    onSubmit={(values) => signIn(values)}
                    validate={validate}
                >
                    {({ handleSubmit, handleChange, errors, values, touched }) => (
                        <>
                            <Input
                                placeholder={'E-mail corporativo'}
                                value={values.email}
                                vModel={handleChange('email')}
                                error={(errors.email && touched.email) ? errors.email : false}
                            />
                            <Input
                                placeholder={'Senha'}
                                value={values.password}
                                vModel={handleChange('password')}
                                error={(errors.password && touched.password) ? errors.password : false}
                                password={true}
                            />
                            {/* <GoogleButton
                                actionOnPress={ () => promptAsync() }
                            /> */}
                            <Button
                                setType={'primary'}
                                label={'ACESSE SUA CONTA'}
                                actionOnPress={handleSubmit}
                            />
                            <Button
                                label={'Cadastre sua conta agora'}
                                actionOnPress={ () => navigation.navigate('RegisterUser') }
                            />
                        </>
                    )}
                </Formik>
            </View>
        </ScrollView>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        minHeight: Dimensions.get('screen').height - 25
    },
    screenViewStyle: {
        flex: 1,
        padding: 0
    }
 })
