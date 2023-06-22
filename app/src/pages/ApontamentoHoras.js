import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, ToastAndroid } from "react-native";
import { projectService } from '../controllers/services/projectService';
import { pointService } from '../controllers/services/pointService';
import { Formik } from 'formik';

import Title1 from '../components/Title1';
import Title2 from '../components/Title2';
import Input from '../components/Input';
import Button from '../components/Button';
import ButtonMenu from '../components/ButtonMenu';
import SelectInput from '../components/SelectInput';
import DatetimeInput from '../components/DatetimeInput';
import Divider from '../components/Divider';
import validate from '../controllers/validations/apontamento';

const serviceProject = new projectService();
const servicePoint = new pointService();

export default function ApontamentoHoras({ navigation, route }) {
    const [arrayProjetos, setArrayProjetos] = useState([])
    const [initialData, setInitialData] = useState({
        id: route.params?.ponto.id ? route.params?.ponto.id : null,
        date: route.params?.ponto.date ? route.params?.ponto.date : null,
        description: route.params?.ponto.name ? route.params?.ponto.name : null,
        projetoId: route.params?.ponto.project_id ? String(route.params?.ponto.project_id) : null,
        startTime: route.params?.ponto.start_time ? route.params?.ponto.start_time : null,
        endTime: route.params?.ponto.end_time ? route.params?.ponto.end_time : null
    })

    const getProjetos = () => {
        serviceProject.getProject()
        .then(response => {
            let array = response.data.map(projeto => {
                return {
                    id: String(projeto.id),
                    placeholder: projeto.name
                }
            });

            setArrayProjetos(array);
        })
    }

    useEffect(() => {
        getProjetos();
    },[])

    const backRoute = () => { navigation.navigate('ConsultaTimeTask'); }

    const saveApontamento = (dataPoint) => {
        const data = {
            "task_description": dataPoint.description,
            "date": new Date(dataPoint.date).toLocaleDateString('en-GB'),
            "start_time": new Date(dataPoint.startTime).toLocaleTimeString('pt-BR'),
            "end_time": new Date(dataPoint.endTime).toLocaleTimeString('pt-BR'),
            "project_id": Number(dataPoint.projetoId)
        }

        const request = initialData.id
            ? servicePoint.putPoint(initialData.id, data)
            : servicePoint.postPoint(data)

        Promise.all([request])
        .then(() => {
            ToastAndroid.show('Ponto save !', ToastAndroid.LONG, ToastAndroid.BOTTOM)
            navigation.reset({
                index: 0,
                routes: [{ name: 'ConsultaTimeTask' }]
            })
        })
        .catch(error => {
            ToastAndroid.show('Erro ao salvar ponto !', ToastAndroid.LONG, ToastAndroid.BOTTOM)
        })
    }

    return (
        <ScrollView style={Style.scroll}>
            <View style={Style.container}>
                <ButtonMenu navigation={navigation}/>
                <Title1 text={'Time Task'} />
                <Title2 text={'APONTAR HORAS'} />
                <Divider/>
                <Formik
                    initialValues={initialData}
                    onSubmit={(values) => saveApontamento(values)}
                    validate={validate}
                >
                    {({ handleSubmit, handleChange, errors, values, touched }) => (
                        <View style={Style.contentForm}>
                            <View>
                                <DatetimeInput
                                    placeholder="Data"
                                    vModel={handleChange('date')}
                                    value={values.date}
                                    error={(errors.date && touched.date) ? errors.date : false}
                                />
                                <Input
                                    placeholder={'Descreva sua task'}
                                    value={values.description}
                                    vModel={handleChange('description')}
                                    error={(errors.description && touched.description) ? errors.description : false}
                                />
                                <SelectInput
                                    listOptions={arrayProjetos}
                                    placeholder="Selecione um projeto"
                                    value={values.projetoId}
                                    vModel={handleChange('projetoId')}
                                    error={(errors.projetoId && touched.projetoId) ? errors.projetoId : false}
                                />

                                <View style={Style.contentDate}>
                                    <DatetimeInput
                                        placeholder="Iniciado"
                                        vModel={handleChange('startTime')}
                                        value={values.startTime}
                                        type="time"
                                        error={(errors.startTime && touched.startTime) ? errors.startTime : false}
                                        />
                                    <DatetimeInput
                                        placeholder="Finalizado"
                                        vModel={handleChange('endTime')}
                                        value={values.endTime}
                                        type="time"
                                        error={(errors.endTime && touched.endTime) ? errors.endTime : false}
                                    />
                                </View>
                            </View>

                            <View>
                                <Button
                                    setType={'primary'}
                                    label={'SALVAR'}
                                    actionOnPress={handleSubmit}
                                />
                                <Button
                                    setType={'second'}
                                    label={'CONSULTAR'}
                                    actionOnPress={backRoute}
                                />
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </ScrollView>
    )
}

const Style = StyleSheet.create({
    scroll: {
        height: Dimensions.get('screen').height
    },
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        minHeight: Dimensions.get('window').height
    },
    contentForm: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    contentDate: {
        flexDirection: 'row'
    }
 })
