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


export const ScheduleReducer = (state = generateSheduleData(), action: Action) =>{
    const { type } = action;
   
    switch (type){    
        case "SetPersonInDay":
            let id: number = action.payload.id
            return (Object.assign([], state, {
               [id-1]: Object.assign({}, state[id-1], 
                  action.payload
               )
           }))                 
        case "DeleteDay": 
            return state;
        default:
            return state;
    }
}