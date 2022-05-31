import React from 'react'
import { days } from '../../constants'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../../state';

import './Day.scss'

export const Day: React.FC<{ id:number, date: Date, persons:Array<string> }> = ({ id, date, persons }) => {

  const loginPerson = useSelector((state: State)=> state.login)

  const dispatch = useDispatch();
  const { setPersonInDay } = bindActionCreators(actionCreators, dispatch)
  const foundPerson = persons.find((person)=> person===loginPerson[0].nickname)

  const setPersons = (): void => {
    

    if(foundPerson){
       setPersonInDay({id:id, persons:[...persons.filter(person=> person!==loginPerson[0].nickname)]})
    }
    else {
       setPersonInDay({id:id, persons:[...persons, loginPerson[0].nickname]})
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
            return <div key={person} className={loginPerson[0].nickname===person?"person login-person":"person"}>{person}</div>
          }):<>xd</>}
        </div>
    </div>
  )
}
