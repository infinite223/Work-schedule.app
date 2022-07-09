import { today } from '../../Helpers/constants';

function timeStringToFloat(time:string) {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return  {hours, minutes} ;
}

export function generateSheduleData(days:number){

    let shedule = []

    for (let i = 1; i <= days; i++) {
        shedule.push({id:i, persons:[]})
    }

    return shedule;
}

export function daysInMonth () {
    const nowDate:Date = new Date();
    const nowYear = nowDate.getFullYear();
    const nowMoth = nowDate.getMonth()+1;
    return new Date(nowYear, nowMoth, 0).getDate();
}

export const CountHours = (person:string, schedule:Array<{id:number, persons:Array<{name:string, startWork:string, endWork:string}>}>) => {
    let hours = 0;
    let minutes = 0 ;

    schedule.forEach((day:{id:number, persons:Array<{name:string, startWork:string, endWork:string}>})=>{
        const foundPerson = day.persons.find((inPerson:{name:string, startWork:string, endWork:string})=>inPerson.name===person)
        if(foundPerson){  
           hours += timeStringToFloat(foundPerson.endWork).hours - timeStringToFloat(foundPerson.startWork).hours
           minutes+=timeStringToFloat(foundPerson.endWork).minutes - timeStringToFloat(foundPerson.startWork).minutes
        }
    })

    return  (hours + minutes/60).toFixed(2);
}

export const firstDayOfMonth = () => {
    const nowMonth = today.getMonth()
    const nowYear = today.getFullYear()
    const arr:number[] = []

    for (let i = 0; i < (new Date(nowYear, nowMonth, 1)).getDay()-1; i++) {
        arr.push(i)              
    }

    return arr
}