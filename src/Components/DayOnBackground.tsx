import React, { useEffect, useState }from 'react'
import { motion } from 'framer-motion';

export const DayOnBackground:React.FC<{ className:string, day:number }> = ({className, day}) => {
  const [ animatedClass, setAnimatedClass ] = useState("")
  const d = new Date();
  useEffect(() => {
    if(d.getDate()===day){
      setAnimatedClass("thisDay")
    }
  },[])

  return (
    <motion.div className={animatedClass+" "+className} ><text>{day}<span>May</span></text></motion.div>
  )
}
