import { Dispatch } from "redux"

export const incrementCount = (count:number) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: "Increment",
            payload:count
        })
    }
}

export const decrementCount = (count:number) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: "Decrement",
            payload:count
        })
    }
} 