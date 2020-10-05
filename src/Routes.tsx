import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home/index';
import Admin from './Admin';
function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/admin" exact component={Admin} />
                <Route component={Home} />
            </Switch>
        </BrowserRouter>
    );

}

export default Routes;