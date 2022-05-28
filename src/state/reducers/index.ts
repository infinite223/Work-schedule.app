import { combineReducers } from "redux";
import { countReducer } from './countReducer'
import { ScheduleReducer } from "./sheduleReducer";

export const reducers = combineReducers({
    person: countReducer,
    schedule: ScheduleReducer
    
});

export type State = ReturnType<typeof reducers>
