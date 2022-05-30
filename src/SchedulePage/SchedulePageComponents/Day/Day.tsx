import React, { useEffect, useState } from 'react'
import { days, today } from '../../constants'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../../state';

import './Day.scss'

export const Day: React.FC<{ id:number, date: Date, persons:Array<string> }> = ({ id, date, persons }) => {

  const [ personsInDay, setPersonsInDay ] = useState<Array<string>>(persons)

  const loginPerson = useSelector((state: State)=> state.login)

  const dispatch = useDispatch();
  const { setPersonInDay } = bindActionCreators(actionCreators, dispatch)

  const setPersons = async () =>{
    const foundPerson = personsInDay.find((person)=> person===loginPerson[0].nickname)
    console.log(foundPerson)
    if(foundPerson){
      await setPersonsInDay([...personsInDay.filter(person=> person!==loginPerson[0].nickname)])
      await setPersonInDay({id:id, persons:personsInDay})
    }
    else {
      await setPersonsInDay([...personsInDay, loginPerson[0].nickname])
      await setPersonInDay({id:id, persons:personsInDay})
    }
   
  }

  return (
    <div className='day' onClick={()=>setPersons()}>
        <nav >
          <span>{id}</span>
          <text>{days[date.getDay()]}</text>      
        </nav>
        <div className='day__list flex'>  
          {persons?persons.map((person)=>{
            return <div className={loginPerson[0].nickname===person?"person login-person":"person"}>{person}</div>
          }):<>xd</>}
        </div>
    </div>
  )
}
