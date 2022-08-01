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
        default:
            return state;
    }
}