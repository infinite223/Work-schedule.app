const initialState = 0;

type Action = {
    type: string,
    payload?: number
} 

export const countReducer = (state: number = initialState, action: Action) =>{
    switch (action.type){
        case "Increment":
            return state+1;
        case "Decrementt":
            return state-1;
        default:
            return state;
    }
}