import { IShedule } from '../../Helpers/interfaces'

interface Action  {
    type: string,
    payload: IShedule;
} 

const initalState:Array<{id:number, persons:Array<{name:string, startWork:string, endWork:string}>}> = []



export const ScheduleReducer = (state = initalState, action: Action) =>{
    const { type } = action;
   
    switch (type){   
        case "SetSchedule":
            //state = Object.assign({}, state,action.payload);
            return  state = Object.assign([], state, action.payload);
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