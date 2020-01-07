import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import './PlaceForm.css'
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/validators'

import Input from '../../shared/components/Form/Input'
import Button from '../../shared/components/Form/Button'
import ErrorModal from '../../shared/components/UI/ErrorModal'
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner'

import {AuthContext} from '../../shared/context/auth-context'
import {useForm} from '../../shared/hooks/form-hook'
import {useHttpClient} from '../../shared/hooks/http-hook'

const NewPlace = () => {
    const auth = useContext(AuthContext)
    const {isLoading, error, sendRequest, clearError} =  useHttpClient()
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

    const history = useHistory()

    const submitPlace = event => {
        event.preventDefault()
        sendRequest(
            'http://localhost:5000/api/places',
            'POST',
            JSON.stringify({
                title: formState.inputs.title.value,
                description: formState.inputs.description.value,
                address: formState.inputs.address.value,
                creator: auth.userId
            }),
            {'Content-Type': 'application/json'}
        ).then(() => {
            history.push('/')
        })
    }

    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form className="place-form" onSubmit={submitPlace}>
                {isLoading && <LoadingSpinner asOverlay />}
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
        </React.Fragment>
    )
}

export default NewPlace