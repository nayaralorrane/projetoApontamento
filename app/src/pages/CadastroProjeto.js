import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { StyleSheet, View, ScrollView, Dimensions, ToastAndroid, SafeAreaView } from "react-native";
import { projectService } from '../controllers/services/projectService';

import Title1 from '../components/Title1';
import Title2 from '../components/Title2';
import Divider from '../components/Divider';
import Input from '../components/Input';
import Button from '../components/Button';
import ButtonMenu from '../components/ButtonMenu';
import validate from '../controllers/validations/project';

const serviceProject = new projectService();

export default function CadastroProjeto({ navigation, route }) {
    const [initialData, setInitialData] = useState({
        id: route.params?.projetoId ? route.params?.projetoId: null,
        name: route.params?.projetoName ? route.params?.projetoName : null
    });

    const saveProject = async (data) => {
        const request = initialData.id
        ? serviceProject.putProject(initialData.id, data)
        : serviceProject.postProject(data)

        await Promise.all([request])
        .then(() => {
            ToastAndroid.show('Projeto salvo !', ToastAndroid.LONG, ToastAndroid.BOTTOM)
            navigation.reset({
                index: 0,
                routes: [{ name: 'ProjetoListagem' }]
            });
        })
        .catch(() => {
            ToastAndroid.show('Erro ao salvar projeto !', ToastAndroid.LONG, ToastAndroid.BOTTOM)
        })
    }

    const backRoute = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'ProjetoListagem' }]
        });
    }

    return (
        <ScrollView>
            <View style={Style.container}>
                <ButtonMenu navigation={navigation}/>
                <Title1 text={'Time Task'} />
                <Title2 text={'CADASTRAR PROJETOS'} />
                <Title2 text={'Preencha os campos abaixo'} />
                <Divider/>
                <Formik
                    onSubmit={(values) => saveProject(values)}
                    validate={validate}
                    initialValues={initialData}
                >
                    {({ handleSubmit, handleChange, errors, values, touched }) => (
                        <>
                            <View style={Style.form}>
                                <Input
                                    value={values.name}
                                    vModel={handleChange('name')}
                                    placeholder={'Nome do Projeto'}
                                    error={(errors.name && touched.name) ? errors.name : false}
                                />
                                <View>
                                    <Button
                                        setType={'primary'}
                                        label={ route.params?.projetoId
                                            ? 'ATUALIZAR'
                                            : 'CADASTRAR'}
                                        actionOnPress={handleSubmit}
                                    />
                                    <Button
                                        setType={'secondary'}
                                        label={'VOLTAR'}
                                        actionOnPress={backRoute}
                                    />
                                </View>
                            </View>
                        </>
                    )}
                </Formik>
            </View>
        </ScrollView>
    )
}

const Style = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        minHeight: Dimensions.get('screen').height - 25
    },
    form: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
 })
