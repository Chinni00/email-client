import React, { useState } from 'react'

const SignUp = () => {
 const [isSignUp,setIsSignUp] = useState(true)

 const submitHandler=(e)=>{
e.preventDefault()
 }

  return (
    <div>
        <center>
        <form className='w-50 mt-5 card p-5' onSubmit={submitHandler}>
            <h3 className='text-dark mb-4'>{ isSignUp ? "SignUp" : "Login"}</h3>
  <div className="form-group">
      
    <input type="email" className="form-control p-3" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
    <small id="emailHelp" className="form-text text-muted ">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <input type="password" className="form-control my-5 p-3" id="exampleInputPassword1" placeholder="Password" />
  </div>

 {isSignUp && <div className="form-group">
   
    <input type="password" className="form-control mb-5 p-3" id="exampleInputPassword2" placeholder="Conform Password" />
  </div>}
  
  <button type="submit" className="btn btn-primary mb-4 p-2">{isSignUp ? "SignUp": "Login"}</button>
  <span className='text-danger' style={{cursor:'pointer'}} onClick={()=>{setIsSignUp(!isSignUp)}} >Have an account ? Login</span>
</form>
        </center>
    </div>
  )
}

export default SignUp