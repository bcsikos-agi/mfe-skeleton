import React, { useState, useEffect } from "react";
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import { Route, Router, Switch } from "react-router-dom";
import JsonViewer from "./components/JsonViewer";

const generateClassName = createGenerateClassName({
    productionPrefix: 'vi'
})
export default ({ history, getIdTokenClaims }) => {
    const [data, setData] = useState({
        __raw: ''
    })
    useEffect(() => {
        getIdTokenClaims()
            .then(data => {
                setData(data)
            })
    }, [getIdTokenClaims])
    return (
        <div>
            <StylesProvider generateClassName={generateClassName}>
                <Router history={history}>
                    <Switch>
                        <Route path='/'>
                            <JsonViewer name="Received Identity1" jsonWebToken={{ identity1: data }} />
                            <JsonViewer name="Echanged Token2" jsonWebToken={{ token2: data }} />
                        </Route>
                    </Switch>
                </Router>
            </StylesProvider>
        </div>
    )
}