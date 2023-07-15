import { doc, collection, setDoc } from 'firebase/firestore/lite';
import { FirestoreDB } from '../../firebase/config';
import { addNewEmptyNote, setActiveNote, setNote, setSavingNewNote, updateNote, setSaving } from './journalSlice';
import { loadNotes } from '../../helper/loadNotes';
import { uploadImage } from '../../helper';

export const startNewNote = () =>{
    return async (dispatch, getState ) =>{

        let newNote  = {
            title : 'note 01',
            description : 'nota de prueba 01',
            date : new Date().getTime()
        }
        const { uid } = getState().auth;

        dispatch( setSavingNewNote() );

        //firestore
        const newDoc = (doc(collection(FirestoreDB, `${uid}/journal/notes` )) );
        const result = await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;


        dispatch( addNewEmptyNote(newNote) );
        dispatch( setActiveNote(newNote) );


    }

}
export const startLoadNotes = () => {
    return async (dispatch,getState) =>{
        const { uid } = getState().auth;           
        const notes = await loadNotes(uid);
        dispatch(setNote(notes));

    }   
}

export const startActiveNote =(id ='') =>{

    return ( dispatch, getState ) =>{
        const { notes } = getState().journal;
        let note = notes.find(n => n.id === id);

        dispatch(setActiveNote(note));
    }

}

export const startUpdateNote = ( ) =>{
    return async (dispatch, getState ) =>{

        dispatch(setSaving);
        let { uid } = getState().auth;
        let { activeNote } = getState().journal;
        let noteUpdate = { ...activeNote };
        delete noteUpdate.id;

        const docRef = doc(FirestoreDB, `${uid}/journal/notes/${activeNote.id}` );
        await setDoc(docRef, noteUpdate, { marge : true});

        dispatch(updateNote());


    }
}

export const startUploadImage = ( files ) => {

    return async ( dispatch ) => {

        dispatch(setSaving());

        const result = await uploadImage(files[0]);
    }

}

