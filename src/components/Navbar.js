import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = ({data}) => {
   
    const navigate = useNavigate()
  return (
    <div className='w-25 mt-5 ' style={{height:'100vh',float:'left'}}>
        <div className='mt-5'>
            <button className='btn btn-primary px-5' onClick={()=>{navigate('/outbox')}}>OutBox</button>
        </div>
        <div className='mt-5'>
            <button className='btn btn-primary px-4' onClick={()=>{navigate('/welcome')}}>Compose Mail</button>
        </div>
    </div>
  )
}

export default Navbar