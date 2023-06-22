import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, ToastAndroid } from "react-native";
import { Formik } from 'formik';
import { userService } from '../controllers/services/userService';

import Input from '../components/Input';
import Button from '../components/Button';
import ButtonMenu from '../components/ButtonMenu';
import ImgInput from '../components/ImgInput';
import Divider from '../components/Divider';
import validate from '../controllers/validations/userConfig';
import LocalStorage from '../controllers/LocalStorage';

const serviceUser = new userService();
const localStorage = new LocalStorage();
export default function Configuracoes({ navigation }) {
    const [img, setImg] = useState(null);
    const [userData, setUserData] = useState({
        name: null,
        email: null,
        attachment: null
    })

    const handleEditUser = (data) => {
        data.attachment = img;
        serviceUser.editUser(data)
        .then(() => {
            var dataUser = JSON.parse(localStorage.getItem('userData'))
            dataUser.email = data.email
            localStorage.setItem('userData', JSON.stringify(dataUser))
        })
        .catch(() => 
            ToastAndroid.show(
                'Somethings wrong ! Unable to save user',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            )
        )
    }

    const getUser = () => {
        serviceUser.getUser()
        .then(response => {
            setUserData({
                name: response.name,
                email: response.email,
                attachment: response.avatar
            })
            setImg(response.avatar)
        })
        .catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <ScrollView>
            <View style={Style.container}>
                <ButtonMenu navigation={navigation}/>
                <ImgInput
                    value={img}
                    vModel={setImg}
                />
                <Divider/>
                <View style={Style.contentForm}>
                    {
                        userData.name &&
                        <Formik
                            initialValues={userData}
                            onSubmit={(values) => handleEditUser(values)}
                            validate={validate}
                        >
                            {({ handleSubmit, handleChange, errors, values, touched }) => (
                                <>
                                    <View>
                                        <Input
                                            placeholder={'Nome completo'}
                                            value={values.name}
                                            vModel={handleChange('name')}
                                            error={(errors.name && touched.name) ? errors.name : false}
                                        />
                                        <Input
                                            placeholder={'E-mail'}
                                            value={values.email}
                                            vModel={handleChange('email')}
                                            error={(errors.email && touched.email) ? errors.email : false}
                                        />
                                    </View>
                                    <Button
                                        setType={'primary'}
                                        label={'SALVAR'}
                                        actionOnPress={handleSubmit}
                                    />
                                </>
                            )}
                        </Formik>
                    }
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
    contentForm: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
 })
