import {createSlice} from '@reduxjs/toolkit'
import {  user } from '../services/user'





const initState = {
    token : "",
    loading : false,
    error:""
}

const authReducer = createSlice({
    name : 'user',
    initialState : initState,
    reducers:{
        
    }
})


export default authReducer.reducer