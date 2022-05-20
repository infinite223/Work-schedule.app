import { PayloadAction } from "@reduxjs/toolkit"

type Action = {
    type: string,
    payload: { 
        id:number,
        email:string,
        nickname:string
    }
} 
interface Person {
    person: [{
        id:number,
        email:string,
        nickname:string
    }]
}
const initialUserState: Person = {
    person : [{ 
        id:1,    
        email:"",
        nickname:""
    }]
}

export const countReducer = (state = initialUserState, action: Action) =>{
    switch (action.type){
        case "AddPerson":
            return {...state, person: [...state.person, action.payload]}
        case "SetPerson":
            return console.log(state.person.find((x)=>x.id===action.payload.id))
        case "DeletePerson":
            return state;
        default:
            return state;
    }
}