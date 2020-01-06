import React from 'react'
import './PlaceForm.css'
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/validators'

import Input from '../../shared/components/Form/Input'
import Button from '../../shared/components/Form/Button'
import {useForm} from '../../shared/hooks/form-hook'

const NewPlace = () => {
    const [formState, inputHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        }
    }, false)

    const submitPlace = event => {
        event.preventDefault()
        console.log(formState.inputs)
    }

    return(
        <form className="place-form" onSubmit={submitPlace}>
            <Input 
                element="input" 
                type="text" 
                label="Title"
                id="title" 
                errorText="Please enter a valid title"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler} />
            <Input 
                element="textarea" 
                id="description"
                label="Description" 
                errorText="Please enter a valid description (at least 5 characters)."
                validators={[VALIDATOR_MINLENGTH(5)]}
                onInput={inputHandler} />
             <Input 
                element="input" 
                id="address"
                label="Address" 
                errorText="Please enter a valid description address."
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler} />
            <Button type="submit" disabled={!formState.isValid}>Add Place</Button>
        </form>
    )
}

export default NewPlace