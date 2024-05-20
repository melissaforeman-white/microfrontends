import React from "react";
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";
import Signup from "./components/Signup";
import Signin from './components/Signin';
const generateClassName = createGenerateClassName({
    productionPrefix: 'au',
});

// history is received as a prop from bootstrap
export default ({ history, onSignIn }) => {
    return (
    // we want to use memory history instead of browser history so that the browser history @ container level is not getting overwritten
    // must provide Router history to use since it does not create its own
    // created a memory history inside of bootstrap file so we can customize it to sync up with history inside of container
    <div>
        <StylesProvider generateClassName={generateClassName}>
            <Router history={history}>
                <Switch>
                    <Route path="/auth/signin/">
                        <Signin onSignIn={onSignIn}/>
                    </Route>
                    <Route path="/auth/signup/">
                        <Signup onSignIn={onSignIn}/>
                    </Route>
                </Switch>
            </Router>
        </StylesProvider>
    </div>
    )
};