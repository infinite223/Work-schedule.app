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
                <div className='worker-name'>Dawid</div>
                <div className='worker-hours'>{CountHours("Dawid")} h</div>
            </div>
            <div className='worker flex'>
                <MdOutlinePerson size={25} className="person-icon"/>
                <div className='worker-name'>Nikola</div>
                <div className='worker-hours'>{CountHours("Nikola")} h</div>
            </div>
            <div className='worker flex'>
                <MdOutlinePerson size={25} className="person-icon"/>
                <div className='worker-name'>Natalia</div>
                <div className='worker-hours'>0 h</div>
            </div>
        </div>
    </div>
  )
}
