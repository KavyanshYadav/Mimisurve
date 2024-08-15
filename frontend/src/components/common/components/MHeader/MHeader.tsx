import { Button } from '@mantine/core'
import React from 'react'

function MHeader() {
  return (
    <div className='flex text-white p-3 border-b-2 border-gray-500 pt-4 mb-0'>
        <h2 className='text-xl flex-1'>DashBoard</h2>
        <div className='m-auto'>
            <Button>Nmae</Button>
            <Button>Nmae</Button>
        </div>

    </div>
  )
}

export default MHeader