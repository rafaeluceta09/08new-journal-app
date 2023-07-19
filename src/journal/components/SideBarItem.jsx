import React, { useMemo } from 'react'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import {  TurnedInNot } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/journal/journalSlice'

export const SideBarItem = ({  title , description, id, date, imageUrls=[]  }) => {
    
    const dispatch = useDispatch();

    const newDescription = useMemo( ()=>{
        return (
            description.length > 17 
            ? description.substring(0,17) + '...'
            : description
        )

    },[] )

    const onClickNote = (id = '') =>{
        //esto es una forma 
       // dispatch(startActiveNote(id));
        //esto es otra forma
        dispatch(setActiveNote({title, description, id, date , imageUrls }))

    }

    return (
        <ListItem key={ title } disablePadding onClick={() => onClickNote(id)}>
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={ title } />
                    <ListItemText secondary={  newDescription } />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
