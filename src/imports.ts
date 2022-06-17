export { motion } from 'framer-motion';
export { useNavigate } from 'react-router-dom';
export { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export { StartPage } from './StartPage/StartPage';
export { LoginPage } from './LoginPage/LoginPage';
export { SchedulePage } from './SchedulePage/SchedulePage';

export { CreateSchedule } from './Components/CreateSheudle/CreateSchedule';
export { DayOnBackground } from './Components/DayOnBackground';
export { Admin } from './Components/CreateSheudle/Persons/Admin'
export { Worker } from './Components/CreateSheudle/Persons/Worker';

export { RiCalendarTodoLine } from 'react-icons/ri'
export { HiOutlineChevronDoubleLeft } from 'react-icons/hi'
export { CgCloseR } from 'react-icons/cg'
export { MdOutlinePersonRemove } from 'react-icons/md'
export { MdOutlinePersonAdd } from 'react-icons/md'
export { BsPersonBoundingBox } from 'react-icons/bs'

export { bindActionCreators } from 'redux';
export { useDispatch, useSelector } from 'react-redux';


export const days:number[] = 
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,
     1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]; 