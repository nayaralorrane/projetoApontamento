import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, ToastAndroid } from "react-native";
import { projectService } from '../controllers/services/projectService';
import { pointService } from '../controllers/services/pointService';

import Title1 from '../components/Title1';
import Title2 from '../components/Title2';
import Button from '../components/Button';
import ButtonMenu from '../components/ButtonMenu';
import SelectInput from '../components/SelectInput';
import ContainerListagem from '../components/ContainerListagem';
import Divider from '../components/Divider';

const serviceProject = new projectService();
const servicePoint = new pointService();

export default function ConsultaTimeTask({ navigation }) {
    const [dataPontos, setDataPontos] = useState([]);
    const [arrayProjetos, setArrayProjetos] = useState([]);
    const [projetoId, setProjetoId] = useState();
    const [page, setPage] = useState(1);

    const getProjetos = () => {
        serviceProject.getProject()
            .then(response => {
                let array = response.data.map(projeto => {
                    return {
                        id: projeto.id,
                        placeholder: projeto.name
                    }
                });

                setArrayProjetos(array);
            })
    }

    const setNewPage = () => {
        setPage(page++);
        getPontos();
    }

    const getDiferenceTime = (startTime, endTime) => {
        const calcTime = new Date(new Date(endTime) - new Date(startTime));
        
        const hour = String(calcTime.getUTCHours()).length === 1 
            ? `0${calcTime.getUTCHours()}` 
            : calcTime.getUTCHours()
            
        const minute = String(calcTime.getUTCMinutes()).length === 1
            ? `0${calcTime.getUTCMinutes()}` 
            : calcTime.getUTCMinutes()
            

        const second = String(calcTime.getUTCSeconds()).length === 1
            ? `0${calcTime.getUTCSeconds()}` 
            : calcTime.getUTCSeconds()
        
        return `${hour}:${minute}:${second}`

    }

    const getPontos = async () => {
        var params = { page: page, per_page: 5 }
        if (projetoId) params['projeto_id'] = projetoId
        await servicePoint.getPoint(params)
            .then(response => {
                let data = response.data.map(elem => {
                    let times = convertTime(elem.date, elem.start_time, elem.end_time)
                    let taskTime = getDiferenceTime(times[0], times[1])

                    return {
                        id: elem.id,
                        name: elem.task_description,
                        task_description: elem.task_description,
                        date: elem.date,
                        start_time: times[0],
                        end_time: times[1],
                        project_id: elem.project_id,
                        task_time: taskTime
                    }
                })
                let arrayPoint = projetoId
                    ? data
                    : [...dataPontos, ...data]
                setDataPontos(arrayPoint)
            })
            .catch(() => ToastAndroid.show('Unable to get points', ToastAndroid.LONG, ToastAndroid.BOTTOM))
    }

    const openPonto = (vl) => {
        vl
           ? navigation.navigate('ApontamentoHoras', { ponto: vl })
           : navigation.navigate('ApontamentoHoras')

    }

    const deletePonto = (id) => {
        servicePoint.deletePoint(id)
            .then(() => {
                let data = dataPontos.filter(elem => elem.id !== id);
                setDataPontos(data)
                ToastAndroid.show('Point was deleted !', ToastAndroid.LONG, ToastAndroid.BOTTOM)
            })
            .catch(() => ToastAndroid.show(
                'Somethings wrong ! Unable to save project',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            ))
    }

    const convertTime = (date, startTime, endTime) => {
        date = date.split('/');
        startTime = startTime.split(':');
        endTime = endTime.split(':');

        startTime = String(new Date(
            Number(date[2]),
            Number(date[1]) - 1,
            Number(date[0]),
            startTime[0],
            startTime[1],
            startTime[2],
        ))
        endTime = String(new Date(
            Number(date[2]),
            Number(date[1]) - 1,
            Number(date[0]),
            endTime[0],
            endTime[1],
            endTime[2],
        ))

        return [startTime, endTime]
    }

    useEffect(() => {
        getProjetos();
        getPontos();
    }, [projetoId])

    return (
        <ScrollView style={Style.screenViewStyle}>
            <View style={Style.container}>
                <ButtonMenu navigation={navigation} />
                <Title1 text={'Time Task'} />
                <Title2 text={'CONSULTAR TIME TASK'} />
                <Divider />
                <SelectInput
                    placeholder="Selecione o projeto"
                    listOptions={arrayProjetos}
                    value={projetoId}
                    vModel={(vl) => setProjetoId(vl)}
                />
                <View style={Style.content}>
                    <View style={Style.listagem}>
                        <ContainerListagem
                            arrayItems={dataPontos}
                            refresh={setNewPage}
                            editAction={(vl) => openPonto(vl)}
                            deleteAction={deletePonto}
                        />
                    </View>
                    <Button
                        setType={'primary'}
                        label={'APONTAR'}
                        actionOnPress={openPonto}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const Style = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        minHeight: Dimensions.get('window').height
    },
    screenViewStyle: {
        height: Dimensions.get('window').height,
        padding: 0
    },
    listagem: {
        flex: 1
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})
