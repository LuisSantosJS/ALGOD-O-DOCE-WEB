import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../service/api';
import { useToasts } from 'react-toast-notifications';
import { useToken } from '../../context/contextMain';
import Modal from 'react-modal';
import { useTitle } from '../../context/contextHeader'
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
    const [newPassoword, setNewPassword] = useState<string>('');
    const [modal2, setModal2] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [ItemUpdate, setItemUpdate] = useState<Item>({} as Item);
    const [code, setCode] = useState<string>('');
    const { token } = useToken();
    const { addToast } = useToasts();
    const { setTitle } = useTitle();
    useEffect(() => {
        api.get('/users/index').then(res => {
            setResult(res.data);
        })
    }, []);
    useEffect(() => {
        setTitle('Usuários');
        return () => {
            setTitle('Admin')
        }
    }, [])
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
        }, config).then((res) => {
            setResult([...result, res.data])
            setModal(false)
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


    const onUpdate = () => {
        const valuess = {

            name: ItemUpdate.name,
            email: ItemUpdate.email,
            password: newPassoword,
        }
        const config = {
            headers: {
                'x-access-token': `${token}`
            }
        }
        api.post('/users/update', valuess, config).then(res => {
            var news = result.filter(res => res._id !== ItemUpdate._id);
            setResult([...news, ItemUpdate]);
            setModal2(false);
            return addToast(`Sucesso`, {
                appearance: 'success',
                autoDismiss: true,
            })
        }).catch(() => {
            setModal2(false);
            return addToast(`Ocorreu um erro!`, {
                appearance: 'error',
                autoDismiss: true,
            })
        })
    }

    return (
        <>
            <Header />
            <main id="main">
                <div className="viewContainercsrS">
                    <div className="spacingviewbash" />

                    {result.map(res => {
                        return (
                            <React.Fragment key={res._id}>
                                <div className='vtyuioiuytr'  >
                                    <div className='carajhghjkcasrv cursor' onClick={() => {
                                        setItemUpdate(res);
                                        setModal2(true)
                                    }}>
                                        <h2 className='vstrert'>{res.name}</h2>
                                        <h5 className='vstrert'>{res.email}</h5>
                                    </div>

                                    <img src={del} onClick={() => onDelete(res._id)} className='as' height='40' alt="delete" />

                                </div>
                                <br />
                                <br />
                            </React.Fragment>
                        )
                    })}

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
                        <input className={'inpstshome'} value={name} onChange={(e) => setName(e.target.value)} placeholder="Insira um nome" type="text" />
                        <input className={'inpstshome'} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Insira um email" type="text" />
                        <input className={'inpstshome'} value={code} onChange={(e) => setCode(e.target.value)} placeholder="Insira uma senha" type="text" />
                    </div>
                    <strong onClick={onSubmit} className='vjanltjviurytrhbnkc' >Criar usuário</strong>
                </form>
            </Modal>


            <Modal
                isOpen={modal2}
                onRequestClose={() => setModal2(false)}
                style={customStyles}
                appElement={document.getElementById('root') as HTMLElement}
                contentLabel="Form Modal">
                <div className='carusyuiuytfbnm'>
                    <input value={ItemUpdate.name} onChange={(e) => setItemUpdate({ ...ItemUpdate, name: e.target.value })} />
                    <input value={newPassoword} onChange={(e) => setNewPassword(e.target.value)} placeholder={'Nova senha'} />
                    <strong onClick={onUpdate} className='vjanltjviurytrhbnkc' >Atualizar Usuário</strong>
                </div>
            </Modal>
            <div onClick={() => setModal(true)} className="float">
                <img height='50%' src={Add} alt="" />
            </div>
        </>
    )
}
export default Professores;