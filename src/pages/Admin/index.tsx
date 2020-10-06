import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { URL } from '../../service/api';
import './styles.css';
import { useUserSaved } from '../../context/contextMain';
import Bashboard from '../../components/Bashboard';
import Login from '../../components/Login';

const Admin: React.FC = () => {
    const { userSaved } = useUserSaved();
    useEffect(() => { }, [userSaved])
    return (
        <>
            <header id="header">
                <div className="container">
                    <div id="logo" className="pull-left">
                        <a className="scrollto"><img src={`${URL}/assets/img/logo2.png`} alt="" title="" /></a>
                    </div>
                    <nav id="nav-menu-container">
                        <ul className="nav-menu">
                            <li className="menu-active">
                                <Link className={'textBashBoard'} to="/">
                                    Voltar a página inicial
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main id="main">
                {userSaved ?
                    <Bashboard />
                    :
                    <Login />}
            </main>

        </>
    )
}

export default Admin;