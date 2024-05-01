import AsyncStorage from "@react-native-async-storage/async-storage"
import { TOKEN_STORAGE } from "./storageConfig"
import { AuthTokenDTO } from "../dtos/authToken"

export async function userSaveOnStorage({token, refresh_token}:AuthTokenDTO){
  try{
    await AsyncStorage.setItem(TOKEN_STORAGE, JSON.stringify({token, refresh_token}))
  }catch(error){
    throw error
  }
}

export async function getUserSaveOnStorage(){
  try{
    const storage = await AsyncStorage.getItem(TOKEN_STORAGE)

    const {token, refresh_token}: AuthTokenDTO = storage ? JSON.parse(storage) : {} 

    return {token, refresh_token}
  }catch(error){
    throw error
  }
}

export async function removeUserOfStorage(){
  try{
    await AsyncStorage.removeItem(TOKEN_STORAGE)
  }catch(error){
    throw error
  }
}