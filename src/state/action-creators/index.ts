import { Dispatch } from "redux"

export const addPerson = (person:object) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: "AddPerson",
            payload:person
        })
    }
}

export const setPerson = (person:object) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: "SetPerson",
            payload:person
        })
    }
}

export const deletePerson = (person:object) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: "DeletePerson",
            payload:person
        })
    }
} 