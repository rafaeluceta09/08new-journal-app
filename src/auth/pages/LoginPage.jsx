import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';

export const LoginPage = () => {

  const { state, errorMessage } =  useSelector( (state) => state.auth );
  const { email, password, onInputChange } = useForm({ email : '', password : ''  } );

  const dispath = useDispatch();


  const onSubmitForm = (e) => {
    e.preventDefault();
    dispath(startLoginWithEmailPassword({ email, password }));
  }

  const onGoogleSignIn= () =>{
    //.preventDefault();
    dispath(startGoogleSignIn());
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit= { onSubmitForm }>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                name='email'
                onChange={ onInputChange }
                value={ email }
                fullWidth

              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                name='password'
                onChange={ onInputChange }
                value={ password }
                fullWidth
              />
            </Grid>
            <Grid container>
              <Grid 
                display={ !!errorMessage ? '' : 'none' }
                item xs={ 12 } >
                <Alert
                  severity='error' >
                    { errorMessage }
                </Alert>
              </Grid>
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button type='submit' variant='contained' fullWidth>
                  Login
                </Button>
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button variant='contained' fullWidth
                onClick={ onGoogleSignIn }
                >
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}
