import { collection, getDocs } from "firebase/firestore/lite";
import { FirestoreDB } from "../firebase";



export const loadNotes = async (uid = '') => {

     console.log( uid);
   //    if(!uid)  throw new Error('no existe un usuario logueado..');
    let noteColection = collection(FirestoreDB, `${uid}/journal/notes`);

    let noteDocs = await getDocs(noteColection);
    let notes =[];
    noteDocs.forEach(note => {
        notes.push({ id: note.id, ...note.data() })
        
    });

    return notes;
}
