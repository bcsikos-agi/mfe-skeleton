import React from 'react'
import { Link } from 'react-router-dom'

export default function IsolationOnly() {
    return (
        <>
            <h1>IsolationOnly</h1>
            <p>Supported path(s) for container</p>
            <list>
                <li key="1">
                    <Link to="/auth/signin">SignIn</Link>
                </li>
                <li key="2">
                    <Link to="/auth/signup">SignUp</Link>
                </li>
            </list>
        </>
    )
}