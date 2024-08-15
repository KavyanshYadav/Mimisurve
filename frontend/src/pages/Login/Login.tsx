import { useAuth } from '../../context/AuthContexProvider'
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Divider, Input, PasswordInput } from '@mantine/core';
import { useRef, useState } from 'react';
import axios from 'axios';
function Login() {
  const EmailRef = useRef();
  const PasswordRef = useRef();
  const[disable,setdisable] = useState<boolean>(false);
  const[error,seterror] = useState<boolean>(false);

    const nav = useNavigate()
    const {login} = useAuth();

    const location = useLocation()

  async function Login(){
    
    setdisable(true)
    const res = await login(EmailRef.current.value,PasswordRef.current.value)
    console.log(res)
    if(res){
      nav("/app")
    }else{
      seterror(true);
    }
    setdisable(false)
    console.log("logged in")

  }

  async function verify(){
    await axios.post('http://localhost:5000/api/auth/verify',{}, {
      withCredentials: true
  })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
  }


  return (
        <div className='flex-1  mt-[20%] mb:mt-[50%] mb:transform mb:scale-200 min-w-[100%] min-h-[100%] flex-col flex items-center justify-center'>
          <div className="text-white p-4 mb-32  w-[60%]">
          <h1 className='text-4xl'>Login</h1>
          <Input.Wrapper withAsterisk label="Email" mt={10} description="Enter your email:" error={error? "Incorrect Email ": ""}>
            <Input ref={EmailRef} type="email" disabled={disable} placeholder='adkas' color='primary'></Input>
          </Input.Wrapper>
          <Input.Wrapper withAsterisk label="Paaword" mt={10} description="Enter your password:" variant='filled'error={error? "Incorrect Password ": ""} >
            <PasswordInput disabled={disable}  ref={PasswordRef} type='password' placeholder='adkas' radius="md" w="100%" color='primary'/>
          </Input.Wrapper>
          <div className="mt-4">
            <Button bg='#005B41' mr="1rem" onClick={()=>Login()}>Login</Button>
            <Button  bg='#005B41' variant='outline' onClick={()=>nav("/login/signup")}>Sign up</Button>
          </div>
          <Divider color='grey' mt="1rem"> </Divider>
          <div className='flex items-center justify-center'>
            <Button onClick={()=>{

              window.location.replace("http://localhost:5000/api/auth/google")


            }}>google</Button>
            <Button onClick={()=>{

              window.location.replace("http://localhost:5000/api/auth/github")

            }}>github</Button>

          </div>
          </div>

        </div>
 )
}

export default Login