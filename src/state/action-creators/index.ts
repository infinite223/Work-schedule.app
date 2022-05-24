import { Dispatch } from "redux"
interface IUser {
    id:number,
    email:string,
    nickname:string
}

export const addPerson = (person:IUser) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: "AddPerson",
            payload:person
        })
    }
}

export const setPerson = (person:IUser) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: "SetPerson",
            payload:person
        })
    }
}

export const deletePerson = (person:IUser) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: "DeletePerson",
            payload:person
        })
    }
} 

export const setEmail = (person:IUser) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: "SetEmail",
            payload:person
        })
    }
}