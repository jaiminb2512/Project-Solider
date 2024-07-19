import React from 'react'
import Login from './Login'
import Register from './Register'

const LogRes = () => {
    return (
        <div className="log-res">
            <div className="login-register">
                <Login className="components" />
                <div className='line' />
                <Register className="components" />
            </div>
        </div>
    )
}

export default LogRes