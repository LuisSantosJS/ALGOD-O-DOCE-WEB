import React, { useState } from 'react';
import api from '../../service/api';
import { useToasts } from 'react-toast-notifications';
import { useToken, useUserSaved, useUserEmail, useUserPassword } from '../../context/contextMain';
import './styles.css'
const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { setUserEmail } = useUserEmail();
    const { setUserPassword } = useUserPassword();
    const { addToast } = useToasts();
    const { setToken } = useToken();
    const { setUserSaved } = useUserSaved();
    const onSubmit = (e: any) => {
        e.preventDefault();
        api.post('/users/login', {
            email: email.toLowerCase(),
            password: password
        }).then(res => {
            if (res.data.message === 'error') {
                return addToast(`${res.data.res}`, {
                    appearance: 'error',
                    autoDismiss: true,
                })
            }
            setUserPassword(password);
            setUserEmail(email);
            setToken(res.data.token);
            setUserSaved(true);
            return addToast(`${res.data.res}`, {
                appearance: 'success',
                autoDismiss: true,
            })
        }).catch(res => {
            return addToast(`Ocorreu um erro!`, {
                appearance: 'error',
                autoDismiss: true,
            })
        });
    }
    return (
        <>
            <div className="viewContainer">
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <div className="espacing"></div>
                        <form onSubmit={(e) => onSubmit(e)}>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" id="login" className="fadeIn second inputs" name="login" placeholder="email" />
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="fadeIn third inputs" name="login" placeholder="password" />
                            <input type="submit" className="fadeIn fourth submits" value="Log In" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;