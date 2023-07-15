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
            state.messageSaved = '';
        },

        setNote : ( state, action )=>{
            state.notes = action.payload;
            state.messageSaved = '';

        },

        addNewEmptyNote : ( state, action ) => {
            state.notes.push(action.payload);
            state.isSaving = false;
            state.messageSaved = '';

        },
        setActiveNote : ( state, action ) => {
            state.activeNote = action.payload;

        },
        setSaving : ( state, action ) =>{
            state.isSaving = true; 
            state.messageSaved = '';

        },
        clearMessageSaved : (state) =>{
            state.messageSaved = '';
        },
        updateNote : ( state, action ) =>{
            state.isSaving = false;
            state.notes = state.notes.map(note =>{
               return ( note.id === state.activeNote.id ? { ... state.activeNote } : note);
            })
            state.messageSaved = `${state.activeNote.title} Guardada Con exito ...`;

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
        updateNote,
        setSaving ,
        clearMessageSaved
} = journalSlice.actions;