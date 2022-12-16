import React from 'react'
import ReactDOM from 'react-dom'
import { createMemoryHistory, createBrowserHistory } from 'history'
import App from './App'

const mount = (el,
    // Mount function to start up the app
    // MF API downstream
    {
        onNavigate,
        defaultHistory
    }) => {
    const history = defaultHistory || createMemoryHistory()
    if (onNavigate) {
        history.listen(onNavigate)
    }
    ReactDOM.render(<App history={history} />, el)
    return {
        // MF API upstream
        onParentNavigate({ pathname: nextPathname }) {
            const { pathname } = history.location
            if (pathname !== nextPathname) {
                history.push(nextPathname)
            }
        }
    }
}

// If we are in development and in isolation,
// call mount immediatly
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_marketing-dev-root')
    if (devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory() })
    }
}


// We are running through container
// and we should export the mount function
export { mount }