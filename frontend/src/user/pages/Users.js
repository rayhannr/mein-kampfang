import React from 'react'

import UsersList from '../components/UsersList'

const Users = () => {
    const USERS = [
        {
            id: 'u1',
            name: 'Annisa', 
            image:'https://source.unsplash.com/kslvR5ZB5aA', 
            places: 3
        }
    ]

    return <UsersList items={USERS} />
}

export default Users