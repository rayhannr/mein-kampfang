import React, {useEffect, useState} from 'react'

import UsersList from '../components/UsersList'
import ErrorModal from '../../shared/components/UI/ErrorModal'
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner'
import {useHttpClient} from '../../shared/hooks/http-hook'

const Users = () => {
    const {isLoading, error, sendRequest, clearError} =  useHttpClient()
    const [loadedUsers, setLoadedUsers] = useState()

    useEffect(() => {
        document.title = "Mein Kampfang - Users"
    }, [])

    useEffect(() => {
        const fetchUsers = () => {
            sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users`).then((responseData) => {
                setLoadedUsers(responseData.users)
            })
        }
        fetchUsers()
    }, [sendRequest])

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && 
                <div className="center">
                    <LoadingSpinner />
                </div>
            }
            {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
        </React.Fragment>
    )
}

export default Users