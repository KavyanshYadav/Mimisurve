import axios from "axios"
import useApiUrl from "../hooks/useApiUrl"
import { useAuth } from "../context/AuthContexProvider"

interface LoginUserDataInterface{
    displayName: string,
    email : string 
    isAccessTokenSet: boolean

}

interface VerfiyUserData{
    verified:boolean
}

const apiClient  =  axios.create({
    baseURL:""
}
)

apiClient.interceptors.response.use((response)=>{

    console.log(response)


},(error)=>{

    if(error.response===401){
        const {logout} = useAuth()
        logout()
    }


})

export const ApiLoginUser =async (username:string,password:string) :Promise<LoginUserDataInterface>=> {
    const uri = "/auth/login"
    try{
        const res =await apiClient.get<LoginUserDataInterface>(uri)
        return res.data 
    }catch(error){
        console.log(error)
        throw new Error("ApiLoginUser request failed");
        
    }
}


export const VerfiyUser = async():Promise<VerfiyUserData> =>{
    const uri = "/auth/verify"
    try{
        const res =await apiClient.get<VerfiyUserData>(uri)
        return res.data 
    }catch(error){
        console.log(error)
        throw new Error("ApiLoginUser request failed");
        
    }
}

