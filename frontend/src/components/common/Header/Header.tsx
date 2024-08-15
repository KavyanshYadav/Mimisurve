import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeProviderContext'
import { Avatar, ActionIcon } from '@mantine/core'
import { RiAccountBoxLine, RiFilePdfLine, RiHome6Line, RiSettings6Line } from 'react-icons/ri'
import classes from "./Header.module.css"


function WithIconAndButton({open=false ,icon ,style=null}){
  return(
    <div style={style} className={`flex justify-center items-center gap-2 p-2  ${open ? "min-w-[100%] " : "p-2 rounded-lg"} hover:bg-[#07080a] transition-all duration-100 ease-linear `}>
       {icon}
        <div style={open ? {width:"fit-content",display:"block",opacity:"90%"}:{width:"0",display:"none",opacity:"0"}} className='text-white transition-all duration-400'>Home</div>
    </div>
  )
}


function Header() {
    const {theme,setTheme} = useTheme()
    const nav = useNavigate()
    const [open,setopen] = useState(false);
    const [mousein,setmouse] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const mouseInRef = useRef(false); // Use useRef to track mouseIn state
  const timeoutIdRef = useRef(null);

    useEffect(() => {
      
      return () => {
        
      }
    }, [])
    
    const na = {
      minWidth:"5%"
    }
    const nam = {
      minWidth:"8%",
      justifyItem:"flex-start"
    }

    const handleMouseEnter = () => {
      mouseInRef.current = true;
      console.log("ad")
      afterSomeTime();
    };
    const afterSomeTime = () => {
      

      const id = setTimeout(() => {
        console.log()
        if (mouseInRef.current) {
          console.log("mouse")
          setopen(true);
        }
      }, 3000); // 3 seconds delay
      timeoutIdRef.current = id; // Save the timeout ID to clear it later if needed
    };
  
    // Clear timeout if mouse leaves before it completes
    const handleMouseLeave = () => {
      mouseInRef.current = false;
      setopen(false);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  

  return (
    <nav style={open ? nam :na } onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}  
     className={`flex  transition-all bg-[#0d1014]  items-end
     ${open ? "items-start":"items-center"}	
     ease-in duration-100  pt-4 items-center bg-transparent border-r-2 border-gray-500 flex-col`}>
        <Avatar onClick={()=>{setopen(open);console.log(open)}} mb="sm"></Avatar>
        <WithIconAndButton icon={<RiHome6Line color='white' size="1.4rem"/>} open={open}/>
        <WithIconAndButton icon={<RiAccountBoxLine color='white' size="1.4rem"/>} open={open}/>
        <WithIconAndButton icon={<RiFilePdfLine color='white' size="1.4rem"/>} open={open}/>
        <WithIconAndButton icon={<RiHome6Line color='white' size="1.4rem"/>} open={open}/>
        <WithIconAndButton style={{marginTop:"auto",marginBottom:"1rem"}} icon={<RiSettings6Line color='white' size="1.4rem"/>} open={open}/>


      

    </nav>
  )
}

export default Header