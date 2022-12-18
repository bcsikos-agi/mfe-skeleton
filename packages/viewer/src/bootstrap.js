import React from 'react'
import ReactDOM from 'react-dom'
import { createMemoryHistory, createBrowserHistory } from 'history'
import App from './App'

const mount = (el,
    // Mount function to start up the app
    // MF API downstream
    {
        onNavigate,
        defaultHistory,
        initialPath,
        getIdTokenClaims
    }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    })
    if (onNavigate) {
        history.listen(onNavigate)
    }
    ReactDOM.render(<App history={history}
        getIdTokenClaims={getIdTokenClaims} />
        ,
        el)
    return {
        // MF API upstream
        onParentNavigate({ pathname: nextPathname }) {
            const { pathname } = history.location
            if (pathname !== nextPathname) {
                history.push(nextPathname)
            }
        },
        onParentogout() {
            // do domain2 specific logout steps
            console.log(`Logging out from Domain2 App`)
        }
    }
}

// If we are in development and in isolation,
// call mount immediatly
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_viewer-dev-root')
    if (devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory() })
    }
}


// We are running through container
// and we should export the mount function
export { mount }