import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

import PlaceList from '../components/PlaceList'
import ErrorModal from '../../shared/components/UI/ErrorModal'
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner'
import {useHttpClient} from '../../shared/hooks/http-hook'

const UserPlaces = () => {
    const [loadedPlaces, setLoadedPlaces] =  useState()
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const userId = useParams().userId

    useEffect(() => {
        const fetchPlaces = () => {
            sendRequest(
                `http://localhost:5000/api/places/user/${userId}`
            ).then((responseData) => {
                setLoadedPlaces(responseData.places)
            })
        }
        fetchPlaces()
    }, [sendRequest, userId])

    const placeDeleter = (deletedPlaceId) => {
        setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId))
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeleter} />}
        </React.Fragment>
    )
}

export default UserPlaces