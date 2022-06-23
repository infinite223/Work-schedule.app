import React, { useEffect, useState }from 'react'
import { motion } from '../Helpers/imports';

export const DayOnBackground:React.FC<{ className:string, day:number }> = ({ className, day }) => {
  const [ animatedClass, setAnimatedClass ] = useState("")
  const d = new Date();
  
  useEffect(() => {
    if(d.getDate()===day){
      setAnimatedClass("thisDay")
    }
  },[])

  return (
    <motion.div className={animatedClass+" "+className} ><div>{day}<span>May</span></div></motion.div>
  )
}
