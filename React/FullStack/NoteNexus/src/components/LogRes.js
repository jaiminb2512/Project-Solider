import React from 'react'
import Login from './Login'
import Register from './Register'

const LogRes = () => {
    return (
        <div className="log-res">
            <div className="login-register">
                <Login className="components" />
                <div style={{marginTop: "20px", height: "350px"}} className='line' />
                <Register className="components" />
            </div>
        </div>
    )
}

export default LogRes