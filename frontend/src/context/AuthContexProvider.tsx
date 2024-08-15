import  { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { VerfiyUser } from '../service/auth';
import axios, { AxiosDefaults } from 'axios';

interface AuthContextType {
    isAuthenticated  :boolean,
    user : string | null,
    login : (username:string,password:string)=>void,
    logout: ()=> void,
    verfiyUser: () =>Promise<AxiosDefaults>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthContextProvider = ({children}:{children:ReactNode}) =>{
    const[user,setuser] = useState<string|null>(null);
    const[isAuthenticated,setisAuthenticated] = useState(true);
    

    const getUser =async()=>{
        try{
            const user = await axios.get("http://localhost:5000/api/user/info",{withCredentials:true})
            if(user){
                console.log("user set",user)
                setuser(user.data)
            }
        }catch(error){
            console.log("Cant get user info")
        }

    }



    const login = async(username:string,password:string) =>{
        return new Promise<boolean>(async(resP,rej)=>{
        //     setTimeout(() => {
                
        //         if (username==="admin" && password ==="admin"){
        //             setuser("me")
        //             setisAuthenticated(true)
        //             res(true);
        //         }else{
        //             res(false)
        //         }
        //     }, 3000);
        // })
        console.log(username,password)
        const res = await axios.post("http://localhost:5000/api/auth/login",{
            "email":username,
            "password":password
          },{
            withCredentials:true
          }).then(async (res)=>{
            if(res){
                setisAuthenticated(true)
                await getUser()
                resP(res.data)

            }

          }).catch((err)=>{
            console.log("error")
            resP(false);
          })
    })


    }

    const logout = ()=>{
        setuser(null)
        setisAuthenticated(false)
    }

    const verfiyUser = async() =>{
        const user = await axios.post("http://localhost:5000/api/auth/verify",{},{withCredentials:true})
        console.log(user.data)
        if(user.data.verified){
            console.log("verifiying")
            setisAuthenticated(true)
            await getUser()
        }else{
            console.log("seeting ")
            setisAuthenticated(false)
        }
        return user.data

    }
    useEffect(() => {
      
        // verfiyUser()

      
    }, [])
    

    return (
        <AuthContext.Provider value={{user,isAuthenticated,login,logout,verfiyUser}}>
            {children}
        </AuthContext.Provider>
    )

}


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };