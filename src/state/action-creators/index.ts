import { Dispatch } from "redux"
import { IGroupType } from './../../Helpers/interfaces'
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
export const setSchedule = (shedule:Array<{id:number, persons:Array<{name:string, startWork:string, endWork:string}>}>) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: "SetSchedule",
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

export const setLoginPerson = (nickname:string) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: "SetLoginPerson",
            payload:nickname
        })
    }
}

export const setGroup = (group:IGroupType) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: "SetGroup",
            payload:group
        })
    }
}