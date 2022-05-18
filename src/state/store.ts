import { configureStore, Action } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { ThunkAction } from 'redux-thunk'
import { reducers } from "./reducers"
import  thunk  from 'redux-thunk' 

export const store = configureStore({  
    reducer: reducers
})

