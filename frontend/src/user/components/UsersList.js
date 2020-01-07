import React from 'react'
import './UsersList.css'

import UserItem from './UserItem'
import Card from '../../shared/components/UI/Card'

const UsersList = props => {
    const listOfUser = props.items.length === 0 ?
        <Card className="center">
            <h2>No users found.</h2>
        </Card> :

        <ul className="users-list">
            {props.items.map(user => (
                <UserItem 
                    key={user.id} 
                    id={user.id} 
                    image={user.image} 
                    name={user.name}
                    placeCount={user.places.length} 
                />
            ))}
        </ul>
    
    return listOfUser
}

export default UsersList