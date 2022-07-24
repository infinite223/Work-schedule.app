import { today } from '../../Helpers/constants';
import { bindActionCreators } from 'redux';
import { db } from "../../firebase";
import { getDoc, setDoc, getDocs, doc, collection } from 'firebase/firestore';
import { actionCreators } from '../../state';
import { month } from '../../Helpers/constants';
import { workerAfterSign } from '../../Helpers/types';

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

export function daysInMonth (selectDate:Date) {
    const nowDate:Date = new Date();
    const nowYear = selectDate.getFullYear();
    const nowMoth = selectDate.getMonth()+1;
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

export const firstDayOfMonth = (selectDate:Date) => {
    const nowMonth = selectDate.getMonth()
    const nowYear = selectDate.getFullYear()
    const arr:number[] = []

    for (let i = 0; i < (new Date(nowYear, nowMonth, 1)).getDay()-1; i++) {
        arr.push(i)              
    }

    return arr
}

export const setScheduleFromFirebase = async (dispatch:any, groupName:string) =>{
    const { setSchedule } = bindActionCreators(actionCreators, dispatch)
    const scheduleRef = doc(db, "schedule", groupName);
    const scheduleSnap = await getDoc(scheduleRef);
    const nowMonth =  [month[today.getMonth()]+today.getFullYear()].toString();
    setSchedule(scheduleSnap.data()?.[nowMonth])
}

export const setLoginPersonAndGroupFromFirebase = async (dispatch:any, UID:string) => {
    const { setLoginPerson, setGroup } = bindActionCreators(actionCreators, dispatch) 
    const groupsRef = collection(db, "groups");  
       
    const workersData = await getDocs(groupsRef)
    let foundWorker;

    await workersData.docs.forEach((doc)=>{
      if(doc.data().workers.find((worker:workerAfterSign)=> worker.UID === UID)){
        foundWorker = doc.data().workers.find((worker:workerAfterSign)=> worker.UID === UID)
        foundWorker&&setGroup(doc.data());
        foundWorker&&setLoginPerson(foundWorker.nickname);
      }
    })
}

export const createGroups = async (emailAdmin:string, workplace:string, groups:Array<string>) => {
    await setDoc(doc(db, "groups", workplace), {
      workplace:workplace,
      groups: groups,
      admin: emailAdmin 
    })
    // .then( async ()=> {
    //   await setDoc(doc(db, "schedule", nameGroup), {
    //     [month[today.getMonth()] + today.getFullYear()]: generateSheduleData(daysInMonth(new Date()))
    //   }).then(() => (setMessage({descripstion:"The group has been created correctly", status:true}), setShowMessage(true)))
    // })
  }