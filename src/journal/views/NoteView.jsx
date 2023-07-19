import { useMemo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { DeleteOutline, NoEncryption, SaveOutlined, Upload, UploadFile, UploadFileOutlined } from '@mui/icons-material';
import { ImageGallery } from '../components'

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css'

import { useForm } from '../../hooks/useForm';
import { clearMessageSaved, setActiveNote, updateNote } from '../../store/journal/journalSlice';
import { startDeleteNote, startUpdateNote, startUploadImage } from '../../store/journal';
import { red } from '@mui/material/colors';



export const NoteView = () => {
    const { activeNote, messageSaved  } = useSelector( state => state.journal );
    const {onInputChange, description, title, date , formState } = useForm( activeNote );
    const dispath = useDispatch();


    useEffect(() => {
        dispath(setActiveNote( formState ));
    }, [formState])

    useEffect(()=>{
        if(messageSaved.length > 0 ) {
            Swal.fire(
                'Nota Actualizada',
                 messageSaved,
                'success'
              )  

              dispath(clearMessageSaved());
        }
    },[messageSaved]);

    const newDate = useMemo(() => {
        let ndate =  new Date( date );
        return ndate.toUTCString();
    },[activeNote.date])

    const fileInputRef = useRef();
    
    const onSaveNote = () =>{
        console.log('buttotn saverd punchado');
        dispath(startUpdateNote());
    }

    const onFileInputChange = ({ target }) =>{       
        if(target.files === 0 ) return;
        dispath(startUploadImage(target.files));
    } 

    const onDeleteNote = ( ) =>{
        
        dispath(startDeleteNote());

    }



    
    return (

        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={ 39 } fontWeight='light' > { newDate } </Typography>
            </Grid>


            <Grid item>
                <input type='file' 
                 multiple
                 ref={ fileInputRef }
                 style = {{ display : 'none' } }
                 onChange={onFileInputChange}
                 
                />
                <IconButton
                onClick={ ()=> fileInputRef.current.click() }
                sx={{ color: 'primary' }}
                >
                    <Upload />
                </IconButton>
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
            <Grid container justifyContent={ 'end' } >                
                <IconButton 
                sx={{ color: 'red' }}
                onClick={onDeleteNote}
                >
                    Delete
                    <DeleteOutline />
                </IconButton>
            </Grid>

            {/* Image gallery */}
            <ImageGallery images ={ activeNote.imageUrls } />

        </Grid>
    )
}
