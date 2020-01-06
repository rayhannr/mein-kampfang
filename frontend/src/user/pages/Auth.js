import React, {useState, useContext} from 'react'
import './Auth.css'

import Card from '../../shared/components/UI/Card'
import Input from '../../shared/components/Form/Input'
import Button from '../../shared/components/Form/Button'
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../shared/util/validators'
import {useForm} from '../../shared/hooks/form-hook'
import {AuthContext} from '../../shared/context/auth-context'

const Auth = () => {
    const auth = useContext(AuthContext)
    const [isLogin, setIsLogin] = useState(true)
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

    const switchMode = () => {
        if(!isLogin){
            setFormData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false)
        }
        setIsLogin(prev => !prev)
    }

    const authSubmit = event => {
        event.preventDefault()
        console.log(formState.inputs)
        auth.login()
    }

    return(
        <Card className="authentication">
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
    )
}

export default Auth