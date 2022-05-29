import React from 'react'
import { days, today } from '../../constants'
import './Day.scss'

export const Day: React.FC<{ id:number, date: Date, persons:Array<string> }> = ({ id, date, persons }) => {
  console.log()
  return (
    <div className='day'>
        <nav >
          <span>{id}</span>
          <text>{days[date.getDay()]}</text>      
        </nav>
        <div className='day__list flex'>  
          {persons?persons.map((person)=>{
            return <div className='person'>{person}</div>
          }):<>xd</>}
        </div>
    </div>
  )
}
