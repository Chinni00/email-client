import React,{useEffect} from "react";
import Navbar from "./Navbar";
import { useSelector ,useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import MainNav from "./MainNav";
import { outboxActions } from "../store";


const Outbox = () => {

  const emails = useSelector((state) => state.emails);
  const uniqueId = useSelector((state)=>state.uniqueId)
  console.log("outbox", emails);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const deleteHandler =(id)=>{
     const filteredEmails = emails.filter(item=>item.id!==id);
     dispatch(outboxActions.storeDataInEmails(filteredEmails))
     fetch(`https://email-client-9f987-default-rtdb.firebaseio.com/${uniqueId}.json`,{
      method:'PUT',
      body:JSON.stringify(filteredEmails),
      headers:{
        'Content-Type':'application/json'
      }
     }).then(res=>res.json()).catch(err=>console.log(err))
  }

  useEffect(() => {
    fetch(`https://email-client-9f987-default-rtdb.firebaseio.com/${uniqueId}.json`)
      .then((res) => res.json())
      .then((data) => {    
        dispatch(outboxActions.storeDataInEmails(data)); // Dispatch the existingInbox data to the store
      });
  }, [dispatch,uniqueId]);
  return (
    <>
    <MainNav />
      <Navbar />
      {emails == null && emails == undefined && <p>No mails sent from you</p>}
      {emails && (
        <center className="w-75 float-end mt-3">
          
          <div>Welcome to Mail Box</div>
          <hr></hr>
          <div className="card me-3 pt-2" style={{ minHeight: "90vh" }}>
          <h3>Emails</h3>
            {emails.map((email) => (
              <div
                className="card m-3 p-3 mb-4"
                key={email.id}
                style={{ cursor: "pointer" }}
                 
              >
                <div className="b-5 d-flex justify-content-around align-items-center">
                  <div className="b-5"  onClick={()=>{navigate(`/emailDesc/${email.id}`)}}>
                    <b className="m-5">Email:</b>
                    <span className="" >{email.to}</span>
                  </div>
                  <button className="btn btn-success" onClick={()=>{deleteHandler(email.id)}}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </center>
      )}
    </>
  );
};

export default Outbox;
