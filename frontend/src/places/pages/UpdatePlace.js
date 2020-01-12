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
        },
        address: {
            value: '',
            isValid: false
        }
    }, false)

    useEffect(() => {
        document.title = "Mein Kampfang - Update Place"
    }, [])

    useEffect(() => {
        const fetchPlace = () => {
            sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`).then((responseData) => {
                setLoadedPlace(responseData.place)
                setFormData({
                    title: {
                        value: responseData.place.title,
                        isValid: true
                    },
                    description: {
                        value: responseData.place.description.join('\n\n'),
                        isValid: true
                    },
                    address: {
                        value: responseData.place.address,
                        isValid: false
                    }
                }, true)
            })
        }
        fetchPlace()
    }, [sendRequest, placeId, setFormData])

    useEffect(() => {
        console.log(formState)
    }, [formState])

    const placeUpdateSubmit = event => {
        event.preventDefault()
        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
            'PATCH',
            JSON.stringify({
                title: formState.inputs.title.value,
                description: formState.inputs.description.value.split('\n').filter(desc => desc !== "").map(des => des + '/29omaewa'),
                address: formState.inputs.address.value
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
                    value={loadedPlace.description.join('\n\n')}
                    valid={true} />

                <Input 
                    element="input" 
                    id="address"
                    label="Address" 
                    errorText="Please enter a valid address."
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                    value={loadedPlace.address}
                    valid={true} />
                    
                <div style={{textAlign: 'right', paddingTop: '30px'}}>
                    <Button type="submit" disabled={!formState.isValid} style={{position: 'absolute', right: '20px', bottom: '20px'}}>Update Place</Button>
                </div>
            </form>
            } 
        </React.Fragment>
    )
}

export default UpdatePlace