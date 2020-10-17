import React, { useEffect, useState } from 'react';
import './styles.css';
import api from '../../service/api';
import Header from '../../components/Header';
import { useTitle } from '../../context/contextHeader';
import Modal from 'react-modal';
import { useToasts } from 'react-toast-notifications';
import { useToken } from '../../context/contextMain';

// @ts-ignore
import { mask } from 'remask'
import upload  from '../../service/upload'
interface Item {
    _id: string,
    description: string,
    imageURL: string,
    name: string,
    initialDate: string,
    endDate: string
}
const del = require('../../assets/delete.png');
const Add = require('../../assets/add-image.png');
const Atividades: React.FC = () => {


    const { setTitle } = useTitle();
    const [result, setResult] = useState<Item[]>([]);
    const [modal, setModal] = useState<boolean>(false);
    const [modal2, setModal2] = useState<boolean>(false);
    const { token } = useToken();
    const [itemUpdate, setItemUpdate] = useState<Item>({} as Item);
    const [anexo, setAnexo] = useState<string>('');
    const { addToast } = useToasts();
    const [loadingUpload, setLoadingUpload] = useState<boolean>(true);
    const [loadingUploadUpdate, setLoadingUploadUpdate] = useState<boolean>(true);
    const [inputName, setInputName] = useState<string>('Selecionar foto');
    const [desc, setDesc] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [initialDate, setInitialDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    useEffect(() => {
        setTitle('Atividades');
        return () => {
            setTitle('Admin');
        }
    }, [setTitle])

    const onUpdate = () => {
        const a = itemUpdate.endDate.split('/')
        const b = itemUpdate.initialDate.split('/')
        if ((Number(a[0]) >= 32) || (Number(b[0]) >= 32) || (Number(a[0]) === 0) || (Number(b[0]) === 0)) {
            return addToast(`Insira somente datas válidas (dia)`, {
                appearance: 'info',
                autoDismiss: true,
            })
        }
        if ((Number(a[1]) >= 13) || (Number(b[1]) >= 13) || (Number(a[1]) === 0) || (Number(b[1]) === 0)) {
            return addToast(`Insira somente datas válidas (mês)`, {
                appearance: 'info',
                autoDismiss: true,
            })
        }
        if ((Number(a[2]) < 2020) || (Number(b[1]) < 2020)) {
            return addToast(`Insira somente datas válidas (ano)`, {
                appearance: 'info',
                autoDismiss: true,
            })
        }
        if (loadingUploadUpdate) {
            return addToast(`Aguarde! fazendo upload da imagem...`, {
                appearance: 'info',
                autoDismiss: true,
            })
        }


        const valuess = {
            description: itemUpdate.description,
            name: itemUpdate.name,
            imageURL: itemUpdate.imageURL,
            initialDate: itemUpdate.initialDate,
            endDate: itemUpdate.endDate,
            id: itemUpdate._id
        }
        const config = {
            headers: {
                'x-access-token': `${token}`
            }
        }
        api.post('/atividade/update', valuess, config).then(res => {
            if (res.data.message === 'error') {
                setModal(false);
                return addToast(`Ocorreu um erro!`, {
                    appearance: 'error',
                    autoDismiss: true,
                })
            } else {
                var news = result.filter(res => res._id !== itemUpdate._id);
                setResult([...news, itemUpdate]);
                setModal(false);
                return addToast(`Sucesso`, {
                    appearance: 'success',
                    autoDismiss: true,
                })
            }
        }).catch(() => {
            setModal(false);
            return addToast(`Ocorreu um erro!`, {
                appearance: 'error',
                autoDismiss: true,
            })
        })
    }

    useEffect(() => {
        api.get('/atividade/index').then(res => {
            setResult(res.data);
        })
    }, []);

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
                setAnexo(`${res.data.res}`);
                // console.log('image upload:', `${UPLOAD_URL}${res.data.res}`);
                setLoadingUpload(false);
                addToast(`Atividade pronta para ser criada!`, {
                    appearance: 'info',
                    autoDismiss: true,
                })
                addToast(`Pressione no botão criar atividade`, {
                    appearance: 'info',
                    autoDismiss: true,
                })


            }).catch(res => console.log(res))
        }
    }

    const imgUpdate = (e: any) => {
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
                setItemUpdate({ ...itemUpdate, imageURL: `${res.data.res}` })
                //setAnexo(`${UPLOAD_URL}${res.data.res}`);
                // console.log('image upload:', `${UPLOAD_URL}${res.data.res}`);
                setLoadingUploadUpdate(false);
                addToast(`Atividade pronta para atualizada!`, {
                    appearance: 'info',
                    autoDismiss: true,
                })
                addToast(`Pressione no botão atualizar dados!`, {
                    appearance: 'info',
                    autoDismiss: true,
                })

            }).catch(res => console.log(res))
        }
    }
    const onSubmit = () => {
        const a = endDate.split('/')
        const b = initialDate.split('/')
        if ((Number(a[0]) >= 32) || (Number(b[0]) >= 32) || (Number(a[0]) === 0) || (Number(b[0]) === 0)) {
            return addToast(`Insira somente datas válidas (dia)`, {
                appearance: 'info',
                autoDismiss: true,
            })
        }
        if ((Number(a[1]) >= 13) || (Number(b[1]) >= 13) || (Number(a[1]) === 0) || (Number(b[1]) === 0)) {
            return addToast(`Insira somente datas válidas (mês)`, {
                appearance: 'info',
                autoDismiss: true,
            })
        }
        if ((Number(a[2]) < 2020) || (Number(b[2]) < 2020)) {
            return addToast(`Insira somente datas válidas (ano)`, {
                appearance: 'info',
                autoDismiss: true,
            })
        }

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
        api.post('/atividade/create', {
            description: String(desc),
            imageURL: String(anexo),
            name: String(name),
            initialDate: String(initialDate),
            endDate: String(endDate)
        }, config).then(res => {
            console.log(res.data)
            const data: Item = res.data;
            setResult([...result, data]);
            setModal2(false);
            addToast(`Atividade criada com successo!`, {
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
        api.post('/atividade/delete', { id: id }, config).then(res => {
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
                <div className="viewContainercsrvu6">
                    {result.map(res => {
                        return (
                            <React.Fragment key={res._id}>
                                <div className='vtyuioiuytr'  >
                                    <img src={res.imageURL} className={'agsbsevaw'} alt={res.description} />
                                    <div className='cbakusrycvskV avasbruaivausrvr cursor' onClick={() => {
                                        setModal(true);
                                        setItemUpdate(res);
                                    }}>
                                        <h2 className='fnvisunacinsprvs'>{res.name}</h2>
                                        <h5 className='fnvisunacinsprvs'>{res.description}</h5>
                                        <h6 className='fnvisunacinsprvs'>{res.initialDate} - {res.endDate}</h6>
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
                isOpen={modal2}
                onRequestClose={() => setModal2(false)}
                style={customStyles}
                appElement={document.getElementById('root') as HTMLElement}
                contentLabel="Form Modal">
                <form onSubmit={onSubmit} className='formsss' encType='multipart/form-data'>
                    <div className='rowss' >
                        {/* <label htmlFor="lname"> Descrição</label> */}
                        <input className={'inpstshome'} value={name} onChange={(e) => setName(e.target.value)} placeholder="Insira um nome" type="text" />
                        <input className={'inpstshome'} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Insira uma descrição" type="text" />
                        <input className={'inpstshome'} value={initialDate} onChange={(e) => setInitialDate(mask(e.target.value, '99/99/9999'))} placeholder="Insira a data de inicio" type="text" />
                        <input className={'inpstshome'} value={endDate} onChange={(e) => setEndDate(mask(e.target.value, '99/99/9999'))} placeholder="Insira a data final" type="text" />
                    </div>
                    <div className="input-group mb-3">
                        <div className="custom-file">
                            <input type="file" onChange={(e: any) => imgSubmit(e)} className="custom-file-input btbyfhnbfe" id="inputGroupFile01" />
                            <label className="custom-file-label" htmlFor="inputGroupFile01">{inputName}</label>
                        </div>
                    </div>
                    <strong onClick={onSubmit} className='vjanltjviurytrhbnkc' >Adicionar Atividade</strong>
                </form>
            </Modal>


            <Modal
                isOpen={modal}
                onRequestClose={() => setModal(false)}
                style={customStyles}
                appElement={document.getElementById('root') as HTMLElement}
                contentLabel="Form Modal">
                <div className='vtyuioiuytr'  >
                    <img src={itemUpdate.imageURL} className={'agsbsevaw'} alt={itemUpdate.description} />
                    <div className='avasbruaivausrvr'>
                        <input className="input-group mb-3" value={itemUpdate.name} onChange={(e) => setItemUpdate({ ...itemUpdate, name: e.target.value })} />

                        <input className="input-group mb-3" value={itemUpdate.description} onChange={(e) => setItemUpdate({ ...itemUpdate, description: e.target.value })} />

                        <input className="input-group mb-3" value={itemUpdate.initialDate} onChange={(e) => setItemUpdate({ ...itemUpdate, initialDate: e.target.value })} />

                        <input className="input-group mb-3" value={itemUpdate.endDate} onChange={(e) => setItemUpdate({ ...itemUpdate, endDate: e.target.value })} />

                        <div className="input-group mb-3">
                            <div className="custom-file">
                                <input type="file" onChange={(e: any) => imgUpdate(e)} className="custom-file-input btbyfhnbfe" id="inputGroupFile01" />
                                <label className="custom-file-label" htmlFor="inputGroupFile01">{inputName}</label>
                            </div>
                        </div>

                        <strong onClick={onUpdate} className='vjanltjviurytrhbnkc'>Atualizar Dados</strong>
                    </div>

                </div>

            </Modal>


            <div onClick={() => setModal2(true)} className="float">
                <img height='50%' src={Add} alt="" />
            </div>
        </>
    )
}
export default Atividades;