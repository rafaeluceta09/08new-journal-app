import { createSlice } from "@reduxjs/toolkit";


export const journalSlice = createSlice({
    name : 'journal',
    initialState : {
        isSaving : false,
        notes : [],
        activeNote : null,
        messageSaved : '',
    },
    reducers :{

        setSavingNewNote : ( state ) =>{          
            state.isSaving = true;
        },

        setNote : ( state, action )=>{
            state.notes = action.payload;

        },

        addNewEmptyNote : ( state, action ) => {
            state.notes.push(action.payload);
            state.isSaving = false;

        },
        setActiveNote : ( state, action ) => {
            state.activeNote = action.payload;

        },
        setSaving : ( state, action ) =>{
            state.isSaving = true; 

        },
        updateNote : ( state, action ) =>{
            state.isSaving = false;
            state.notes = state.notes.map(note =>{
               return ( note.id === state.activeNote.id ? { ... state.activeNote } : note);
            })

        },
        deleteNoteById : ( state, action ) =>{

        }

    }
})

export const { 
        setNote, 
        addNewEmptyNote, 
        setSavingNewNote,
        setActiveNote,
        updateNote 
} = journalSlice.actions;