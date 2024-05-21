import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
// import MarketingApp from './components/MarketingApp';
// import AuthApp from './components/AuthApp';
import Header from './components/Header';
import Progress from './components/Progress';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

// Marketing lazy is a react component
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
    productionPrefix: 'co',
});

const history = createBrowserHistory();

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    // isSignedIn is a second argument, function gets run each time value of isSignedIn changes
    useEffect(() => {
        if (isSignedIn) {   
            // push the user to the dashboard
            history.push('/dashboard')
        }
    }, [isSignedIn]);
    return (
        // creates browser history object for us behind the scenes
        // react router is going to create Browser History
        // changed from browser history so we have control to history object through Router
        <Router history={history}>
            <StylesProvider createGenerateClassName={generateClassName}>
                <div>
                    <Header isSignedIn={isSignedIn} onSignOut={()=> setIsSignedIn(false)}/>
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth" component={AuthLazy}>
                                <AuthLazy onSignIn={() => setIsSignedIn(true)}/>
                            </Route>
                            <Route path="/dashboard">
                                {!isSignedIn && <Redirect to="/"/>}
                                <DashboardLazy/>
                            </Route>
                            <Route path="/" component={MarketingLazy}/>
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </Router>
    );
}
        