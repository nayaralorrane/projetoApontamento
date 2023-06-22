import AsyncStorage  from '@react-native-async-storage/async-storage';
//é um componente que é responsável pelo armazenamento, listagem e remoção de dados do localStorage
export default class LocalStorage {
    async setItem(key, value) {
        try {
            await AsyncStorage.setItem(key, value).catch(e => e)
        } catch (error) {}
    }

    async getItem(key) {
        try {
            return await AsyncStorage.getItem(key).then(value => value)
        } catch (error) {}
    }

    async removeItem(itemName) {
        try {
            await AsyncStorage.removeItem(itemName)
        } catch (error) {}
	}
}
