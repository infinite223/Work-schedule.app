import { PayloadAction } from "@reduxjs/toolkit"
import update from 'immutability-helper';

interface Action  {
    type: string,
    payload: IUser;
} 

interface IUser {
    id:number,
    email:string,
    nickname:string
}

const initalState: IUser[] = [
    { id: 1, email: "", nickname: "" },
  ];

export const countReducer = (state = initalState, action: Action) =>{
    const { type } = action;
    
    switch (type){
        case "AddPerson":
            return  [...state, action.payload]

        case "SetPerson":
            //const personIndex = state.person.findIndex((person)=>person.id===action.payload.id)
            //state.person[personIndex].email = action.payload.email;
           // state.person[personIndex].nickname = action.payload.nickname;

            return [
                ...state.slice(0, action.payload.id),
                action.payload.email,
                ...state.slice(action.payload.id)
              ];
        case "SetEmail":   
        
        let id:number = action.payload.id;
         const newState = [...state]   
         newState[id].email = action.payload.email  
         //return  Object.assign({}, state, { isFetching: true });
         return (Object.assign({}, state, {
            [id]: Object.assign({}, state[id], 
               action.payload
            )
        }), state)
                          
        case "DeletePerson": 
            return state;
        default:
            return state;
    }
}