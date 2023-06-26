import React from 'react';
import ProjetoListagem from '../pages/ProjetoListagem';
import CadastroProjeto from './../pages/CadastroProjeto';
import ConsultaTimeTask from './../pages/ConsultaTimeTask';
import ApontamentoHoras from './../pages/ApontamentoHoras';
import Configuracoes from './../pages/Configuracoes';
import DrawerMenuStyle from './DrawerMenuStyle';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function MenuRoute() {
	return (
		<Drawer.Navigator
			initialRouteName="ApontamentoHoras"
			drawerContent={(props) => <DrawerMenuStyle {...props} />}
			screenOptions={{ headerShown: false }}
		>
			<Drawer.Screen name="ApontamentoHoras" component={ApontamentoHoras}/>
			<Drawer.Screen name="ProjetoListagem" component={ProjetoListagem}/>
			<Drawer.Screen name="CadastroProjeto" component={CadastroProjeto}/>
			<Drawer.Screen name="ConsultaTimeTask" component={ConsultaTimeTask}/>
			<Drawer.Screen name="Configuracoes" component={Configuracoes}/>
		</Drawer.Navigator>
	);
  }
