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
    { id: 0, email: "", nickname: "" },
  ];

export const personReducer = (state = initalState, action: Action) =>{
    const { type } = action;
   
    switch (type){    
        case "AddPerson":
            return  [...state, action.payload]
        case "SetPerson":
            let id:number = action.payload.id
            return (Object.assign([], state, {
               [id]: Object.assign({}, state[id], 
                  action.payload
               )
           }))                 
        case "DeletePerson": 
            return  state.filter((person)=>person.id!==action.payload.id);
        default:
            return state;
    }
}