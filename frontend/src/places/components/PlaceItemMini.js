import React from 'react'
import {Link} from 'react-router-dom'

import Avatar from '../../shared/components/UI/Avatar'
import Card from '../../shared/components/UI/Card'

const UserItem = props => (
    <li className="user-item">
        <Card className="user-item__content" style={{padding: 0}}>
            <Link to={`/places/item/${props.id}`}>
                <div className="user-item__image">
                    <Avatar image={`http://localhost:5000/${props.image}`} alt={props.title} />
                </div>
                <div className="user-item__info">
                    <h3 style={{margin: 0}}>{props.title}</h3>
                </div>
            </Link>
        </Card>
    </li>
)

export default UserItem