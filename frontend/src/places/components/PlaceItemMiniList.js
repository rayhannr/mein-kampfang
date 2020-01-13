import React from 'react'
import './PlaceItemMiniList.css'

import PlaceItemMini from './PlaceItemMini'
import Card from '../../shared/components/UI/Card'

const PlaceItemMiniList = props => {
    const listOfPlaces = props.items.length === 0 ?
        <Card className="center">
            <h2>No places found.</h2>
        </Card> :

        <ul className="place-mini-list">
            {props.items.map(place => (
                <PlaceItemMini 
                    key={place.id} 
                    id={place.id} 
                    image={place.image} 
                    title={place.title}
                />
            ))}
        </ul>
    
    return listOfPlaces
}

export default PlaceItemMiniList