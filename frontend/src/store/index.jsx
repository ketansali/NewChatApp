import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../reducers/authReducer'
import { user } from '../services/user'

export const store = configureStore( {
    reducer : {
       [user.reducerPath] : user.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([user.middleware])
}) 