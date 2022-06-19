interface Action  {
    type: string,
    payload: number;
} 

const todayDate = new Date();

export const selectedDay = (state = todayDate.getDate(), action: Action) =>{
    const { type } = action;   
    switch (type){    
        case "SetSelectedDay":
            return action.payload           
        default:
            return state;
    }
}