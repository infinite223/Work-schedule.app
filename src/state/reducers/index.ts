import { combineReducers } from "redux";
import { personReducer } from './personReducer'
import { ScheduleReducer } from "./sheduleReducer";
import { loginReducer } from "./loginReducer";

export const reducers = combineReducers({
    person: personReducer,
    schedule: ScheduleReducer,
    login:loginReducer
});

export type State = ReturnType<typeof reducers>
