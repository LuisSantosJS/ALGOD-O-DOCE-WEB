import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './Home';
import Admin from './Admin';
function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/admin" exact component={Admin} />
                <Route component={App} />
            </Switch>
        </BrowserRouter>
    );

}

export default Routes;