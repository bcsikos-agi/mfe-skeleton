import React, { lazy, Suspense, useState, useEffect } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import Progress from './components/Progress'
import Header from './components/Header'
import { createBrowserHistory } from 'history'
import { useAuth0 } from "@auth0/auth0-react";

const MarketingAppLazy = lazy(() => import('./components/MarketingApp'))
const AuthAppLazy = lazy(() => import('./components/AuthApp'))
const DashboardAppLazy = lazy(() => import('./components/DashboardApp'))
const PolicyViewerAppLazy = lazy(() => import('./components/PolicyViewerApp'))

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

const history = createBrowserHistory()

export default () => {
    const { loginWithRedirect, logout, user, isAuthenticated, getIdTokenClaims } = useAuth0();

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/protected')
        }
    }, [isAuthenticated])
    return (
        <StylesProvider generateClassName={generateClassName}>
            <Router history={history}>
                <Header isSignedIn={isAuthenticated} user={user} onSignOut={() => {
                    logout({ returnTo: window.location.origin })
                }} />
                <Suspense fallback={<Progress />}>
                    <Switch>
                        <Route path="/user">
                            <AuthAppLazy history={history}
                                onSignIn={() => {
                                    loginWithRedirect()
                                }} />
                        </Route>
                        <Route path="/domain2">
                            {!isAuthenticated ?
                                <Redirect to='/' />
                                :
                                <PolicyViewerAppLazy history={history}
                                    getIdTokenClaims={getIdTokenClaims} />
                            }
                        </Route>
                        <Route path="/vue">
                            <DashboardAppLazy
                                getIdTokenClaims={getIdTokenClaims} />
                        </Route>
                        <Route path="/" component={MarketingAppLazy} />
                    </Switch>
                </Suspense>
            </Router>
        </StylesProvider>
    )
}