
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MainNav from "./MainNav";
import Navbar from "./Navbar";



const EmailDesc = () => {
   const {id} = useParams()
   const numId = Number(id)
   
   const items = useSelector(state=>state.inBox)

   const selectedMail = items.filter((item) => item.id === numId);

   
  return (
    <>
    <MainNav />
    <Navbar />
   <center>
     <div className="card w-50 shadow mt-5" style={{minHeight:'70vh'}}>
      <div className="b-5 mb-4">
        <p className="m-2" ><u>Sent from:</u></p>
        <span className="">{selectedMail[0].from}@gmail.com</span>
      </div>
      <hr></hr>
      <div className="b-5 ">
        <p className="m-2" ><u>Composed Mail:</u></p>
        <p className=" mt-5">{selectedMail[0].composedMail}</p>
      </div>
    </div>
   </center>
   </>
  );
};

export default EmailDesc;
