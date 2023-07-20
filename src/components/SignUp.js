import React, { useState ,useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import MainNav from './MainNav'
import { useDispatch } from 'react-redux'
import { outboxActions } from '../store'

const SignUp = () => {
 const [isSignUp,setIsSignUp] = useState(true)
 const [loading,setIsLoading] = useState(false)
 const emailInputRef = useRef();
 const passwordInputRef = useRef();
 const confirmPasswordInputRef = useRef();

const dispatch = useDispatch()
 const navigate = useNavigate()

 const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    let url;

    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAhlC8sdNNfcoaFE4aOFvCPTF6h6gx7_tM";

      // Perform sign-in logic
    } else {
      const enteredConfirmPassword = confirmPasswordInputRef.current.value;
      if (enteredPassword !== enteredConfirmPassword) {
        setIsLoading(false);
        return "";
      }

      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhlC8sdNNfcoaFE4aOFvCPTF6h6gx7_tM";

      // Perform sign-up logic
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json().then((data) => {
            if (!isSignUp) {
                console.log(data)
                dispatch(outboxActions.setToken(data.tokenId))
               dispatch(outboxActions.setLocalId(data.localId))
               dispatch(outboxActions.setMymail(data.email))
              localStorage.setItem("token", data.idToken);
              localStorage.setItem('email',data.email)
              localStorage.setItem('uniqueId',data.localId);  
                 navigate('/welcome')
            } else {
              alert("successfully created account");
              
              emailInputRef.current.value='';
              passwordInputRef.current.value='';
              confirmPasswordInputRef.current.value='';
            }
          });
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failure";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div>
      <MainNav />
        <center>
        <form className='w-50 mt-5 card py-4 px-5' onSubmit={submitHandler}>
            <h3 className='text-dark mb-4'>{ isSignUp ? "SignUp" : "Login"}</h3>
  <div className="form-group">
      
    <input type="email" required className="form-control p-3" ref={emailInputRef} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
    <small id="emailHelp" className="form-text text-muted ">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <input type="password" required className="form-control my-5 p-3" ref={passwordInputRef} id="exampleInputPassword1" placeholder="Password" />
  </div>

 {isSignUp && <div className="form-group">
   
    <input type="password" required className="form-control mb-5 p-3" ref={confirmPasswordInputRef} id="exampleInputPassword2" placeholder="Conform Password" />
  </div>}
  
  <button type="submit" className="btn btn-primary mb-3 p-2">{isSignUp ? "SignUp": "Login"}</button>
  <span className='text-danger' id='swapLoginAndSignUp' style={{cursor:'pointer'}} onClick={()=>{setIsSignUp(!isSignUp)}} >{isSignUp? "Have an account ? Login" : " Don't have an account ? SignUp "}</span>
</form>
        </center>
    </div>
  )
}

export default SignUp