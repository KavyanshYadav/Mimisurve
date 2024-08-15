import { ActionIcon, Button, Pill, Skeleton, Stack } from "@mantine/core"
import { useEffect, useState } from "react"
import { Ri4kLine, RiPresentationLine } from "react-icons/ri"
import classes from "./survey.module.css"

function SurveyListItem({closed,}){

    return(
        <div className="bg-[#FFFFF]  flex flex-col rounded-md min-h-[10rem] max-w-[30%] mr-4 min-w-[10rem]  bg-[#FFFFFF] p-4 ">
            <div className="flex min-w-[100%]  items-center ">
                <Pill bg="green">Open</Pill>
                <ActionIcon ml="auto" bg="transparent" ><Ri4kLine color="black"></Ri4kLine></ActionIcon>
            </div>
            <h2 className="text-xl font-bold">Name dd ad sadasdsad</h2>
            <div className="mt-4 flex items-center font-semibold text-gray-800">
                <p>0/25</p><RiPresentationLine></RiPresentationLine>
                 <p>responses</p>
            </div>
            <Button>Edit</Button>
        </div>
    )
}


function SurveyContainer() {
    const [loading,setloadin] = useState(true);
    const [na,setna] = useState([])

    async function name() {
    return new Promise((res,rej)=>{
        setTimeout(() => {
            res([{
                name:"e"
            },{
                name:"3"
            },{
                name:"e"
            },{
                name:"3"
            },{
                name:"e"
            },{
                name:"3"
            },{
                name:"e"
            },{
                name:"3"
            },{
                name:"3"
            },{
                name:"3"
            },{
                name:"3"
            },{
                name:"3"
            },{
                name:"3"
            },{
                name:"3"
            },{
                name:"3"
            }])
        }, 1);
    })
    }

    useEffect(()=>{
        (async()=>{
            const res =await name()
            console.log(res)
            setna(res)
            setloadin(false)
        })()
        

    },[])

  return (
      <>
        <div className="rounded-xl  max-h-[100%] min-h-[100%] gap-3 items-baseline overflow-scroll flex flex-wrap  min-w-[100%] " >
        {
            na?.map((e)=>{return <SurveyListItem/>})
        }
        </div>  
        
    
    </>
)
}

export default SurveyContainer