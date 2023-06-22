import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppRoute = createStackNavigator();

import LoadPage from './pages/LoadPage';
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';
import MenuRoute from './menu/MenuRoute';

export function Routes() {
    return(
        <NavigationContainer>
            <AppRoute.Navigator screenOptions={{ headerShown: false }} initialRouteName={'LoadPage'}>
                <AppRoute.Screen name='LoadPage' component={LoadPage}></AppRoute.Screen>
                <AppRoute.Screen name='Login' component={Login}></AppRoute.Screen>
                <AppRoute.Screen name='RegisterUser' component={RegisterUser}></AppRoute.Screen>
                <AppRoute.Screen name='MenuRoute' component={MenuRoute}></AppRoute.Screen>
            </AppRoute.Navigator>
        </NavigationContainer>
    )
}
