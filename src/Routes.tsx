import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useUserSaved } from './context/contextMain';
import Home from './pages/Home/index';
import Admin from './pages/Admin';
import Atividades from './pages/Atividades';
import Cardapio from './pages/Cardapio';
import Galery from './pages/Galery';
import Portfifolio from './pages/Portifolio';
import Professores from './pages/Professores';
import Turmas from './pages/Turmas';

function Routes() {
    const { userSaved } = useUserSaved();
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/admin" exact component={Admin} />
                <Route path="/admin/atividades" exact component={() => userSaved ? Atividades({}) : Home({})} />
                <Route path="/admin/cardapio" exact component={() => userSaved ? Cardapio({}) : Home({})} />
                <Route path="/admin/galery" exact component={() => userSaved ? Galery({}) : Home({})} />
                <Route path="/admin/portifolio" exact component={() => userSaved ? Portfifolio({}) : Home({})} />
                <Route path="/admin/professores" exact component={() => userSaved ? Professores({}) : Home({})} />
                <Route path="/admin/turmas" exact component={() => userSaved ? Turmas({}) : Home({})} />
                <Route component={Home} />
            </Switch>
        </BrowserRouter>
    );

}

export default Routes;