import { IShedule } from '../../Helpers/interfaces'
import { daysInMonth } from '../../Helpers/functions/functions'

interface Action  {
    type: string,
    payload: IShedule;
} 

function generateSheduleData(){

    let initalState = []

    for (let i = 1; i <= daysInMonth(6,2022); i++) {
        initalState.push({id:i, persons: [{name:"Nikola", startWork:"17:00", endWork:"22:00"}]})
    }

    return initalState;
}


export const ScheduleReducer = (state = generateSheduleData(), action: Action) =>{
    const { type } = action;
   
    switch (type){    
        case "SetPersonInDay":
            let id: number = action.payload.id;

            return (Object.assign([], state, {
                [id-1]: Object.assign({}, state[id-1], 
                   action.payload
                )
            }))       

        default:
            return state;
    }
}