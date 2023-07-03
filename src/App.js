import { Routes,Route } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp';
import Welcome from './components/Welcome';
import Outbox from './components/Outbox';
import { useEffect, useState } from 'react';
import EmailDesc from './components/EmailDesc';
import Inbox from './components/Inbox';
import InboxDesc from './components/InboxDesc';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';

function App() {

 let token = useSelector(state=>state.token)

  
  return (
    <div className="App">
     <Routes>
      <Route path='*' element={<SignUp />} />
       <Route path='/' element={<SignUp />} />
       <Route path='/inbox' element={<Inbox />} />
       <Route path='/inboxDesc/:id' element={<InboxDesc />} />
   { token!==null && token &&  <Route path ='/outbox' element={<Outbox />} />}
      <Route path='/welcome' element={<Welcome />} />
   {  token!==null &&  <Route path='/emailDesc/:id' element={<EmailDesc />} />}
     </Routes>
    </div>
  );
}

export default App;
