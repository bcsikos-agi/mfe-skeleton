import { mount } from 'dashboard/DashboardApp'
import React, { useRef, useEffect } from 'react'

export default ({ getIdTokenClaims }) => {
    const ref = useRef(null)

    useEffect(() => {
        mount(ref.current, {
            // MF API downstream
            // downstream navigation
            getIdTokenClaims: getIdTokenClaims
        })
    }, [])
    return <div ref={ref}></div>
}