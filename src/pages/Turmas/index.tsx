import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import './styles.css';
import { useToken } from '../../context/contextMain';
import Modal from 'react-modal';
import { useToasts } from 'react-toast-notifications';
import api from '../../service/api';
import upload, { UPLOAD_URL } from '../../service/upload';

interface Item {
    _id: string,
    name: string,
    description: string,
    imageURL: string,
}
const del = require('../../assets/delete.png');
const Add = require('../../assets/add-image.png');
const Turmas: React.FC = () => {
    const [result, setResult] = useState<Item[]>([]);
    const [modal, setModal] = useState<boolean>(false);
    const [modal2, setModal2] = useState<boolean>(false);
    const [itemUpdate, setItemUpdate] = useState<Item>({} as Item)
    const [desc, setDesc] = useState<string>('');
    const { token } = useToken();
    const [anexo, setAnexo] = useState<string>('');
    const { addToast } = useToasts();
    const [loadingUpload, setLoadingUpload] = useState<boolean>(true);
    const [name, setName] = useState<string>('');
    const [inputName, setInputName] = useState<string>('Selecione uma imagem');
    useEffect(() => {
        api.get('/turmas/index').then(res => {
            setResult(res.data);
        })
    }, [])
    const onSubmit = () => {
        if (loadingUpload) {
            return addToast(`Aguarde! fazendo upload da imagem...`, {
                appearance: 'info',
                autoDismiss: true,
            })
        }
        const config = {
            headers: {
                'x-access-token': `${token}`
            }
        }
        api.post('/turmas/create', {
            description: String(desc),
            imageURL: String(anexo),
            name: String(name)
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
    const imgSubmit = (e: any) => {
        if (String(e.target.files[0].name).length !== 0) {
            setInputName(e.target.files[0].name);
            let formData = new FormData();
            // console.log('image:', e.target.files[0])
            formData.append('anexo', e.target.files[0]);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            upload.post('/upload/anexo', formData, config).then(res => {
                setAnexo(`${UPLOAD_URL}${res.data.res}`);
                // console.log('image upload:', `${UPLOAD_URL}${res.data.res}`);
                setLoadingUpload(false);
                addToast(`Fomulário pronto para ser finalizado!`, {
                    appearance: 'info',
                    autoDismiss: true,
                })
            }).catch(res => console.log(res))
        }
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
            description: itemUpdate.description,
            name: itemUpdate.name,
            imageURL: itemUpdate.imageURL,
            id: itemUpdate._id
        }
        const config = {
            headers: {
                'x-access-token': `${token}`
            }
        }
        api.post('/turmas/update', valuess, config).then(res => {
            if (res.data.message === 'error') {
                setModal2(false);
                return addToast(`Ocorreu um erro!`, {
                    appearance: 'error',
                    autoDismiss: true,
                })
            } else {
                var news = result.filter(res => res._id !== itemUpdate._id);
                setResult([...news, itemUpdate]);
                setModal2(false);
                return addToast(`Sucesso`, {
                    appearance: 'success',
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
    const onDelete = (id: string) => {
        const config = {
            headers: {
                'x-access-token': `${token}`
            }
        }
        api.post('/turmas/delete', { id: id }, config).then(res => {
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
    return (
        <>
            <Header />
            <main id="main">
                <div className="viewContainercsrvu6">
                    <div className="spacingviewbash" />
                    {result.map(res => {
                        return (
                            <React.Fragment key={res._id}>
                                <div className='vauibvusir' >
                                    <img src={res.imageURL} height='95%' alt={res.description} />
                                    <div className='cbakusrycvskV cursor' onClick={() => {
                                        setItemUpdate(res);
                                        setModal2(true)
                                    }}>
                                        <h2 className='fnvisunacinsprvs'>{res.name}</h2>
                                        <h5 className='fnvisunacinsprvs'>{res.description}</h5>
                                    </div>
                                    <img onClick={() => onDelete(res._id)} className='avptiuytdefghjytr' height='50' src={del} alt="" />
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
                        <input className={'inpstshome'} value={name} onChange={(e) => setName(e.target.value)} placeholder="Insira um nome" type="text" id="lname" name="lname" />
                        <input className={'inpstshome'} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Insira uma descrição" type="text" id="lname" name="lname" />
                    </div>
                    <div className="input-group mb-3">
                        <div className="custom-file">
                            <input type="file" onChange={(e: any) => imgSubmit(e)} className="custom-file-input btbyfhnbfe" id="inputGroupFile01" />
                            <label className="custom-file-label" htmlFor="inputGroupFile01">{inputName}</label>
                        </div>
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
                <div className='vauibvusir' >
                    <img src={itemUpdate.imageURL} height='95%' alt={itemUpdate.description} />
                    <div className='cbakusrycvskV'>
                        <input value={itemUpdate.name} onChange={(e) => setItemUpdate({ ...itemUpdate, name: e.target.value })} className='fnvisunacinsprvs' />
                        <br />
                        <input value={itemUpdate.description} onChange={(e) => setItemUpdate({ ...itemUpdate, description: e.target.value })} className='fnvisunacinsprvs' />
                        <br />
                        <strong onClick={onUpdate} className='sartbgfrgregefgfdsd'>Atualizar Dados</strong>
                    </div>
                    <img className='avptiuytdefghjytr cursornone' height='50' src={del} alt="" />
                </div>
            </Modal>

            <div onClick={() => setModal(true)} className="float">
                <img height='50%' src={Add} alt="" />
            </div>
        </>
    )
}

export default Turmas;