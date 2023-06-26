import { useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';

export default function ImgInput(props) {
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });
        if (!result.cancelled) props.vModel(`data:image/png;base64,${result.base64}`);

    };

    const openCamera = () => {
        props.navigation.push("CameraImage");
    }

    return (
        <TouchableOpacity style={Style.contentImgInput} onPress={openCamera}>
            {props.value
                ? <Image style={Style.img} source={{ uri: props.value }}/>
                : <Text style={Style.textStyle}>ALTERAR</Text>
            }
        </TouchableOpacity>
    )
}

const Style = StyleSheet.create({
    contentImgInput: {
        backgroundColor: '#C4C4C4',
        backdropFilter: 'blur(8px)',
        height: 120,
        width: 120,
        borderRadius: 100,
        marginTop: 95,
        marginBottom: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    textStyle: {
        color: '#FFF',
        marginBottom: 30
    },
    button: {
        height: 120,
        width: 120
    },
    img: {
        height: 120,
        width: 120,
        borderRadius: 100
    }
})