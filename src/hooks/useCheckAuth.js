import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "../store/auth";
import { FirebaseAuth } from "../firebase";
import { startLoadNotes } from "../store/journal";



export const useCheckAuth = () => {

    const { status } = useSelector(state => state.auth);
    const dispath = useDispatch();

    useEffect( () =>{

        onAuthStateChanged(FirebaseAuth, async (user) => {
          if(!user) return dispath( logout() );
 
          const { email, uid, displayName, photoURL } = user; 
          dispath(login({ email, uid, displayName, photoURL }));

          dispath(startLoadNotes());
           
        })
      
      },[ ] )



      return {
        status
      }

}
