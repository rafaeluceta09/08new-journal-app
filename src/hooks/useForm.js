import { FormatShapes } from '@mui/icons-material';
import { useEffect,useState , useMemo } from 'react';

export const useForm = ( initialState = {}, requestValidations={} ) => {
  
    const [ formState, setFormState ] = useState( initialState, requestValidations );
    const [formValidations, setformValidations] = useState({});


    useEffect(() => {
        checkFormValidations();
    }, [formState])

    useEffect(()=>{
        setFormState(initialState);
    },[initialState])

    const isFormValid = useMemo( () => {
        for(let formItem of Object.keys(formValidations)){

            if (formValidations[formItem] !== null)  return false;
        }  
        return true;
    },[formValidations])
    
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const checkFormValidations = () =>{
        const checkValidations ={ } ;

        for (let itemForm of Object.keys( requestValidations )) {            
            let [ fn, errorMessage ] = requestValidations[itemForm];
            checkValidations[`${itemForm}Valid`] = fn(formState[itemForm]) ? null : errorMessage;
        }
        setformValidations(checkValidations);
    }

    const onResetForm = () => {
        setFormState( initialState );
    }

    return {
        ...formState,
        ...formValidations,
        formState,
        isFormValid,
        onInputChange,
        onResetForm,
    }
}
