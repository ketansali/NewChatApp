import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { api } from '../config/urlConfig'
export const user =  createApi({
    reducerPath:'usersignupApi',
    baseQuery : fetchBaseQuery({baseUrl:api}),
    endpoints : (builder)=>({
        SignUpApi : builder.mutation({
            query : (data)=>(
                {
                url: '/user/signup',
                method : 'POST',
                body : data
            })
        })
    })
})
export const {useSignUpApiMutation} = user