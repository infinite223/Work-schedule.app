import { IUser } from '../../Helpers/interfaces'

interface Action  {
    type: string,
    payload: IUser;
} 

const initalState: IUser[] = [
    { id: 1, email: "", nickname: "" },
  ];

export const personReducer = (state = initalState, action: Action) =>{
    const { type } = action;
   
    switch (type){    
        case "AddPerson":
            return  [...state, action.payload]
        case "SetPerson":
            let id:number = action.payload.id
            return (Object.assign([], state, {
               [id-1]: Object.assign({}, state[id-1], 
                    {email:action.payload.email,
                  nickname:action.payload.nickname}
               )
           }))                 
        case "DeletePerson":   
            let nowPersonId = 0;
            state.forEach(person => {                          
                state[nowPersonId].id = nowPersonId+1;                    
            })     
            
            return state.filter((person:any)=>person.id!==action.payload.id)
                
        default:
            return state;
    }
}