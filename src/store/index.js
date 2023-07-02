import { createSlice,configureStore } from "@reduxjs/toolkit";

const outboxState = {emails:[],token:localStorage.getItem('token')}

const outBoxSlice = createSlice({
    name:'outbox',
    initialState:outboxState,
    reducers:{
        storeDataInEmails(state,action){
                state.emails= action.payload
            },
                  
            setToken (state,action){
              state.token = action.payload
            }
              
        }
    }
)

const store = configureStore ({
    reducer:outBoxSlice.reducer
})

export const  outboxActions = outBoxSlice.actions;
export default store;