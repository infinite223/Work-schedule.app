import { useNavigate, HiOutlineChevronDoubleLeft, motion } from './../imports';

import './SchedulePage.scss'

export const SchedulePage = () => {
    const navigate = useNavigate(); 

  return (
    <>
        <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
        <div className=''>adawd</div>
    </>                                                                                          
  )
}
