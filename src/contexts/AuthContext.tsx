import { ReactNode, createContext, useEffect, useState } from "react";
import { UserDTO } from "../dtos/user";
import { api } from "../lib/api";
import { getUserSaveOnStorage, removeUserOfStorage, userSaveOnStorage } from "../storage/userStorage";

export type NewUser = {
  name: string
  email: string
  tel: string
  password: string
  avatar: string
}


type AuthContextProps = {
  user: UserDTO
  isLoadingStorageData: boolean
  signIn: (email:string, password:string)=> Promise<void>
  authentication: ()=>Promise<void>
  signOut: ()=>Promise<void>
  signUp: (newUser:NewUser)=>Promise<void>
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthContextProvider({children}:{children:ReactNode}){
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingStorageData, setIsLoadingStorageData] = useState(false)

  function storageUserAndToken(userData: UserDTO, token: string){
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(userData)
  }

  async function signIn(email:string, password:string){
    try{
      const {data} = await api.post("/sessions", {
        email,
        password
      })

      if(data.user && data.token && data.refresh_token){
        const {token, refresh_token} = data
        await userSaveOnStorage({token, refresh_token})
        storageUserAndToken(data.user, data.token)
      }
    }catch(error){
      throw error
    }
  }

  async function signUp(newUser: NewUser){
    try{
      const fileExtension = newUser.avatar.split('.').pop()

      const photoFile = {
        name: `${newUser.name}.${fileExtension}`.toLocaleLowerCase(),
        uri: newUser.avatar,
        type: `image/${fileExtension}`
      } as any

      const createUserForm = new FormData()
      createUserForm.append('avatar', photoFile)
      createUserForm.append('name', newUser.name)
      createUserForm.append('email', newUser.email)
      createUserForm.append('tel', newUser.tel)
      createUserForm.append('password', newUser.password)

      await api.post('/users', createUserForm,{
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      })

      await signIn(newUser.email, newUser.password)

    }catch(error){
      throw error
    }
  }

  async function authentication(){
    try{
      setIsLoadingStorageData(true)
      const {token} = await getUserSaveOnStorage()

      if(!token){
        return
      }

      const user = await api.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      storageUserAndToken(user.data, token)
    }catch(error){
      throw error
    } finally {
      setIsLoadingStorageData(false)
    }
  }

  useEffect(()=>{
    const subscribe = api.registerInterceptTokenManager(signOut)

    return ()=>{
      subscribe()
    }
  })

  async function signOut(){
    await removeUserOfStorage()
    setUser({} as UserDTO)
  }
  
  return (
    <AuthContext.Provider 
      value={{
        user,
        isLoadingStorageData, 
        signIn, 
        authentication, 
        signOut, 
        signUp
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}