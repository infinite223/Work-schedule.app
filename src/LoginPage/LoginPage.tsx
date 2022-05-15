import React from 'react'
import { useNavigate } from "react-router-dom";
import { HiOutlineChevronDoubleLeft } from 'react-icons/hi'

export const LoginPage = () => {
    const navigate = useNavigate(); 
  return (
    <div>
         <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
        LoginPage
    </div>
  )
}
