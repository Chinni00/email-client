import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Welcome = () => {
    const [email,setEmail] = useState('')
    const [existingInbox,setExistingInbox] = useState([])

    const toMailRef = useRef ();
    const composedMailRef = useRef();

    useEffect(()=>{
    const loggedEmail = localStorage.getItem('email')
    setEmail(loggedEmail);
    },[])
  

    console.log(email)
    console.log(existingInbox)

    const emailSentHandler =(e)=>{
        e.preventDefault();

       const toMail = toMailRef.current.value;
       const composedMail = composedMailRef.current.value

  

        fetch(`https://email-client-9f987-default-rtdb.firebaseio.com/${email}/.json`,{
            method:'PUT',
            body:JSON.stringify([...existingInbox,{
                to:toMail,
                composedMail : composedMail
            }])
           
        }).then(res=>{
            if (res.ok){
                alert('email sent successfully')
            }else{
               return res.json().then(data=>{
                let errorMessage = 'Something went wrong';
                if(data && data.error && data.error.message){
                    errorMessage = data.error.message
                }
                throw new Error(errorMessage)
               })
            }
        }).catch(err=>{alert(err.message)})
    }

    useEffect(()=>{
        fetch('https://email-client-9f987-default-rtdb.firebaseio.com./email.json').then(res=>res.json())
        .then(data => setExistingInbox(data))
    },[])
  return (
    <>
    <div>Welcome to Mail Box</div>
    <hr></hr>

   <center>
   <div id='mailBox' className='container card p-5 shadow-lg'>
   <form onSubmit={emailSentHandler}>
  <div className="form-group">
    
    <input type="" class="form-control p-3 mb-3" ref={toMailRef} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="To: CC/Bcc" />
    
  </div>
  <div className="form-group">
    <input type="" className="form-control p-3 mb-3" id="exampleInputPassword1" placeholder="" disabled value='Your Mail' />
  </div>
 
    <textarea className="form-control mb-3 shadow" ref={composedMailRef} id="exampleFormControlTextarea1" placeholder='compose your mail' rows="15">
        
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