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
    { id: 0, email: "dawidszmigiel@gmail.com", nickname: "Dawid" },
  ];

export const loginReducer = (state = initalState, action: Action) =>{
    const { type } = action;
   
    switch (type){    
        case "SetLoginPerson":
            let id:number = action.payload.id
            return (Object.assign([], state, {
               [id]: Object.assign({}, state[id], 
                  action.payload
               )
           }))                 
        case "OutLoginPerson": 
            return state;
        default:
            return state;
    }
}