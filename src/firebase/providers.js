import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, 
         updateProfile, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const signInWhithGoogle = async () =>{
    try{
        const result = await signInWithPopup(FirebaseAuth , googleProvider);
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        const { photoURL, uid, displayName, email } = result.user;

        return {
            ok : true,
            photoURL, 
            uid, 
            displayName, 
            email
        }
    }
    catch(error){
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        //const email = error.customData.email;
        // The AuthCredential type that was used.
        //const credential = GoogleAuthProvider.credentialFromError(error);
        return{
            ok : false,
            errorCode,
            errorMessage
        }
    }
}

export const createWithEmailPassword = async ( { email, password, displayName } ) =>{

    try {

        const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password );
        let { photoURL, uid } = result.user;
        console.log(result);
        await updateProfile( FirebaseAuth.currentUser, { displayName });
                
        return { 
            ok : true,
            photoURL, 
            uid, 
            displayName, 
            email
        }
    
    } catch (error) {
        return{
            ok : false,
            errorCode : error.code,
            errorMessage : error.code,
        
        }    
    }
}


export const loginWithEmailPassword = async({ email, password }) =>{

    try{
    
        let result = await signInWithEmailAndPassword(FirebaseAuth, email, password );
        let user = result.user;
        if( !result ) return { ok: false, errorMessage : 'usuario o contraseña incorrecto' }
        
        return{
            ok : true,
            uid : user.uid,
            displayName : user.displayName,
            photoURL : user.photoURL ,
            email :  user.email,
        }

    }
    catch(error){
        return{
            ok : false,
            errorCode : error.code,
            errorMessage : error.code,
        
        } 
    }


}

export const logoutFirebase = async () =>{

    return await FirebaseAuth.signOut();
    

} 


