import React, { useState } from 'react'
import { days } from '../../constants'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../../state';
import { CgCloseR } from 'react-icons/cg'

import './Day.scss'
interface IPerson {
      name: string;
      startWork: string;
      endWork: string;
}

export const Day: React.FC<{ id:number, date: Date,   persons: Array<IPerson> }> = ({ id, date, persons }) => {
  const [ chooseHours, setChooseHours ] = useState<boolean>(false)

  const loginPerson = useSelector((state: State)=> state.login)

  const dispatch = useDispatch();
  const { setPersonInDay } = bindActionCreators(actionCreators, dispatch)

  const foundPerson = persons.find((person)=> person.name===loginPerson[0].nickname)

  const setPersons = () : void => {
    //persons:[...persons.filter(person=> person.name!==loginPerson[0].nickname)]}
    if(foundPerson){
       setPersonInDay({id:id, persons:[...persons.filter(person=> person.name!==loginPerson[0].nickname)]} )
    }
    else {
       setPersonInDay({id:id, persons:[...persons, {name:loginPerson[0].nickname, startWork:"12:00", endWork:"22:00"}]})
    }
  }


  return (
    <>
        {chooseHours&&<div className='day__chooseHours'>
              <nav>
                <text>{loginPerson[0].nickname}</text>
                <CgCloseR className='exit-icon' size={32} onClick={()=> setChooseHours(false)}/>
              </nav>
              <div className='day__chooseHours-choose'>

              </div>  
        </div>}

      <div className='day' onClick={()=>(setPersons(), setChooseHours(true))}>
          <nav >
            <span>{id}</span>
            <text>{days[date.getDay()]}</text>      
          </nav>
          <div className='day__workerlist flex'>  
            {persons?persons.map(({name, startWork, endWork})=>{
              return <div key={name} className={loginPerson[0].nickname===name?"person login-person":"person"}>{name} {startWork}-{endWork}</div>
            }):<>xd</>}
          </div>
      </div>
    </>
  )
}
