import React from 'react';
import { URL } from '../../service/api';
import { Link } from 'react-router-dom';
import { useUserSaved, useToken } from '../../context/contextMain';

const Header: React.FC = () => {
    const { userSaved, setUserSaved } = useUserSaved();
    const { setToken } = useToken();
    const onExit = () => {
        localStorage.clear();
        setToken('');
        setUserSaved(false);
    }

    return (
        <>
            <header id="header">
                <div className="container">
                    <div id="logo" className="pull-left">
                        <div className="scrollto"><img src={`${URL}/assets/img/logo2.png`} alt="" title="" /></div>
                    </div>
                    <nav id="nav-menu-container">
                        <ul className="nav-menu">
                            <li className="menu-active">
                                <Link className={'textBashBoard'} to="/">
                                    Voltar a página inicial
                                </Link>
                            </li>
                            {userSaved && <li className="menu-active">
                                <Link to='/' onClick={onExit} className={'textBashBoard'}>
                                    Sair
                                </Link>
                            </li>}
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}
export default Header;