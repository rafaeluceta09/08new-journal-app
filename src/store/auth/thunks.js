import { signInWhithGoogle } from "../../firebase";
import { checkingCredentials } from "./authSlice";

export const chekingAuthentication = ( email, passwords) => {

    return  (dispatch) => {
        
        dispatch( checkingCredentials() );
    }
}


export const  startGoogleSignIn = () => {
    return async ( dispatch ) => {

       dispatch(checkingCredentials() );
       const result = await signInWhithGoogle();
       console.log(result);

    }

}
