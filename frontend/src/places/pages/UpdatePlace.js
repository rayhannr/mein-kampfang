import React, {useEffect, useState, useContext} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import './PlaceForm.css'

import Input from '../../shared/components/Form/Input'
import Button from '../../shared/components/Form/Button'
import Card from '../../shared/components/UI/Card'
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner'
import ErrorModal from '../../shared/components/UI/ErrorModal'

import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/validators'
import {useForm} from '../../shared/hooks/form-hook'
import {useHttpClient} from '../../shared/hooks/http-hook'
import {AuthContext} from '../../shared/context/auth-context'

const UpdatePlace = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const [loadedPlace, setLoadedPlace] = useState()
    const placeId = useParams().placeId
    const history = useHistory()
    const auth = useContext(AuthContext)

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false)

    useEffect(() => {
        const fetchPlace = () => {
            sendRequest(`http://localhost:5000/api/places/${placeId}`).then((responseData) => {
                setLoadedPlace(responseData.place)
                setFormData({
                    title: {
                        value: responseData.place.title,
                        isValid: true
                    },
                    description: {
                        value: responseData.place.description,
                        isValid: true
                    }
                }, true)
            })
        }
        fetchPlace()
    }, [sendRequest, placeId, setFormData])

    const placeUpdateSubmit = event => {
        event.preventDefault()
        sendRequest(
            `http://localhost:5000/api/places/${placeId}`,
            'PATCH',
            JSON.stringify({
                title: formState.inputs.title.value,
                description: formState.inputs.description.value
            }),
            {'Content-Type': 'application/json', Authorization: `Bearer ${auth.token}`}
        ).then(() => {
            history.push(`/${auth.userId}/places`)
        })
    }

    if(isLoading){
        return (
            <div className="center">
                <LoadingSpinner />
            </div>
        )
    }

    if(!loadedPlace && !error){
        return (
            <div className="center">
                <Card>
                    <h4>Couldn't find the place.</h4>
                </Card>
            </div>
        )
    }

    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && loadedPlace && <form className="place-form" onSubmit={placeUpdateSubmit}>
                <Input 
                    id="title" 
                    element="input" 
                    type="text" 
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title."
                    onInput={inputHandler}
                    value={loadedPlace.title}
                    valid={true} />

                <Input 
                    element="textarea" 
                    id="description"
                    label="Description" 
                    errorText="Please enter a valid description (at least 5 characters)."
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    onInput={inputHandler}
                    value={loadedPlace.description}
                    valid={true} />
                <Button type="submit" disabled={!formState.isValid}>Update Place</Button>
            </form>
            } 
        </React.Fragment>
    )
}

export default UpdatePlace