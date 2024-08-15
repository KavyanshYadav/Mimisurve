import { Button } from '@mantine/core'
import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

function CreateSurvey(){
    return(
        <div>
            <Button>name</Button>
        </div>
    )
}


function Survey() {
    const location = useLocation()
    console.log(location)
  return (
    <Routes>
        <Route path='/create' element={<CreateSurvey/>}></Route>
        <Route path='/edit' element={<CreateSurvey/>}></Route>

    </Routes>
  )
}

export default Survey