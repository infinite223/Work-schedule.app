import {  Router, Routes, Route, useNavigate, Admin, Worker, useDispatch, bindActionCreators, MdOutlinePersonAdd, BsPersonBoundingBox } from '../../Helpers/imports'
import { useSelector } from 'react-redux';
import { actionCreators,  State } from '../../state';
import { useState } from 'react'

import { position } from './../../Animations/variants';
import { showMobilePage } from '../../Animations/variantsOnSmallScreen';
import { showPage } from './../../Animations/variants';
import { useMediaQuery } from 'react-responsive'
import { db } from '../../firebase';
import { setDoc, getDoc, getDocs, collection,  doc } from 'firebase/firestore';
import { generateSheduleData, daysInMonth } from '../../Helpers/functions/functions';
import { MessageModal } from '../MessageModal';
import { today, month } from '../../Helpers/constants';
import { useRef } from 'react';
import './CreateSchedule.scss'
import { workerBeforSign } from '../../Helpers/types';
import LoadingStatus from './../LoadingStatus/index';
import { CreateAdmin } from './SubPages/CreateAdmin';
import { CreateGroups } from './SubPages/CreateGroups'

export const CreateSchedule = () => {

  return (
    <>
      {/* <CreateAdmin/>     */}
  
          {/* <Routes>      
            <Route path="/Create/Admin" element={<CreateGroups/>} />   
            <Route path="/Create/Groups" element={<CreateGroups/>} />        
          </Routes>     
        */}
    </>
  )
}
