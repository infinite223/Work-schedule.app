import { combineReducers } from "redux";
import { personReducer } from './personReducer'
import { ScheduleReducer } from "./sheduleReducer";
import { loginReducer } from "./loginReducer";
import { selectedDay } from "./selectedDay";

export const reducers = combineReducers({
    person: personReducer,
    schedule: ScheduleReducer,
    login:loginReducer,
    select: selectedDay
});

export type State = ReturnType<typeof reducers>
