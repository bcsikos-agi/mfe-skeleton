import { mount } from 'viewer/PolicyViewerApp'
import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default ({ getIdTokenClaims }) => {
    const ref = useRef(null)
    const history = useHistory()

    useEffect(() => {
        const {
            // MF API upstream
            // upstream navigation
            onParentNavigate,
            onParentogout
        } = mount(ref.current,
            {
                // MF API downstream
                // downstream navigation
                onNavigate: ({ pathname: nextPathname }) => {
                    const { pathname } = history.location
                    if (pathname !== nextPathname) {
                        history.push(nextPathname)
                    }
                },
                initialPath: history.location,
                getIdTokenClaims: getIdTokenClaims
            })
        history.listen(onParentNavigate)
    }, [])
    return <div ref={ref}></div>
}