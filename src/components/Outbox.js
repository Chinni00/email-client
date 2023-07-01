import React from 'react'
import Navbar from './Navbar'
import { useSelector } from 'react-redux'

const Outbox = () => {
  const emails = useSelector((state)=>state.emails)
  console.log('outbox',emails)
  return (
    <>
    <Navbar />
     <center className='w-75 float-end mt-3'>
        <div className='card me-3 pt-2' style={{minHeight:'90vh'}}>
          {
            emails.map(email=>
              <div className='card m-3 p-4 mb-4'>
                 <div className='b-5'>
                  <b className='m-5'>Email:</b><span className=''>{email.to}</span>
                 </div>
                 <hr></hr>
                 <div>
                  <p className=' fw-bold'>Composed Mail:</p><span className=''>{email.composedMail}</span>
                 </div>

              </div>
              )
          }
        </div>
    </center>
    </>
   
    
  )
}

export default Outbox