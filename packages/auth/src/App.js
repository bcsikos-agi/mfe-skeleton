import React from "react";
import { Switch, Router, Route } from 'react-router-dom'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import Signin from './components/Signin'
import Signup from './components/Signup'
import IsolationOnly from "./components/IsolationOnly";

const generateClassName = createGenerateClassName({
    productionPrefix: 'au'
})
export default ({ history, onSignIn }) => {
    return (
        <div>
            <StylesProvider generateClassName={generateClassName}>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/" component={IsolationOnly} />
                        <Route path="/user/signin">
                            <Signin onSignIn={onSignIn} />
                        </Route>
                        <Route path="/user/signup">
                            <Signup onSignIn={onSignIn} />
                        </Route>
                    </Switch>
                </Router>
            </StylesProvider>
        </div>
    )
}