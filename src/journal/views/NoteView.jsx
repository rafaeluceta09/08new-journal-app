import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';
import { ImageGallery } from '../components'

import { useForm } from '../../hooks/useForm';
import { setActiveNote, updateNote } from '../../store/journal/journalSlice';
import { startUpdateNote } from '../../store/journal';


export const NoteView = () => {
    const { activeNote  } = useSelector( state => state.journal );
    const {onInputChange, description, title, date , formState } = useForm( activeNote );
    const dispath = useDispatch();
    const newDate = useMemo(() => {
        let ndate =  new Date( date );
        return ndate.toUTCString();
    },[activeNote.date])

    useEffect(() => {

        dispath(setActiveNote( formState ));
    
    }, [formState])

    const onSaveNote = () =>{

        dispath(startUpdateNote());
        dispath(updateNote());
        

    }
    
    

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light' > { newDate } </Typography>
        </Grid>
        <Grid item>
            <Button
            onClick={ onSaveNote }
             color="primary" sx={{ padding: 2 }}>
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                name='title'
                value={ title }
                onChange={ onInputChange }
                sx={{ border: 'none', mb: 1 }}
            />

            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió en el día de hoy?"
                name='description'
                value={ description }
                onChange={ onInputChange }
                minRows={ 5 }
            />
        </Grid>

        {/* Image gallery */}
        <ImageGallery />

    </Grid>
  )
}
