import { createSlice,configureStore } from "@reduxjs/toolkit";


const outboxState = {emails:[],inBox:[],token:localStorage.getItem('token'),uniqueId:localStorage.getItem('uniqueId'),myMail:localStorage.getItem('email')}

const outBoxSlice = createSlice({
    name:'outbox',
    initialState:outboxState,
    reducers:{
        storeDataInEmails(state,action){
                state.emails= action.payload
            },
                  
            setToken (state,action){
              state.token = action.payload
            },
            setLocalId(state,action){
                state.uniqueId=action.payload
            },
            setMymail (state,action){
                state.myMail = action.payload
            },
            setInbox (state,action){
                state.inBox=action.payload
            },
           
              
        }
    }
)

const store = configureStore ({
    reducer:outBoxSlice.reducer
})

export const  outboxActions = outBoxSlice.actions;
export default store;