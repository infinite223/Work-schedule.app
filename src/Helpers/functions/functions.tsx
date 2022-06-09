import { useSelector } from 'react-redux';
import { State } from './../../state';

const schedule = useSelector((state: State)=> state.schedule)

export function generateSheduleData(days:number){

    let shedule = []

    for (let i = 1; i <= days; i++) {
        shedule.push({id:i, persons:[]})
    }

    return shedule;
}

export function daysInMonth (month:number, year:number) {
    return new Date(year, month, 0).getDate();
}

function timeStringToFloat(time:string) {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return  {hours, minutes} ;
}

export const countHours = (person:string) => {
    let hours = 0;
    let minutes = 0 ;
    schedule.forEach((day)=>{
        const foundPerson = day.persons.find((inPerson)=>inPerson.name===person)
        if(foundPerson){  
           hours += timeStringToFloat(foundPerson.endWork).hours - timeStringToFloat(foundPerson.startWork).hours
           minutes+=timeStringToFloat(foundPerson.endWork).minutes - timeStringToFloat(foundPerson.startWork).minutes
        }
    })
    return (hours + minutes/60).toFixed(2)
}