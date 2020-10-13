import React, { useEffect, useState } from 'react';
import './styles.css';
import api, { URL } from '../../service/api';
import Header from '../../components/Header';
import Modal from 'react-modal';
import { useToasts } from 'react-toast-notifications';
import { useToken } from '../../context/contextMain';
// @ts-ignore
import { mask } from 'remask'
import upload, { UPLOAD_URL } from '../../service/upload'
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
    const [modal, setModal] = useState<boolean>(false);
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

    return (
        <>
            <Header />
            <main id="main">
                <div className="spacingviewbash" />
                {result.map(res => {
                    return (
                        <React.Fragment key={res._id}>
                            <div className='vauibvusir' >
                                <div className='cbakusrycvskV'>
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
            <div onClick={() => setModal(true)} className="float">
                <img height='50%' src={Add} alt="" />
            </div>
        </>
    )
}
export default Cardapio;