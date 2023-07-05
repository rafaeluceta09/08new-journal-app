import { signInWhithGoogle } from "../../firebase";
import { checkingCredentials, login, logout } from "./authSlice";

export const chekingAuthentication = ( email, passwords) => {

    return  (dispatch) => {
        
        dispatch( checkingCredentials() );
    }
}


export const  startGoogleSignIn = () => {
    return async ( dispatch ) => {
        
       dispatch(checkingCredentials() );

       const result = await signInWhithGoogle();
       if (!result.ok) return  dispatch(logout(result) ); 

       //delete result.errorMessage ;
       dispatch(login(result));

    }

}
