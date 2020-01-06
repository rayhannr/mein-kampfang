import React from 'react'
import {useParams} from 'react-router-dom'

import PlaceList from '../components/PlaceList'

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

const UserPlaces = () => {
    const userId = useParams().userId
    const loadedPlaces = PLACES.filter(place => place.creator === userId)
    return <PlaceList items={loadedPlaces} />
}

export default UserPlaces