import axios, { AxiosError, AxiosInstance } from "axios";
import { AppError } from "../utils/AppError";
import { getUserSaveOnStorage, userSaveOnStorage } from "../storage/userStorage";

type PromiseProps = {
  onSuccess: (token:string)=>void
  onFailure: (error: AxiosError)=>void
}

type signOut = ()=>void
type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut:signOut)=>()=>void
}

let failedQueue: Array<PromiseProps> = []
let isRefreshing = false


const api = axios.create({
  baseURL: "http://192.168.18.8:3333"
}) as APIInstanceProps

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use((response)=>response, async(requestError)=>{
    if(requestError.response?.status === 401){
      if(requestError.response.data?.message === "token.expired" || requestError.response.data?.message === "token.invalid"){
        const {refresh_token} = await getUserSaveOnStorage()

        if(!refresh_token){
          signOut()
          return Promise.reject(requestError)
        }

        const originalRequestConfig = requestError.config

        if(isRefreshing){
          return new Promise((resolve, reject)=>{
            failedQueue.push({
              onSuccess: (token:string)=>{
                originalRequestConfig.headers = {'Authorization': `Bearer ${token}`}
                resolve(api(originalRequestConfig))
              },
              onFailure: (error:AxiosError)=>{
                reject(error)
              }
            })
          })
        }
        isRefreshing = true
  
        return new Promise(async(resolve, reject)=>{
          try{
            const {data, status} = await api.post('/sessions/refresh-token', {refresh_token})
            
            if(status === 401){
              signOut()
              return Promise.reject(requestError)
            }
            await userSaveOnStorage({token: data.token, refresh_token})

            originalRequestConfig.headers = {'Authorization': `Bearer ${data.token}`}
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

            failedQueue.forEach(request=>{
              request.onSuccess(data.token)
            })

            console.log('TOKEN ATUALIZADO!')
            resolve(api(originalRequestConfig))
          }catch(error:any){
            failedQueue.forEach(request=>{
              request.onFailure(error)
            })
          }finally{
            isRefreshing=false
            failedQueue=[]
          }
        })
      }

      signOut()
    }

    if(requestError.response && requestError.response.data){
      return Promise.reject(new AppError(requestError.response.data.message))
    }

    return Promise.reject(requestError)
  })

  return ()=>{
    api.interceptors.response.eject(interceptTokenManager)
  }
}



export {api}