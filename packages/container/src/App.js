import React, { lazy, Suspense, useState, useEffect } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import Progress from './components/Progress'
import Header from './components/Header'
import { createBrowserHistory } from 'history'

const MarketingAppLazy = lazy(() => import('./components/MarketingApp'))
const AuthAppLazy = lazy(() => import('./components/AuthApp'))
const DashboardAppLazy = lazy(() => import('./components/DashboardApp'))

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

const history = createBrowserHistory()

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false)

    useEffect(() => {
        if (isSignedIn) {
            history.push('/protected')
        }
    }, [isSignedIn])
    return (
        <StylesProvider generateClassName={generateClassName}>
            <Router history={history}>
                <Header isSignedIn={isSignedIn} onSignOut={() => {
                    setIsSignedIn(false)
                }} />
                <Suspense fallback={<Progress />}>
                    <Switch>
                        <Route path="/user">
                            <AuthAppLazy history={history} onSignIn={() => {
                                setIsSignedIn(true)
                            }} />
                        </Route>
                        <Route path="/protected">
                            {!isSignedIn && <Redirect to='/' />}
                            <DashboardAppLazy />
                        </Route>
                        <Route path="/" component={MarketingAppLazy} />
                    </Switch>
                </Suspense>
            </Router>
        </StylesProvider>
    )
}