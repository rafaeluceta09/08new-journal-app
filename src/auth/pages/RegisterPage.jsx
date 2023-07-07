import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { startCreateUserWithEmailPassword } from '../../store/auth/thunks';

const initialState ={

  email : '',
  password : '',
  displayName : ''
}

const requestValidations ={
  email : [ (value)=> value.includes('@') , 'el correo debe contener @' ],
  password : [(value) => value.length > 2 , 'la contraseña debe contener al menos 3 caracteres'] ,
  displayName : [ (value) => value.length > 2 , 'el nombre debe contener al menos 3 caracteres' ]
}


export const RegisterPage = () => {
  const [isSubmited, setisSubmited] =  useState(false);
  const { email, password, displayName, onInputChange,
          emailValid,passwordValid, displayNameValid, isFormValid} = useForm(initialState, requestValidations);
  const dispatch = useDispatch();

  
  
  const onSubmitForm = ( e ) => {
    e.preventDefault();
    setisSubmited( true );
    if (!isFormValid) return false;

    dispatch(startCreateUserWithEmailPassword({ email, password , displayName }))
    

  }

  return (
    <AuthLayout title="Crear cuenta">
      <Grid>
        { isFormValid ? 'Valido' : 'No Valido'  }
      </Grid>
      <form onSubmit={ onSubmitForm } >
          <Grid container>
           
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre completo" 
                type="text" 
                name= 'displayName'
                value={ displayName }
                onChange={ onInputChange }
                placeholder='Nombre completo' 
                fullWidth
                error = { !!displayNameValid && isSubmited }
                helperText = { displayNameValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="text" 
                name= 'email'
                value={ email }
                onChange={ onInputChange }
                placeholder='correo@google.com' 
                fullWidth
                error = { !!emailValid && isSubmited }
                helperText = { emailValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type= "password" 
                name= 'password'
                value={ password }
                onChange={ onInputChange }
                placeholder='Contraseña' 
                fullWidth
                error = { !!passwordValid && isSubmited }
                helperText = { passwordValid }
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 }>
                <Button type='submit' variant='contained' fullWidth>
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                ingresar
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}
