import React, {useEffect, useState} from 'react'

import PlaceItemMiniList from '../components/PlaceItemMiniList'
import ErrorModal from '../../shared/components/UI/ErrorModal'
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner'
import {useHttpClient} from '../../shared/hooks/http-hook'

const Places = () => {
    const {isLoading, error, sendRequest, clearError} =  useHttpClient()
    const [loadedPlaces, setLoadedPlaces] = useState()

    useEffect(() => {
        document.title = "Mein Kampfang - All Places"
    }, [])

    useEffect(() => {
        const fetchPlaces = () => {
            sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places`).then((responseData) => {
                setLoadedPlaces(responseData.places)
            })
        }
        fetchPlaces()
    }, [sendRequest])

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && 
                <div className="center">
                    <LoadingSpinner />
                </div>
            }
            {!isLoading && loadedPlaces && <PlaceItemMiniList items={loadedPlaces} />}
        </React.Fragment>
    )
}

export default Places