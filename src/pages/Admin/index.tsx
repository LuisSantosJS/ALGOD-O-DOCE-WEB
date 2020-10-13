import React, { useEffect } from 'react';
import Header from '../../components/Header';
import './styles.css';
import { useUserSaved } from '../../context/contextMain';
import Bashboard from '../../components/Bashboard';
import Login from '../../components/Login';

const Admin: React.FC = () => {
    const { userSaved } = useUserSaved();
    useEffect(() => { }, [userSaved])
    return (
        <>
            <Header />
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