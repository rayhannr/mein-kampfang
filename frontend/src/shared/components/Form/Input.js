import React, {useReducer, useEffect} from 'react'
import './Input.css'
import {validate} from '../../util/validators'

const inputReducer = (state, action) => {
    switch(action.type){
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            }
        case 'TOUCH':
            return{
                ...state,
                isTouched: true
            }
        default:
            return state
    }
}

const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.value || '', 
        isValid: props.valid || false, 
        isTouched: false,
    })

    let isFilled = inputState.value.length > 0

    const{id, onInput} = props
    const{value, isValid} = inputState

    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, onInput, isValid, value])

    const changeHandler = event => {
        dispatch({type: 'CHANGE', val: event.target.value, validators: props.validators})
    }

    const touchHandler = () => {
        dispatch({type: 'TOUCH'})
    }

    const element = props.element === 'input' ? (
        <input 
            id={props.id} 
            type={props.type} 
            placeholder={props.placeholder}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value} />
        ) : (
        <textarea 
            id={props.id} 
            rows={props.rows || 6}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value} />)

    return(
        <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
            {element}
            <span className="highlight"></span>
            <span className="bar"></span>
            <label htmlFor={props.id} className={isFilled ? 'is-filled' : undefined }>{props.label}</label>
            {!inputState.isValid && inputState.isTouched && <p className="form-control__error">{props.errorText} </p>}
        </div>
    )
}

export default Input