import React, { useContext, useEffect, useState } from 'react'
import { login } from '../../context/authContext/apiCalls'
import { AuthContext } from '../../context/authContext/AuthContext'
import './Login.css'

const Login = () => {

    const { isFetching, dispatch } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        login({ email, password }, dispatch)
    }

    return (
        <div className='login'>
            <form className="loginForm">
                <input type="text" onChange={e => setEmail(e.target.value)} placeholder='Email' className='loginInput' />
                <input type="password" onChange={e => setPassword(e.target.value)} placeholder='Password' className='loginInput' />
                <button className="loginButton" disabled={isFetching} onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}

export default Login
