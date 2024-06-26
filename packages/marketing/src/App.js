import React from "react";
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";

import Landing from './components/Landing';
import Pricing from './components/Pricing';

const generateClassName = createGenerateClassName({
    productionPrefix: 'ma',
});

// history is received as a prop from bootstrap
export default ({ history }) => {
    return (
    // we want to use memory history instead of browser history so that the browser history @ container level is not getting overwritten
    // must provide Router history to use since it does not create its own
    // created a memory history inside of bootstrap file so we can customize it to sync up with history inside of container
    <div>
        <StylesProvider generateClassName={generateClassName}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/pricing" component={Pricing}/>
                    <Route path="/" component={Landing}/>
                </Switch>
            </Router>
        </StylesProvider>
    </div>
    )
};