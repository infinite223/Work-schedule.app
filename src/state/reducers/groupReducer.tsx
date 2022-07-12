import { IUser } from '../../Helpers/interfaces'
import { auth } from './../../firebase/index';
import { IGroupType } from './../../Helpers/interfaces'

interface Action  {
    type: string,
    payload: IGroupType
}   

const initalState = {}; 

export const groupReducer = (state = initalState, action: Action) =>{
    const { type } = action;
   
    switch (type){    
        case "SetGroup":
            return action.payload                
        case "OutLoginPerson": 
            return state
        default:
            return state;
    }
}