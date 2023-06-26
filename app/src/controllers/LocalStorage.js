import AsyncStorage  from '@react-native-async-storage/async-storage';

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
