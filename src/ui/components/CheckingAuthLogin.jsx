import { CircularProgress, Grid, Typography } from '@mui/material';
import { red } from '@mui/material/colors';


export const CheckingAuthLogin = ({ children, title = '' }) => {
  return (
    
    <Grid
      container
      spacing={ 0 }
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >

      <Grid container
        direction='row'
        justifyContent='center'
        sx={ { color:'white' }}
        >
            <CircularProgress color='inherit'  />
          

        </Grid>

    </Grid>

  )
}
