import React from 'react'
import { CountHours } from '../../Helpers/functions/functions';
import { MdOutlinePerson } from 'react-icons/md'
import './WorkerListStyle.scss'
export const WorkerList = () => {
  return (
    <div className='SchedulePage__data flex'>
        <div className='group-name'>Prato Verde</div>
        <div className='worker-list'>                     
            <div className='worker flex'>
                <MdOutlinePerson size={25} className="person-icon"/>
                <text className='worker-name'>Dawid</text>
                <text className='worker-hours'>{CountHours("Dawid")} h</text>
            </div>
            <div className='worker flex'>
                <MdOutlinePerson size={25} className="person-icon"/>
                <text className='worker-name'>Nikola</text>
                <text className='worker-hours'>{CountHours("Nikola")} h</text>
            </div>
            <div className='worker flex'>
                <MdOutlinePerson size={25} className="person-icon"/>
                <text className='worker-name'>Natalia</text>
                <text className='worker-hours'>0 h</text>
            </div>
        </div>
    </div>
  )
}
