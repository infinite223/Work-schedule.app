import { Dispatch } from "redux"
interface IUser {
    id:number,
    email:string,
    nickname:string
}

interface IPerson {
    name: string;
    startWork: string;
    endWork: string;
}

interface IShedule {
    id:number,
    persons: Array<IPerson>
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


export const setPersonInDay = (shedule:IShedule) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: "SetPersonInDay",
            payload:shedule
        })
    }
}

export const setSelectedDay = (day:number) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: "SetSelectedDay",
            payload:day
        })
    }
}