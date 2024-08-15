import React from 'react'
import { useAuth } from '../../context/AuthContexProvider'
import { useNavigate } from 'react-router-dom';
import { Anchor, Button, Checkbox, Divider, Input } from '@mantine/core';
import { useRef, useState } from 'react';
export function Signup() {
    const EmailRef = useRef();
  const PasswordRef = useRef();
  const[disable,setdisable] = useState<boolean>(false);
  const[error,seterror] = useState<boolean>(false);

    const nav = useNavigate()
    const {login} = useAuth();
  return (
    <div className='flex-1 bg-grey flex-col flex items-center justify-center'>
    <div className="text-white p-4 mb-32  w-[60%]">
    <h1 className='text-4xl'>Sign up</h1>
    <div className="flex flex-row">
    <Input.Wrapper withAsterisk label="FirstName" mt={10}  error={error? "Incorrect Email ": ""}>
      <Input ref={EmailRef} disabled={disable} placeholder='adkas' color='primary'></Input>
    </Input.Wrapper>
    <Input.Wrapper withAsterisk label="LastName" mt={10}  error={error? "Incorrect Email ": ""}>
      <Input ref={EmailRef} disabled={disable} placeholder='adkas' color='primary'></Input>
    </Input.Wrapper>
    </div>
    <Input.Wrapper withAsterisk label="Email" mt={10} description="Enter your email:" error={error? "Incorrect Email ": ""}>
      <Input ref={EmailRef} disabled={disable} placeholder='adkas' color='primary'></Input>
    </Input.Wrapper>
    <Input.Wrapper withAsterisk label="Paaword" mt={10} description="Enter your password:" variant='filled'error={error? "Incorrect Password ": ""} >
      <Input disabled={disable}  ref={PasswordRef} type='password' placeholder='adkas' radius="md" w="100%" color='primary'></Input>
    </Input.Wrapper>
    <Input.Wrapper withAsterisk label="repeat Password" mt={10} description="Enter your password:" variant='filled'error={error? "Incorrect Password ": ""} >
      <Input disabled={disable}  ref={PasswordRef} type='password' placeholder='adkas' radius="md" w="100%" color='primary'></Input>
    </Input.Wrapper>
    <Checkbox
      label={
        <>
          I accept{' '}
          <Anchor href="https://mantine.dev" target="_blank" inherit>
            terms and conditions
          </Anchor>
        </>
      }
    />
    <div className="mt-4">
      <Button mr="1rem">SignUp</Button>
      <Button variant='outline' onClick={()=>nav("/login/login")}>Login</Button>
    </div>
    <Divider color='grey' mt="1rem"> </Divider>
    <div className='flex items-center justify-center'>
      <Button>google</Button>
      <Button>github</Button>

    </div>
    </div>

  </div>
  )
}

export default Signup