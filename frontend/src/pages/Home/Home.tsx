import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAuth } from '../../context/AuthContexProvider'
import { Button, Pill, Tabs } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RiAddLargeFill } from 'react-icons/ri';
import { ResponsiveLine } from '@nivo/line';
import MyLineChart from '../../components/common/Linegraph';
import { SiSurveymonkey } from 'react-icons/si';

function SurveyContainer() {
  const data = [1, 4, 6, 8, 9, 5, 4, 3, 5, 7, 7,,7,7,77,,77,77,,78, 57, 8, 0, 2, 4, 7];

  function SurveyContainerkids() {
    return (
      <div className='p-5 text-white flex items-center items-center font-bold h-[2rem] border-b-2 border-gray-500 w-full bg-transparent'>
        <div>name</div>
        <Button className='bg-[#008170]' bg="#008170" p="0" pt="0" ml="auto" >Edit</Button>
      </div>
    );
  }

  return (
    <div className='flex w-full flex-col h-full'>
      <div className='text-white items-center font-bold h-[10%] border-b-2 border-gray-500 w-full bg-black'>
        Name
      </div>
      <div className='flex flex-col gap-3  h-[100%]  flex-shrink overflow-y-scroll e'>
        {data.map((e, index) => {
          return <SurveyContainerkids key={index} />;
        })}
      </div>
    </div>
  );
}



function Home() {
  const navi = useNavigate()
  const cout = useSelector((state)=>state.counter.count)
  const {isAuthenticated,logout,user} = useAuth();
  const[userinfo,setuserinfo] = useState({email:"none",displayName:"none"})

  
  
    useEffect(()=>{

    },[])
    
  return (
    <div className='flex flex-1 h-full w-full p-4' >
      <div className='flex flex-col min-w-[100%] max-h-[100%] h-[100%] items-center gap-3 md:flex-row'>
        <div className='flex flex-col p-3 bg-[#161c23] flex-1 w-[100%] max-h-[95%] h-[95%] rounded-xl'>
          <div className='flex gap-2 items-center'>
            <Pill bg="#75e587">Open:34</Pill>
            <Pill bg="red">Closed:34</Pill>

            <Button onClick={()=>navi("/app/survey")} className='ml-auto' leftSection={<RiAddLargeFill/>} color='#005B41' bg="#005B41" radius="1rem" >Create Survey</Button>
          </div>
          <div className="bg-[#0f0f0f] overflow-y-auto max-h-[100%] h-full  mt-3">
            <SurveyContainer/>
          
            
          </div>
        </div>
        <div className='bg-[#232D3F] flex-1 w-[100%] h-[95%] rounded-xl'>
        <Tabs variant="outline" defaultValue="gallery">
      <Tabs.List className='text-white rounded-lg'>
        <Tabs.Tab value="total">
          Total
        </Tabs.Tab>
        <Tabs.Tab value="messages">
          By Survey
        </Tabs.Tab>
        <Tabs.Tab value="settings" >
          Settings
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value='total'>
        name
        <MyLineChart/>
      </Tabs.Panel>
      </Tabs>
        </div>
        
      </div>
    </div>
  )
}

export default Home