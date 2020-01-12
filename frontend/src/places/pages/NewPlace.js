import React, {useContext, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import './PlaceForm.css'
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/validators'

import Input from '../../shared/components/Form/Input'
import Button from '../../shared/components/Form/Button'
import ImageUpload from '../../shared/components/Form/ImageUpload'
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
        },
        image: {
            value: null,
            isValid: false
        }
    }, false)

    const history = useHistory()

    useEffect(() => {
        document.title = "Mein Kampfang - New Place"
    }, [])

    const submitPlace = event => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('title', formState.inputs.title.value)
        formData.append('description', formState.inputs.description.value.split('\n').filter(desc => desc !== "").map(des => des + '/29omaewa'))
        formData.append('address', formState.inputs.address.value)
        formData.append('image', formState.inputs.image.value)

        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/places`,
            'POST',
            formData,
            {Authorization: `Bearer ${auth.token}`}
        ).then(() => {
            history.push('/all-places')
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
                    errorText="Please enter a valid address."
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler} />
                <ImageUpload id="image" onInput={inputHandler} center errorText="Please provide an image." />
                <div style={{textAlign: 'right', paddingTop: '30px'}}>
                    <Button type="submit" disabled={!formState.isValid} style={{position: 'absolute', right: '20px', bottom: '20px'}}>Add Place</Button>
                </div>
            </form>
        </React.Fragment>
    )
}

export default NewPlace