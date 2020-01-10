import React from 'react'
import {Link} from 'react-router-dom'
import './UserItem.css'

import Avatar from '../../shared/components/UI/Avatar'
import Card from '../../shared/components/UI/Card'

const UserItem = props => (
    <li className="user-item">
        <Card className="user-item__content" style={{padding: 0}}>
            <Link to={`/${props.id}/places`}>
                <div className="user-item__image">
                    <Avatar image={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt={props.name} />
                </div>
                <div className="user-item__info">
                    <h3>{props.name}</h3>
                    <h4>{props.placeCount} {props.placeCount <= 1 ? 'Place' : 'Places'} </h4>
                </div>
            </Link>
        </Card>
    </li>
)

export default UserItem