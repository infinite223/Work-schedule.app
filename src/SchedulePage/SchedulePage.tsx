import { useNavigate, HiOutlineChevronDoubleLeft, motion } from './../imports';
import { show } from '../Animations/variants';
import { useSelector } from 'react-redux';
import { State } from '../state';

import './SchedulePage.scss'
import { Day } from './SchedulePageComponents/Day/Day';
import { days, month, today } from './constants';

export const SchedulePage = () => {

    const navigate = useNavigate(); 

    const schedule = useSelector((state: State)=> state.schedule)

    function timeStringToFloat(time:string) {
        var hoursMinutes = time.split(/[.:]/);
        var hours = parseInt(hoursMinutes[0], 10);
        var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
        return  {hours, minutes} ;
      }

    const countHours = (person:string) => {
        let hours = 0;
        let minutes = 0 ;
        schedule.forEach((day)=>{
            const foundPerson = day.persons.find((inPerson)=>inPerson.name===person)
            if(foundPerson){
              //  hours +=(timeStringToFloat(foundPerson.endWork)[0]-timeStringToFloat(foundPerson.startWork)[0])
               // minutes +=(timeStringToFloat(foundPerson.endWork)[1]-timeStringToFloat(foundPerson.startWork)[1])   
               hours += timeStringToFloat(foundPerson.endWork).hours - timeStringToFloat(foundPerson.startWork).hours
               minutes+=timeStringToFloat(foundPerson.endWork).minutes - timeStringToFloat(foundPerson.startWork).minutes
            }
        })
        return (hours + minutes/60).toFixed(2)
    }

    const date = new Date();

  return (
    <>
        <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
        <motion.div className='SchedulePage' variants={show} initial="hidden" animate="visible">
            <div className='SchedulePage__navbar flex'>
                <div className='date'>
                    <div className='year'>{today.getFullYear()}</div>
                    <div className='flex'>
                        <div>{days[today.getDay()]}</div>
                        <div>{month[today.getMonth()]}</div>
                    </div>
               
                </div>
                <div className='SchedulePage__data flex'>
                    <div className='group-name'>Prato Verde</div>
                    <div className='worker-list flex'>
                        <p>
                            Workers in group
                        </p>
                        <div className='worker flex'>
                            <text className='worker-name'>Dawid</text>
                            <text className='worker-hours'>{countHours("Dawid")}h</text>
                        </div>
                        <div className='worker flex'>
                            <text className='worker-name'>Nikola</text>
                            <text className='worker-hours'>{countHours("Nikola")}h</text>
                        </div>
                        <div className='worker flex'>
                            <text className='worker-name'>Natalia</text>
                            <text className='worker-hours'>0h</text>
                        </div>
                    </div>
                </div>
            </div>

            <div className='SchedulePage__content flex'>
               {schedule.map((day)=>{
                   return (
                    <Day key={day.id} id={day.id} date={new Date(`2022-06-${day.id}`)} persons={day.persons}/>
                   )
               })}
            </div>
            
        </motion.div>
    </>                                                                                          
  )
}
