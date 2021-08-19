import AsyncStorage from '@react-native-async-storage/async-storage'

export class AppStorage {
  static async storeData (key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      throw Error("Can't store data")
    }
  }

  static async storeObjectData<V> (key: string, value: V): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      throw Error("Can't store data")
    }
  }

  static async getData(key: string): Promise<string | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue;
    } catch(e) {
      throw Error("Can't get data")
    }
  }

  static async getObjectData<V> (key: string): Promise<V | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      throw Error("Can't get data")
    }
  }
}