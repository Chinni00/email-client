import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Navbar from './Navbar';
import { outboxActions } from '../store';
import { useDispatch,useSelector } from 'react-redux';
import MainNav from './MainNav';


const Welcome = () => {
    const [email,setEmail] = useState('')
    const [existingInbox,setExistingInbox] = useState([])

    const toMailRef = useRef ();
    const composedMailRef = useRef();

    const uniqueId = useSelector(state=>state.uniqueId)
    const myMail = useSelector(state=>state.myMail)
    const myUserName = email.split('@')[0]
    const dispatch = useDispatch();
   
  

    useEffect(() => {
      const loggedEmail = localStorage.getItem('email');
      setEmail(loggedEmail);
      fetch(`https://email-client-9f987-default-rtdb.firebaseio.com/${uniqueId}.json`)
        .then((res) => res.json())
        .then((data) => {
          setExistingInbox(data);
          dispatch(outboxActions.storeDataInEmails(data)); // Dispatch the existingInbox data to the store
        });
    }, [dispatch,uniqueId]);
   

    const emailSentHandler = (e) => {
      e.preventDefault();
    
      const toMail = toMailRef.current.value;
      const toUserName = toMail.split('@')[0]
      const composedMail = composedMailRef.current.value;
      const userName = myUserName;
    
      const dataToSend =
        existingInbox && existingInbox.length > 0
          ? [...existingInbox, { to: toMail, composedMail, id: Math.random(), from: userName }]
          : [{ to: toMail, composedMail, id: Math.random(), from: userName }];
    
      fetch(`https://email-client-9f987-default-rtdb.firebaseio.com/${uniqueId}.json`, {
        method: 'PUT',
        body: JSON.stringify(dataToSend),
      })
        .then((res) => {
          if (res.ok) {
            alert('Email sent successfully');
            return fetch(`https://email-client-9f987-default-rtdb.firebaseio.com/${uniqueId}.json`);
          } else {
            let errorMessage = 'Something went wrong';
            return Promise.reject(errorMessage);
          }
        })
        .then((res) => res.json())
        .then((data) => {
          setExistingInbox(data);
          dispatch(outboxActions.storeDataInEmails(data)); // Dispatch the updated existingInbox data to the store
        })
        .catch((err) => {
          alert(err);
        });
    
      // Second API call for inbox flexibility
      fetch(`https://email-client-9f987-default-rtdb.firebaseio.com/inbox/${toUserName}.json`, {
        method: 'PUT',
        body: JSON.stringify(dataToSend),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (res.ok) {
            // Handle the success case of the second API call
          } else {
            return res.json().then((data) => {
              throw new Error(data.error);
            });
          }
        })
        .catch((err) => {
          alert(err);
        });
    };
    
      
console.log('mymail',email)
    console.log('existing emails',existingInbox)
  return (
    <>
  <MainNav />
  <Navbar data={existingInbox} />
   <center className='w-75 float-end mt-3'>
   <div>Welcome to Mail Box</div>
    <hr></hr>
   <div id='mailBox' className='container card p-5 shadow-lg'>
   <form onSubmit={emailSentHandler}>
  <div className="form-group">
    
    <input type="" class="form-control p-3 mb-3" ref={toMailRef} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="To: CC/Bcc" />
    
  </div>
  <div className="form-group">
    <input type="" className="form-control p-3 mb-3" id="exampleInputPassword1" placeholder="" disabled value='Your Mail' />
  </div>
 
    <textarea className="form-control mb-3 shadow" ref={composedMailRef} id="exampleFormControlTextarea1" placeholder='compose your mail' rows="10">
        
    </textarea>
    <div className="form-group card">
  <Editor
  toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassName"
/>
  </div>
  <button type="submit" className="btn btn-primary px-4 mt-3">Send</button>
</form>
      </div>
   </center>
    
    </>
    
  )
}

export default Welcome