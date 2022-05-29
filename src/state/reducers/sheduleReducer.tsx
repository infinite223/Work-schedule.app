interface Action  {
    type: string,
    payload: IShedule;
} 

interface IShedule {
    id:number,
    date:Date,
    persons:[]
}

function generateSheduleData(){

    let initalState = []

    for (let i = 1; i <= 31; i++) {
        initalState.push({id:i, date: new Date(`2022-05-${i}`), persons:["Dawid", "Nikola"]})
    }

    return initalState;
}

//const initalState: IShedule[] = [
  //  { id: 0, date: new Date("2021-04-08"), persons: [] },
 // ];

export const ScheduleReducer = (state = generateSheduleData(), action: Action) =>{
    const { type } = action;
   
    switch (type){    
        case "SetDay":
            let id:number = action.payload.id
            return (Object.assign([], state, {
               [id]: Object.assign({}, state[id], 
                  action.payload
               )
           }))                 
        case "DeleteDay": 
            return state;
        default:
            return state;
    }
}