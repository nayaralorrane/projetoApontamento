import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import LocalStorage from './../controllers/LocalStorage';

const localStorage = new LocalStorage();

export default function DrawerContent(props) {
	const [menuName, setMenuName] = useState({
		'ConsultaTimeTask': '#A606A9',
		'ProjetoListagem': '#E5E5E5',
		'Configuracoes': '#E5E5E5',
		'Sair': '#E5E5E5'
	});

	const [textMenu, setTextMenu] = useState({
		'ConsultaTimeTask': '#FFF',
		'ProjetoListagem': '#A606A9',
		'Configuracoes': '#A606A9',
		'Sair': '#A606A9'
	});
	const [activityScreen, setActivityScreen] = useState('ConsultaTimeTask');

	const changeNavigation = (route) => {
		setMenuName(prevState => ({...prevState, [activityScreen]: '#E5E5E5'}));
		setMenuName(prevState => ({...prevState, [route]: '#A606A9'}));

		setTextMenu(prevState => ({...prevState, [activityScreen]: '#A606A9'}));
		setTextMenu(prevState => ({...prevState, [route]: '#FFF'}));

		setActivityScreen(route);
		props.navigation.reset({
            index: 0,
            routes: [{ name: route }]
        });
	}

	const logOut = () => {
		localStorage.removeItem('userData'); //remover os dados do usuário ao sair do app
//redireciona para página de login
		props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        });
	}

	return(
		<View style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
			<DrawerContentScrollView style={Style.drawerContent} {...props}>
				<DrawerItem
					style={{ backgroundColor: menuName['ConsultaTimeTask'], borderBottomWidth: 2, borderColor: '#B125B4'}}
					label={() => <Text style={[Style.menuTextStyle, { color: textMenu['ConsultaTimeTask']}]}>CONSULTA TIME TASK</Text>}
					onPress={() => changeNavigation('ConsultaTimeTask')}
				/>
				<DrawerItem
					style={{ backgroundColor: menuName['ProjetoListagem'], borderBottomWidth: 2, borderColor: '#B125B4'}}
					label={() => <Text style={[Style.menuTextStyle, { color: textMenu['ProjetoListagem']}]}>PROJETO</Text>}
					onPress={() => changeNavigation('ProjetoListagem')}
				/>
				<DrawerItem
					style={{ backgroundColor: menuName['Configuracoes'], borderBottomWidth: 2, borderColor: '#B125B4' }}
					label={() => <Text style={[Style.menuTextStyle, { color: textMenu['Configuracoes']}]}>CONFIGURAÇÕES</Text>}
					onPress={() => changeNavigation('Configuracoes')}
				/>
				<DrawerItem
					style={{ backgroundColor: menuName['Sair'], borderBottomWidth: 2, borderColor: '#B125B4' }}
					label={() => <Text style={[Style.menuTextStyle, { color: textMenu['Sair']}]}>SAIR</Text>}
					onPress={() => logOut()}
				/>
			</DrawerContentScrollView>
		</View>
	)
}

const Style = StyleSheet.create({
	drawerContent: {
		flex: 1,
		backgroundColor: '#E5E5E5',
		flexDirection: 'column',
		marginTop: 20
	},
	menuTextStyle: {
		fontSize: 15
	},
});
