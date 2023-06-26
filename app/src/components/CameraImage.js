import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Modal, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { StyleSheet, Dimensions} from 'react-native';

export default function CameraImage({ navigation }) {
	const [hasPermission, setHasPermission] = useState(null);
	const [camera, setCamera] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
	const [colorFlash, setColorFlash] = useState('#fff');
	const [visibleVar, setVisibleVar] = useState(false);
	const [photoUri, setPhotoUri] = useState(null);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	const takePhoto = async () => {
		if(camera) {
			let photo = await camera.takePictureAsync({
				skipProcessing: true,
				base64: true
			});
			setPhotoUri(`data:image/png;base64,${photo.base64}`);
			setVisibleVar(true);
		}
	}

	const flipCamera = () => {
		type === Camera.Constants.Type.back
		? setType(Camera.Constants.Type.front)
		: setType(Camera.Constants.Type.back)
		
	}

	const flashLightMode = () => {
		colorFlash === '#fff' 
		? setColorFlash('yellow') 
		: setColorFlash('#fff')
		
		flashMode === Camera.Constants.FlashMode.on 
		? setFlashMode(Camera.Constants.FlashMode.off) 
		: setFlashMode(Camera.Constants.FlashMode.on)
	}

	const refusePhoto = () => {
		setVisibleVar(false);
		setPhotoUri(null);
	}
	
	const confirmPhoto = () => {
		navigation.navigate('Configuracoes', {
            imgUri: photoUri
        })
		setVisibleVar(false);
	}

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}
	return (
		<View style={{ flex: 1, backgroundColor: 'black	' }}>
			<View style={Style.headerBtn}></View>
			<Camera style={Style.containerModal} ref={ref => { setCamera(ref);}} flashMode={flashMode} type={type}>
				<View style={Style.containerBtn}>
					<TouchableOpacity style={Style.btnModelCameraBar} 
						onPress={flashLightMode}>
						<Ionicons name="md-flash" size={24} color={colorFlash} />
					</TouchableOpacity>
					<TouchableOpacity style={Style.btnModelCameraBar} 
						onPress={takePhoto}>
						<FontAwesome name='camera' size={24} color='#fff'></FontAwesome>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={flipCamera}
						style={Style.btnModelCameraBar}
					>
						<FontAwesome name="refresh"	size={24} color="#fff"></FontAwesome>
					</TouchableOpacity>
				</View>
			</Camera>
			<Modal
                animationType="slide"
                transparent={true}
                visible={visibleVar}
				style={Style.containerImage}
            >
				<View style={Style.containerImage}>
					{photoUri && 
						<Image style={Style.imgStyle} source={{ uri: photoUri }}/>
					}
				</View>

				<View style={Style.btnsAcceptOrRefuseImg}>
					<TouchableOpacity style={Style.btnRefuse} onPress={refusePhoto}>
						<FontAwesome name="times" size={24} color="#fff" />
					</TouchableOpacity>
					<TouchableOpacity style={Style.btnConfirm} onPress={confirmPhoto}>
						<FontAwesome name="check" size={24} color="#fff" />
					</TouchableOpacity>
				</View>
			</Modal>
		</View>
	);
}

const Style = StyleSheet.create({
    containerModal: {
        flex: 1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        justifyContent: 'flex-end'
    },
    containerBtn: {
        flexDirection: 'row',
        backgroundColor: 'black',
        width: Dimensions.get('window').width,
        height: 170,
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'flex-end',
    },
    refreshBtn: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    btnModelCameraBar: {
        width: 60,
        height: 60,
        borderRadius: 100,
        backgroundColor: 'rgba(255,255,255, 0.19)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgStyle: {
        width: Dimensions.get('window').width,
        height: 300
    },
    btnsAcceptOrRefuseImg: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 0,
        width: Dimensions.get('window').width,
        height: 170,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    btnConfirm: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#50ABFF',
        borderRadius: 50
    },
    btnRefuse: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff0000',
        borderRadius: 50
    },
    headerBtn: {
        height: 80,
        width: Dimensions.get('screen').width,
        backgroundColor: '#000'
    },
    containerImage: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    }
});