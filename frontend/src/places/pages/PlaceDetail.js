import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import './PlaceDetail.css'

import Card from '../../shared/components/UI/Card'
import ErrorModal from '../../shared/components/UI/ErrorModal'
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner'
import PlaceItem from '../components/PlaceItem'
import {useHttpClient} from '../../shared/hooks/http-hook'

const PlaceDetail = () => {
    const placeId = useParams().placeId
    const [loadedPlace, setLoadedPlace] = useState()
    const {isLoading, error, sendRequest, clearError} = useHttpClient()

    useEffect(() => {
        sendRequest(`http://localhost:5000/api/places/${placeId}`).then((responseData) => {
            setLoadedPlace(responseData.place)
        })
    }, [placeId, sendRequest])

    const placeDeleter = (deletedPlaceId) => {
        setLoadedPlace(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId))
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
            {!isLoading && loadedPlace &&
                <div className="place-detail">
                    <PlaceItem 
                        id={loadedPlace.id} 
                        image={loadedPlace.image} 
                        title={loadedPlace.title} 
                        description={loadedPlace.description} 
                        address={loadedPlace.address} 
                        creatorId={loadedPlace.creator} 
                        coordinates={loadedPlace.location}
                        onDelete={placeDeleter} />
                </div> 
            }
        </React.Fragment>
    )
}

export default PlaceDetail