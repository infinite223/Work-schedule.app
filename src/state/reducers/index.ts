import { combineReducers } from "redux";
import { countReducer } from './countReducer'

export const reducers = combineReducers({
    count: countReducer
});

export type State = ReturnType<typeof reducers>