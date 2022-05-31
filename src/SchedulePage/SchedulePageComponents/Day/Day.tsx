import React from 'react'
import { days } from '../../constants'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../../state';

import './Day.scss'
interface IPerson {
      name: string;
      startWork: string;
      endWork: string;
}

export const Day: React.FC<{ id:number, date: Date,   persons: Array<IPerson> }> = ({ id, date, persons }) => {

  const loginPerson = useSelector((state: State)=> state.login)

  const dispatch = useDispatch();
  const { setPersonInDay } = bindActionCreators(actionCreators, dispatch)
  persons.forEach(element => {
    
  });
  const foundPerson = persons.find((person)=> person.name===loginPerson[0].nickname)

  const setPersons = (): void => {
    //persons:[...persons.filter(person=> person.name!==loginPerson[0].nickname)]}
    if(foundPerson){
       setPersonInDay({id:id, persons:[...persons.filter(person=> person.name!==loginPerson[0].nickname)]} )
    }
    else {
       setPersonInDay({id:id, persons:[...persons, {name:loginPerson[0].nickname, startWork:"12:00", endWork:"22:00"}]})
    }
  }


  return (
    <div className='day' onClick={()=>setPersons()}>
        <nav >
          <span>{id}</span>
          <text>{days[date.getDay()]}</text>      
        </nav>
        <div className='day__list flex'>  
          {persons?persons.map(({name, startWork, endWork})=>{
            return <div key={name} className={loginPerson[0].nickname===name?"person login-person":"person"}>{name} {startWork}-{endWork}</div>
          }):<>xd</>}
        </div>
    </div>
  )
}
