import { createWithEmailPassword, loginWithEmailPassword, logoutFirebase, signInWhithGoogle } from "../../firebase";
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
export const startCreateUserWithEmailPassword =({ email, password, displayName }) => {
    return async (dispatch) =>{

        dispatch( checkingCredentials() );
        const result = await createWithEmailPassword({ email, password, displayName });
        if( !result.ok ) return dispatch(logout(result))
        dispatch(login(result));
    }

}

export const startLoginWithEmailPassword = function( { email, password  }){
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await loginWithEmailPassword({ email, password  });
        if( !result.ok ) return (dispatch(logout(result)));

        dispatch(login(result));

    }
}

export const signOutApp =  () =>{

    return async (dispatch) => { 
        dispatch(checkingCredentials());
        const result = await logoutFirebase();
        dispatch(logout({ errorMessage: null }));
        
    }


}

