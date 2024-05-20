import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import MarketingApp from './components/MarketingApp';
// import AuthApp from './components/AuthApp';
import Header from './components/Header';
import Progress from './components/Progress';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

// Marketing lazy is a react component
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

const generateClassName = createGenerateClassName({
    productionPrefix: 'co',
});

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    return (
        // creates browser history object for us behind the scenes
        // react router is going to create Browser History
        <BrowserRouter>
            <StylesProvider createGenerateClassName={generateClassName}>
                <div>
                    <Header isSignedIn={isSignedIn} onSignOut={()=> setIsSignedIn(false)}/>
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth" component={AuthLazy}>
                                <AuthLazy onSignIn={() => setIsSignedIn(true)}/>
                            </Route>
                            <Route path="/" component={MarketingLazy}>
                            </Route>
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </BrowserRouter>
    );
}
        