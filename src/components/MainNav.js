import React, { useEffect, useState } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { outboxActions } from "../store";




const MainNav = () => {
   const token = localStorage.getItem('token')
   const [title,setTitle] = useState('Mail Box')
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const logoutHandler=()=>{
          dispatch(outboxActions.setMymail(''))
          dispatch(outboxActions.setToken(null))
          localStorage.removeItem('token')
          localStorage.removeItem('email')
          localStorage.removeItem('uniqueId')
          setTitle('Email Box')
          navigate('/')
    }

    const mail = useSelector(state=>state.myMail)
console.log(mail)


  return (
    <div className="d-flex justify-content-around align-items-center  bg-dark text-white" style={{height:'50px'}}>
      <div className="navbar-brand fw-bold">{mail===null ? 'Mail Box':mail}</div>
      <div className=" w-25 d-flex justify-content-around" >
        <div style={{cursor:'pointer'}} onClick={()=>{navigate('/')}}>Home</div>
       {token && <div style={{cursor:'pointer'}} onClick={()=>{navigate('/welcome')}}>Compose</div>}
       {token && <div onClick={logoutHandler} style={{cursor:'pointer'}}>Logout</div>}
      </div>
    </div>
  );
};

export default MainNav;
