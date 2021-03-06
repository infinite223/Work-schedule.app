import { combineReducers } from "redux";
import { ScheduleReducer } from "./sheduleReducer";
import { loginReducer } from "./loginReducer";
import { selectedDay } from "./selectedDay";
import { groupReducer } from "./groupReducer";

export const reducers = combineReducers({
    schedule: ScheduleReducer,
    login:loginReducer,
    select: selectedDay,
    group: groupReducer
});

export type State = ReturnType<typeof reducers>
