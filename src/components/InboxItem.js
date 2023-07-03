import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const InboxItem = ({from,id}) => {
  const [isRead,setIsRead] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  console.log(from,id)

  

  const clickHandler =()=>{
    setIsRead(true);
    navigate(`/inboxDesc/${id}`)
  }

 
  return (
    <span style={{fontWeight: isRead ? 'normal':'bold'}} onClick={clickHandler} >Email : {from}@gmail.com</span>
  )
}
export default InboxItem;