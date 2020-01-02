import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import './PlaceForm.css'

import Input from '../../shared/components/Form/Input'
import Button from '../../shared/components/Form/Button'
import Card from '../../shared/components/UI/Card'
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/validators'
import {useForm} from '../../shared/hooks/form-hook'

const PLACES = [
    {
        id: 'p1',
        title: 'Tongkol',
        description: 'One of the most ganteng',
        imageUrl: 'https://source.unsplash.com/tiEQb6YaXhc',
        address: 'Louisville, KY, USA',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Tongkol',
        description: 'One of the most ganteng',
        imageUrl: 'https://source.unsplash.com/tiEQb6YaXhc',
        address: 'Louisville, KY, USA',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u2'
    }
]

const UpdatePlace = () => {
    const placeId = useParams().placeId
    const [isLoading, setIsLoading] = useState(true)

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

    const identifiedPlace = PLACES.find(place => place.id === placeId)

    useEffect(() => {
        if(identifiedPlace){
            setFormData({
                title: {
                    value: identifiedPlace.title,
                    isValid: true
                },
                description: {
                    value: identifiedPlace.description,
                    isValid: true
                }
            }, true)
        }
        setIsLoading(false)
    }, [setFormData, identifiedPlace])

    const placeUpdateSubmit = event => {
        event.preventDefault()
        console.log(formState.inputs, formState.isValid)
    }

    if(!identifiedPlace){
        return <div className="center">
                <Card>
                    <h4>Couldn't find the place.</h4>
                </Card>
            </div>
    }

    return(
        !isLoading ?
            <form className="place-form" onSubmit={placeUpdateSubmit}>
                <Input 
                    id="title" 
                    element="input" 
                    type="text" 
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title."
                    onInput={inputHandler}
                    value={formState.inputs.title.value}
                    valid={formState.inputs.title.isValid} />

                <Input 
                    element="textarea" 
                    id="description"
                    label="Description" 
                    errorText="Please enter a valid description (at least 5 characters)."
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    onInput={inputHandler}
                    value={formState.inputs.description.value}
                    valid={formState.inputs.description.isValid} />
                <Button type="submit" disabled={!formState.isValid}>Update Place</Button>
            </form> :
            <div className="center">
                <h2>Loading...</h2>
            </div>
    )
}

export default UpdatePlace