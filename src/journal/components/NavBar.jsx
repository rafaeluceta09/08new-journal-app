import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { signOutApp } from '../../store/auth';


export const NavBar = ({ drawerWidth = 240 }) => {

    const dispath = useDispatch();
    const navigate = useNavigate();

    const logoutApp = () =>{

        dispath(signOutApp());

        navigate(
            '/auth/login',true
        )

        
    }
  return (
    <AppBar 
        position='fixed'
        sx={{ 
            width: { sm: `calc(100% - ${ drawerWidth }px)` },
            ml: { sm: `${ drawerWidth }px` }
         }}
    >
        <Toolbar>
            <IconButton
                color='inherit'
                edge="start"
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuOutlined />
            </IconButton>

            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6' noWrap component='div'> JournalApp </Typography>

                <IconButton
                 onClick={ logoutApp }
                 color='error'>
                    <LogoutOutlined />
                </IconButton>
            </Grid>

        </Toolbar>
    </AppBar>
  )
}
