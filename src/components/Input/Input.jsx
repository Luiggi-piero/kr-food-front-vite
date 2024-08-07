import React from 'react'
import classes from './input.module.css';
import InputContainer from '../InputContainer/InputContainer';

function Input(
    { label, type, defaultValue, onChange, onBlur, name, error },
    ref
) {

    const getErrorMessage = () => {
        if (!error) return;
        if (error.message) return error.message;
        // default
        switch (error.type) {
            case 'required':
                return 'This field is required'
            case 'minLength':
                return 'Field is too short';
            default:
                return '*';
        }
    }

    return (
        <InputContainer label={label}>
            <input
                defaultValue={defaultValue}
                className={classes.input}
                type={type}
                placeholder={label}
                ref={ref}
                name={name}
                onChange={onChange}
                onBlur={onBlur} // evento que se ejecuta cuando se pierde el foco sobre este input
            />
            {error && <div className={classes.error}>{getErrorMessage()}</div>}
        </InputContainer>
    )
}

export default React.forwardRef(Input);

/**
 * El componente Input se exporta usando React.forwardRef, lo que significa que 
 * se permite que el componente reciba una referencia (ref) desde su componente padre. 
 * Esto puede ser útil si necesitas manipular el DOM del componente Input directamente.
 * 
 * Permite el uso de referencias de React para acceder al componente desde el exterior.
 */