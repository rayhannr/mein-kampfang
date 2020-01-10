import React, {useState, useContext, useEffect} from 'react'
import './Auth.css'

import Card from '../../shared/components/UI/Card'
import ErrorModal from '../../shared/components/UI/ErrorModal'
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner'
import Input from '../../shared/components/Form/Input'
import Button from '../../shared/components/Form/Button'
import ImageUpload from '../../shared/components/Form/ImageUpload'

import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../shared/util/validators'
import {useForm} from '../../shared/hooks/form-hook'
import {useHttpClient} from '../../shared/hooks/http-hook'
import {AuthContext} from '../../shared/context/auth-context'

const Auth = () => {
    const auth = useContext(AuthContext)
    const [isLogin, setIsLogin] = useState(true)
    const {isLoading, error, sendRequest, clearError} = useHttpClient()

    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false)

    useEffect(() => {
        document.title = `Mein Kampfang - ${isLogin ? 'Login' : 'Signup'}`
    }, [isLogin])

    const switchMode = () => {
        if(!isLogin){
            setFormData({
                ...formState.inputs,
                name: undefined,
                image: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                },
                image: {
                    value: null,
                    isValid: false
                }
            }, false)
        }
        setIsLogin(prev => !prev)
    }

    const authSubmit = event => {
        event.preventDefault()
        if(isLogin){
            sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/users/login`, 
                'POST',
                JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                }),
                {'Content-Type': 'application/json'}
            ).then((responseData) => {
                auth.login(responseData.userId, responseData.token)
            })
        } else {
            const formData = new FormData()
            formData.append('name', formState.inputs.name.value)
            formData.append('email', formState.inputs.email.value)
            formData.append('password', formState.inputs.password.value)
            formData.append('image', formState.inputs.image.value)
            sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
                'POST',
                formData
            ).then((responseData) => {
                auth.login(responseData.userId, responseData.token)
            })
        }
    }

    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>{isLogin ? 'Login' : 'Signup'}</h2>
                <hr />
                <form onSubmit={authSubmit}>
                    {!isLogin && 
                        <Input
                            element="input"
                            id="name"
                            type="text"
                            label="Name"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a name"
                            onInput={inputHandler} />
                    }
                    {!isLogin && <ImageUpload center id="image" onInput={inputHandler} errorText="Please provide an image." />}
                    <Input 
                        element="input" 
                        id="email" 
                        type="email"
                        label="Email"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Please enter a valid email."
                        onInput={inputHandler} />

                    <Input 
                        element="input" 
                        id="password" 
                        type="password"
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(8)]}
                        errorText="Please enter a valid password, at least 8 characters."
                        onInput={inputHandler} />

                    <Button 
                        type="submit" 
                        disabled={!formState.isValid}>{isLogin ? 'Login' : 'Signup'} </Button>
                </form>
                <Button inverse onClick={switchMode}>Switch to {isLogin ? 'Signup' : 'Login'} </Button>
            </Card>
        </React.Fragment>
    )
}

export default Auth