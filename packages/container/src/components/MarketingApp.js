import { mount } from 'marketing/MarketingApp'
import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
export default () => {
    const ref = useRef(null)
    const history = useHistory()

    useEffect(() => {
        const {
            // MF API upstream
            // upstream navigation
            onParentNavigate
        } = mount(ref.current,
            {
                // MF API downstream
                // downstream navigation
                onNavigate: ({ pathname: nextPathname }) => {
                    const { pathname } = history.location
                    if (pathname !== nextPathname) {
                        history.push(nextPathname)
                    }
                }
            })
        history.listen(onParentNavigate)
    }, [])
    return <div ref={ref}></div>
}