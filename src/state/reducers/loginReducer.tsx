import { IUser } from '../../Helpers/interfaces'
import { auth } from './../../firebase/index';

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
        case "OutLoginPerson": 
            return state
            // return (Object.assign([], state, {
            //     [id]: Object.assign({}, state[id], 
            //        action.payload
            //     )
            // })) ;
        default:
            return state;
    }
}