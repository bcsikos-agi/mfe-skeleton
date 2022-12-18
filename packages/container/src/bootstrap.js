import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
    <Auth0Provider
        domain="agssopoc.eu.auth0.com"
        clientId="BpKDgNfbPasEFD110SujbyVBrfs7iie3"
        redirectUri={window.location.origin}
    >
        <App />
    </Auth0Provider>,
    document.querySelector('#root')
)