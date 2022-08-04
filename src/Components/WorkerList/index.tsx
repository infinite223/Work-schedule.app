import { CountHours } from '../../Helpers/functions/functions';
import { MdOutlinePerson } from 'react-icons/md'
import './WorkerListStyle.scss'
import { IGroupType } from '../../Helpers/interfaces';

import { useSelector } from 'react-redux';
import { State } from '../../state';

export const WorkerList = () => {
 const loginPerson = useSelector((state: State)=> state.login)
 const schedule = useSelector((state: State)=> state.schedule)
 const group:IGroupType = useSelector((state: State)=> state.group)

  return (
    <div className='SchedulePage__data flex'>
        <div className='group-name'>{group.workplace}<br/> <small> workers list </small></div>
        <div className='worker-list'>     

             {group?.workers?.map(({ name }, i)=>{
                return (
                    <div key={name} style={name===loginPerson?{color:"white"}:{}} className='worker flex'>
                        <MdOutlinePerson size={25} className="person-icon"/>
                        <div className='worker-name'>{name}</div>
                        <div className='worker-hours'>{CountHours(name, schedule)}h</div>
                    </div>
                )
            })} 
        </div>
    </div>
  )
}
