import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../service/api';
import { useToasts } from 'react-toast-notifications';
import { useToken } from '../../context/contextMain';
import Modal from 'react-modal';
import './styles.css';
interface Item {
    _id: string,
    name: string,
    email: string,
}
const del = require('../../assets/delete.png');
const Add = require('../../assets/add-image.png');
const Professores: React.FC = () => {
    const [result, setResult] = useState<Item[]>([]);
    const [modal, setModal] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [code, setCode] = useState<string>('');
    const { token } = useToken();
    const { addToast } = useToasts();
    useEffect(() => {
        api.get('/users/index').then(res => {
            setResult(res.data);
        })
    }, []);
    const customStyles = {

        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };
    const onSubmit = () => {
        const config = {
            headers: {
                'x-access-token': `${token}`
            }
        }
        api.post('/users/create', {
            email,
            password: code,
            name
        },config).then((res) => {
            setResult([...result, res.data])
            setModal(true)
        })
    }

    const onDelete = (id: string) => {
        const config = {
            headers: {
                'x-access-token': `${token}`
            }
        }
        api.post('/users/delete', { id: id }, config).then(res => {
            if (res.data.message === 'error') {
                addToast(`Ocorreu um erro!`, {
                    appearance: 'error',
                    autoDismiss: true,
                })
            } else {
                const valor = result.filter(res => res._id !== id);
                setResult(valor);

                addToast(`Sucesso`, {
                    appearance: 'success',
                    autoDismiss: true,
                })

            }
        })
        setModal(false);

    }

    return (
        <>
            <Header />
            <main id="main">
                <div className="viewContainercsrS">
                    <div className="spacingviewbash" />
                    <ul>
                        {result.map(res => {
                            return (
                                <React.Fragment key={res._id}>
                                    <div className='abatdyuterty'  >
                                        <div className='carajhghjkcasrv' >
                                            <h3 className='vstrert'>{res.name}</h3>
                                            <h6 className='vstrert'>{res.email}</h6>
                                        </div>

                                        <img src={del} onClick={() => onDelete(res._id)} className='as' height='40' alt="delete" />

                                    </div>
                                    <br />
                                    <br />
                                </React.Fragment>
                            )
                        })}
                    </ul>
                </div>
            </main>
            <Modal
                isOpen={modal}
                onRequestClose={() => setModal(false)}
                style={customStyles}
                appElement={document.getElementById('root') as HTMLElement}
                contentLabel="Form Modal">
                <form onSubmit={onSubmit} className='formsss' encType='multipart/form-data'>
                    <div className='rowss' >
                        {/* <label htmlFor="lname"> Descrição</label> */}
                        <input className={'inpstshome'} value={name} onChange={(e) => setName(e.target.value)} placeholder="Insira um nome˜" type="text" />
                        <input className={'inpstshome'} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Insira um email" type="text" />
                        <input className={'inpstshome'} value={code} onChange={(e) => setCode(e.target.value)} placeholder="Insira uma senha" type="text" />
                    </div>
                    <strong onClick={onSubmit} className='vjanltjviurytrhbnkc' >Fazer Upload</strong>
                </form>
            </Modal>
            <div onClick={() => setModal(true)} className="float">
                <img height='50%' src={Add} alt="" />
            </div>
        </>
    )
}
export default Professores;