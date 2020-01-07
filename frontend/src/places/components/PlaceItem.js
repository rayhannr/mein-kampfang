import React, {useState, useContext} from 'react'
import './PlaceItem.css'

import Card from '../../shared/components/UI/Card'
import Button from '../../shared/components/Form/Button'
import Modal from '../../shared/components/UI/Modal'
import Map from '../../shared/components/UI/Map'
import ErrorModal from '../../shared/components/UI/ErrorModal'
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner'

import {AuthContext} from '../../shared/context/auth-context'
import {useHttpClient} from '../../shared/hooks/http-hook'

const PlaceItem = props => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const auth = useContext(AuthContext)
    const [showMap, setShowMap] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const openMap = () => setShowMap(true)
    const closeMap = () => setShowMap(false)
    const showDeleteWarning = () => setShowConfirmModal(true)
    const canceleDeleteWarning = () => setShowConfirmModal(false)
    const confirmDelete = () => {
        setShowConfirmModal(false)
        sendRequest(
            `http://localhost:5000/api/places/${props.id}`,
            'DELETE'
        ).then(() => {
            props.onDelete(props.id)
        })
    }

    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Modal 
                show={showMap} 
                onCancel={closeMap}
                header={props.address}
                contentClass="place-item__content"
                footerClass="place-item__actions"
                footer={<Button onClick={closeMap}>Close</Button>}
            >
                <div className="map-container">
                    <Map center={props.coordinates} zoom={16} />
                </div>
            </Modal>
            <Modal 
                show={showConfirmModal} 
                header="Do you really want to delete this place?" 
                footerClass="place-item__modal-actions"
                onCancel={canceleDeleteWarning} 
                footer={
                <React.Fragment>
                    <Button inverse onClick={canceleDeleteWarning}>Cancel</Button>
                    <Button danger onClick={confirmDelete}>Delete</Button>
                </React.Fragment>
            }>
                <p> Please note that it can't be undone.</p>
            </Modal>
            <li className="place-item">
                <Card className="place-item__content">
                    {isLoading && <LoadingSpinner asOverlay />}
                    <div className="place-item__image">
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={openMap}>View on Map</Button>
                        {auth.userId === props.creatorId && <Button to={`/places/${props.id}`}>Edit</Button>}
                        {auth.userId === props.creatorId && <Button danger onClick={showDeleteWarning}>Delete</Button>}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    )
}

export default PlaceItem