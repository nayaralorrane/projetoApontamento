import React from 'react';
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
import LocalStorage from '../controllers/LocalStorage';
import validate from '../controllers/validations/registerUser';

const serviceSignService = new signService();
const localStorage = new LocalStorage();

export default function Login({ navigation }) {
    const signUp = (dataSignUp) => {
        serviceSignService.singUp(dataSignUp)
        .then(resp => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${resp.token}`;

            let data = {
                token: resp.token,
                idUser: resp.id_user,
                email: dataSignUp.email,
                password: dataSignUp.password
            }
            localStorage.setItem('userData',JSON.stringify(data))
            navigation.reset({
				index: 0,
				routes: [{ name: 'MenuRoute' }]
			});
        })
        .catch(() => {
            ToastAndroid.show('Somethings wrong ! Error to save data', ToastAndroid.LONG, ToastAndroid.BOTTOM);
        })
    }

    return (
        <ScrollView style={Style.screenViewStyle}>
            <View style={Style.container}>
                <Title1 text={'Time Task'} />
                <Title2 text={'CRIE SUA CONTA'} />
                <Title2 text={'Preencha os campos abaixo'} />
                <Divider/>
                <Formik
                    initialValues={{
                        name: null,
                        email: null,
                        password: null
                    }}
                    onSubmit={(values) => signUp(values)}
                    validate={validate}
                >
                    {({ handleSubmit, handleChange, errors, values, touched }) => (
                        <>
                            <Input
                                placeholder={'Nome completo'}
                                value={values.name}
                                vModel={handleChange('name')}
                                error={(errors.name && touched.name) ? errors.name : false}
                            />
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
                                password={true}
                                error={(errors.password && touched.password) ? errors.password : false}
                            />
                            <GoogleButton />

                            <Button
                                setType={'primary'}
                                label={'CADASTRAR'}
                                actionOnPress={handleSubmit}
                            />
                            <Button
                                label={'Login'}
                                actionOnPress={ () => navigation.navigate('Login') }
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