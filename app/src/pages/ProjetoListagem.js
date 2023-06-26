import { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Dimensions, ToastAndroid, SafeAreaView } from "react-native";
import { projectService } from "../controllers/services/projectService";

import Title1 from '../components/Title1';
import Title2 from '../components/Title2';
import Divider from '../components/Divider';
import ButtonMenu from '../components/ButtonMenu';
import ContainerListagem from "../components/ContainerListagem";
import Button from "../components/Button";

const serviceProject = new projectService();

export default function ProjetoListagem({ navigation }) {
    const [dataProjetos, setDataProjetos] = useState([]);

    const getProjetos = async () => {
        await serviceProject.getProject()
        .then(response => {
            setDataProjetos(response.data)
        })
        .catch(erro => {
            ToastAndroid.show('Unable to get projects', ToastAndroid.LONG, ToastAndroid.BOTTOM)
        })
    }

    const novoProjeto = () => {
        navigation.navigate({ name: 'CadastroProjeto'})
    }

    const deleteProjeto = (id) => {
        serviceProject.deleteProject(id)
        .then(() => {
            getProjetos()
            ToastAndroid.show('Success !', ToastAndroid.LONG, ToastAndroid.BOTTOM)
        })
        .catch(() =>
            ToastAndroid.show(
                'Somethings wrong ! Unable to save project',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            )
        )
    }

    const openProjeto = (projeto) => {
        navigation.navigate('CadastroProjeto', {
            projetoId: projeto.id,
            projetoName: projeto.name
        })
    }

    useEffect(() => {
        getProjetos()
    },[])

    return(
        <SafeAreaView style={Style.safeArea}>
            <ScrollView>
                <View style={Style.container}>
                    <ButtonMenu navigation={navigation}/>
                    <Title1 text={'Time Task'} />
                    <Title2 text={'PROJETOS'} />
                    <Divider/>
                    <View style={Style.content}>
                        <View style={Style.listagem}>
                            <ContainerListagem
                                arrayItems={dataProjetos}
                                refresh={getProjetos}
                                deleteAction={deleteProjeto}
                                editAction={(vl) => openProjeto(vl)}
                            />
                        </View>
                        <Button
                            setType={'primary'}
                            label={'NOVO PROJETO'}
                            actionOnPress={novoProjeto}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const Style = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        minHeight: Dimensions.get('screen').height - 25
    },
    listagem: {
        flex: 1
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    safeArea: {
        flex: 1,
        padding: 0
    }
 })
