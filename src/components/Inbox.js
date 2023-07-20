import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import MainNav from './MainNav'
import Navbar from './Navbar'
import { outboxActions } from '../store'
import { useNavigate } from 'react-router-dom'
import InboxItem from './InboxItem'


const Inbox = () => {
   
  const myMail = useSelector(state=>state.myMail)
  const myUserName = myMail.split('@')[0]
  const inbox = useSelector(state=>state.inBox)

  const dispatch= useDispatch();
  const navigate = useNavigate()

   const fetchInbox =()=>{
    fetch(`https://email-client-9f987-default-rtdb.firebaseio.com/inbox/${myUserName}.json`).then(res=>res.json())
    .then(data=> {
        dispatch(outboxActions.setInbox(data))
    }).catch(err=>console.log(err))
   } 
 
   console.log('inbox',inbox)

   const deleteHandler =(id)=>{
    const filteredEmails = inbox.filter(item=>item.id!==id);
    dispatch(outboxActions.setInbox(filteredEmails))
    fetch(`https://email-client-9f987-default-rtdb.firebaseio.com/inbox/${myUserName}.json`,{
     method:'PUT',
     body:JSON.stringify(filteredEmails),
     headers:{
       'Content-Type':'application/json'
     }
    }).then(res=>res.json()).catch(err=>console.log(err))
 }
 useEffect(()=>{
    fetchInbox();
  },[dispatch]);

  
 
  return (
    <>
    <MainNav />
    <Navbar />
    <div className=''>
       <center>
       <div className=''>
        <h1>Inbox</h1>
        </div>
       </center>
       
        
        
      {inbox === null || inbox === undefined ? (<p>You didn't receive any mail</p>) : (
        <center className="w-75 float-end mt-3">
          <hr></hr>
          <div className="card me-3 pt-2" style={{ minHeight: "90vh" }}>
          <h3>Emails</h3>
            {inbox.map((email) => (
              <div
                className="card m-3 p-3 mb-4"
                key={email.id}
                style={{ cursor: "pointer" }}
                 
              >
                <div className="b-5 d-flex justify-content-around align-items-center">
                  <div className="b-5" >
                    <InboxItem from={email.from} id={email.id}  />
                  </div>
                  <button className="btn btn-success" onClick={()=>{deleteHandler(email.id)}} >Delete</button>
                </div>
              </div>
            ))}
          </div>
        </center>
      )}
    </div>
    </>
  )
}

export default Inbox