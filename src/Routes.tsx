import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useUserSaved } from './context/contextMain';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Atividades from './pages/Atividades';
import Cardapio from './pages/Cardapio';
import Galery from './pages/Galery';
import Portfifolio from './pages/Portifolio';
import Professores from './pages/Professores';
import Turmas from './pages/Turmas';

function Routes() {
    const { userSaved } = useUserSaved();
    if (!userSaved) {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/admin" exact component={Admin} />
                </Switch>
            </BrowserRouter>
        )
    }
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/admin" exact component={Admin} />
                <Route path="/admin/atividades" exact component={Atividades} />
                <Route path="/admin/cardapio" exact component={Cardapio} />
                <Route path="/admin/galery" exact component={Galery} />
                <Route path="/admin/portifolio" exact component={Portfifolio} />
                <Route path="/admin/professores" exact component={Professores} />
                <Route path="/admin/turmas" exact component={Turmas} />
                <Route component={Home} />
            </Switch>
        </BrowserRouter>
    );

}

export default Routes;