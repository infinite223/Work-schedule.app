import { combineReducers } from "redux";
import { countReducer } from './countReducer'
import { ScheduleReducer } from "./sheduleReducer";
import { loginReducer } from "./loginReducer";

export const reducers = combineReducers({
    person: countReducer,
    schedule: ScheduleReducer,
    login:loginReducer
    
});

export type State = ReturnType<typeof reducers>
