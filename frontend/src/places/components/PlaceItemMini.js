import React from 'react'
import {Link} from 'react-router-dom'
import './PlaceItemMini.css'

import Avatar from '../../shared/components/UI/Avatar'
import Card from '../../shared/components/UI/Card'

const UserItem = props => (
    <li className="place-mini-item">
        <Card className="place-mini-item__content" style={{padding: 0}}>
            <Link to={`/places/item/${props.id}`}>
                <div className="place-mini-item__image">
                    <Avatar image={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt={props.title} />
                </div>
                <div className="place-mini-item__info">
                    <h3 style={{margin: 0}}>{props.title.length < 36 ? props.title : `${props.title.substring(0, Math.floor(props.title.length/2))}...` }</h3>
                </div>
            </Link>
        </Card>
    </li>
)

export default UserItem