import { combineReducers } from "redux";
import { countReducer } from './countReducer'

export const reducers = combineReducers({
    person: countReducer
});

export type State = ReturnType<typeof reducers>
