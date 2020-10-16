import React, { useEffect, useState } from 'react';
import './styles.css';
import api from '../../service/api';
import Header from '../../components/Header';
import Modal from 'react-modal';
import { useToasts } from 'react-toast-notifications';
import { useToken } from '../../context/contextMain';
import { useTitle } from '../../context/contextHeader'
// @ts-ignore
import { mask } from 'remask'

interface Item {
    _id: string,
    description: string,
    name: string,
    data: string,

}
const del = require('../../assets/delete.png');
const Add = require('../../assets/add-image.png');
const Cardapio: React.FC = () => {
    const [result, setResult] = useState<Item[]>([]);
    const { setTitle } = useTitle();
    const [modal, setModal] = useState<boolean>(false);
    const [modal2, setModal2] = useState<boolean>(false);
    const [itemUpdate, setItemUpdate] = useState<Item>({} as Item);
    const { token } = useToken();

    const { addToast } = useToasts();

    const [desc, setDesc] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [date, setDate] = useState<string>('');

    useEffect(() => {
        api.get('/cardapio/index').then(res => {
            setResult(res.data);
        })
    }, []);
    useEffect(() => {
        setTitle('Cardápio');
        return () => {
            setTitle('Admin');
        }
    }, [])
    const onSubmit = () => {
        const config = {
            headers: {
                'x-access-token': `${token}`
            }
        }
        api.post('/cardapio/create', {
            description: String(desc),
            name: String(name),
            data: String(date),

        }, config).then(res => {
            console.log(res.data)
            const data: Item = res.data;
            setResult([...result, data]);
            setModal(false);
            addToast(`Imagem enviada com sucesso!`, {
                appearance: 'success',
                autoDismiss: true,
            })
        }).catch(() => {
            addToast(`Ocorreu um erro!`, {
                appearance: 'error',
                autoDismiss: true,
            })
        })

    }

    const onDelete = (id: string) => {
        const config = {
            headers: {
                'x-access-token': `${token}`
            }
        }
        api.post('/cardapio/delete', { id: id }, config).then(res => {
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


    }
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

    const onUpdate = () => {
        const valuess = {

            name: itemUpdate.name,
            description: itemUpdate.description,
            data: itemUpdate.data,
            id: itemUpdate._id
        }
        const config = {
            headers: {
                'x-access-token': `${token}`
            }
        }
        api.post('/cardapio/update', valuess, config).then(res => {
            var news = result.filter(res => res._id !== itemUpdate._id);
            setResult([...news, itemUpdate]);
            setModal2(false);
            if (res.data.message === 'success') {
                return addToast(`Sucesso`, {
                    appearance: 'success',
                    autoDismiss: true,
                })
            } else {
                console.log(res.data)
                return addToast(`Ocorreu um erro!`, {
                    appearance: 'error',
                    autoDismiss: true,
                })
            }

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
                <div className="spacingviewbash" />
                {result.map(res => {
                    return (
                        <React.Fragment key={res._id}>
                            <div className='vauibvusir' >
                                <div className='cbakusrycvskV' />
                                <div className='cbakusrycvskV cursor' onClick={() => {
                                    setItemUpdate(res);
                                    setModal2(true);
                                }}>
                                    <h2 className='fnvisunacinsprvs'>{res.name}</h2>
                                    <h5 className='fnvisunacinsprvs'>{res.description}</h5>
                                    <h6 className='fnvisunacinsprvs'>{res.data}</h6>
                                </div>
                                <img onClick={() => onDelete(res._id)} className='avptiuytdefghjytr' height='50' src={del} alt="" />
                            </div>
                            <br />
                            <br />
                        </React.Fragment>
                    )
                })}
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
                        <input className={'inpstshome'} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Insira uma descrição" type="text" />
                        <input className={'inpstshome'} value={date} onChange={(e) => setDate(mask(e.target.value, '99/99/9999'))} placeholder="Insira a data" type="text" />
                    </div>

                    <strong onClick={onSubmit} className='vjanltjviurytrhbnkc' >Fazer Upload</strong>
                </form>
            </Modal>
            <Modal
                isOpen={modal2}
                onRequestClose={() => setModal2(false)}
                style={customStyles}
                appElement={document.getElementById('root') as HTMLElement}
                contentLabel="Form Modal">
                <div className='carusyuiuytfbnm'>
                    <input value={itemUpdate.name} onChange={(e) => setItemUpdate({ ...itemUpdate, name: e.target.value })} />
                    <input value={itemUpdate.description} onChange={(e) => setItemUpdate({ ...itemUpdate, description: e.target.value })} />
                    <input value={itemUpdate.data} onChange={(e) => setItemUpdate({ ...itemUpdate, data: e.target.value })} />
                    <strong onClick={onUpdate} className='vjanltjviurytrhbnkc' >Atualizar</strong>
                </div>
            </Modal>
            <div onClick={() => setModal(true)} className="float">
                <img height='50%' src={Add} alt="" />
            </div>
        </>
    )
}
export default Cardapio;