import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
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



