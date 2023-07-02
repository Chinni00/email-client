import React from "react";
import { useNavigate } from "react-router-dom";


const MainNav = () => {
    const navigate = useNavigate()
    const logoutHandler=()=>{
          localStorage.removeItem('token')
          localStorage.removeItem('email')
          navigate('/')
    }

  return (
    <div className="d-flex justify-content-around align-content-center pt-2 bg-dark text-white" style={{height:'40px'}}>
      <div className="navbar-brand fw-bold">Email Box</div>
      <div className=" w-25 d-flex justify-content-around" >
        <div style={{cursor:'pointer'}} onClick={()=>{navigate('/')}}>Home</div>
        <div style={{cursor:'pointer'}} onClick={()=>{navigate('/welcome')}}>Compose</div>
        <div onClick={logoutHandler} style={{cursor:'pointer'}}>Logout</div>
      </div>
    </div>
  );
};

export default MainNav;
