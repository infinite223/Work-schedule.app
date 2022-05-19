const initialState = 0;


type Action = {
    type: string,
    payload: object
} 

export const countReducer = (state: number = initialState, action: Action) =>{
    switch (action.type){
        case "AddPerson":
            return action;
        case "DeletePerson":
            return state;
        default:
            return state;
    }
}