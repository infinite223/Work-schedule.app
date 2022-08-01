interface Action  {
    type: string,
    payload: string;
}   

const initalState = ""; 

export const loginReducer = (state = initalState, action: Action) =>{
    const { type } = action;
   
    switch (type){    
        case "SetLoginPerson":
            return action.payload                
        default:
            return state;
    }
}