import React from 'react';
import { URL } from '../../service/api';
import { Link } from 'react-router-dom';
import { useUserSaved, useToken } from '../../context/contextMain';
import { useTitle } from '../../context/contextHeader';
import './styles.css'
const Header: React.FC = () => {
    const { userSaved, setUserSaved } = useUserSaved();
    const { setToken } = useToken();
    const { title } = useTitle();
    const onExit = () => {
        localStorage.setItem('userSaved', 'false')
        setToken('');
        setUserSaved(false);
    }

    return (
        <>
            <header id="header">
                <div className="container">
                    <div id="logo" className="pull-left">
                        <div className="scrollto">
                            <img src={`${URL}/assets/img/logo2.png`} alt="" title="" />
                            <br />
                            <div className="eceegrere">{title}</div>
                        </div>
                    </div>
                    <nav id="nav-menu-container">
                        <ul className="nav-menu">
                            <li>
                                <Link className={'textBashBoard'} to="/">
                                    Voltar a página inicial
                                </Link>
                            </li>
                            {userSaved && <>
                                <li>
                                <Link className={'textBashBoard'} to="/admin">
                                    Admin
                                </Link>
                                </li>
                                <li>
                                    <Link to='/' onClick={(e) => {
                                        onExit();
                                        e.preventDefault()
                                    }} className={'textBashBoard'}>
                                        Sair
                                </Link>
                                </li>
                            </>
                            }
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}
export default Header;