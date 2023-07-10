import { createSlice } from "@reduxjs/toolkit";


export const journalSlice = createSlice({
    name : 'journal',
    initialState : {
        isSaveng : false,
        notes : [],
        activeNote : {},



    },
    reducers :{
        setNote : (state, action)=>{

        }

    }
})

export const  { setNote } = journalSlice.actions;