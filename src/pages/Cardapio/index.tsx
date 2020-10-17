import React, { useEffect, useState } from 'react';
import './styles.css';
import api from '../../service/api';
import Header from '../../components/Header';
import Modal from 'react-modal';
import { useToasts } from 'react-toast-notifications';
import { useToken } from '../../context/contextMain';
import upload from '../../service/upload';
import { useTitle } from '../../context/contextHeader';
// @ts-ignore
import { mask } from 'remask'

interface Item {
    _id: string,
    description: string,
    name: string,
    data: string,
    anexo: string

}


interface Turma {
    _id: string,
    name: string
}
const del = require('../../assets/delete.png');
const Add = require('../../assets/add-image.png');
const Anexo = require('../../assets/anexo.png');
const Cardapio: React.FC = () => {
    const [result, setResult] = useState<Item[]>([]);
    const { setTitle } = useTitle();
    const [inputName, setInputName] = useState<string>('Selecione um anexo')
    const [modal, setModal] = useState<boolean>(false);
    const [modal2, setModal2] = useState<boolean>(false);
    const [itemUpdate, setItemUpdate] = useState<Item>({} as Item);
    const { token } = useToken();
    const [loadingUpload, setLoadingUpload] = useState<boolean>(true);
    const [loadingUploadUpdate, setLoadingUploadUpdate] = useState<boolean>(true);
    const [anexo, setAnexo] = useState<string>('');
    const [turmas, setTurmas] = useState<Turma[]>([]);

    const { addToast } = useToasts();

    useEffect(() => {
        api.get('/turmas/index').then(res => {
            setTurmas(res.data)
        })
    }, [])

    const [desc, setDesc] = useState<string>('');
    const [name, setName] = useState<string>(String(turmas[0]?.name));
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
    }, [setTitle])
    const onSubmit = () => {
        const a = date.split('/')

        if ((Number(a[0]) >= 32) || (Number(a[0]) === 0)) {
            return addToast(`Insira somente datas válidas (dia)`, {
                appearance: 'info',
                autoDismiss: true,
            })
        }
        if ((Number(a[1]) >= 13) || (Number(a[1]) === 0)) {
            return addToast(`Insira somente datas válidas (mês)`, {
                appearance: 'info',
                autoDismiss: true,
            })
        }
        if (Number(a[2]) < 2020) {
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
        api.post('/cardapio/create', {
            description: String(desc),
            name: String(name),
            data: String(date),
            anexo: String(anexo)

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
        const a = itemUpdate.data.split('/');


        if ((Number(a[0]) >= 32) || (Number(a[0]) === 0)) {
            return addToast(`Insira somente datas válidas (dia)`, {
                appearance: 'info',
                autoDismiss: true,
            })
        }
        if ((Number(a[1]) >= 13) || (Number(a[1]) === 0)) {
            return addToast(`Insira somente datas válidas (mês)`, {
                appearance: 'info',
                autoDismiss: true,
            })
        }
        if (Number(a[2]) < 2020) {
            return addToast(`Insira somente datas válidas (ano)`, {
                appearance: 'info',
                autoDismiss: true,
            })
        }




        const valuess = {

            name: itemUpdate.name,
            description: itemUpdate.description,
            data: itemUpdate.data,
            id: itemUpdate._id,
            anexo: itemUpdate.anexo
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
                setItemUpdate({ ...itemUpdate, anexo: `${res.data.res}` })
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
                addToast(`Cardapio pronta para ser criado!`, {
                    appearance: 'info',
                    autoDismiss: true,
                })
                addToast(`Pressione no botão criar cardapio!`, {
                    appearance: 'info',
                    autoDismiss: true,
                })


            }).catch(res => console.log(res))
        }
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

                                <strong  onClick={(e) => {
                                    e.preventDefault();
                                    window.open(`${res.anexo}`, '_blank')
                                }} className='cbakusrycvskV cursor'>
                                    <img height='70%' src={Anexo} alt="anexo" />
                                </strong>

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
                        <select value={name} onChange={(e) => setName(e.currentTarget.value)} className="form-control" id="exampleFormControlSelect1">
                            {turmas.map(res => {
                                return (
                                    <option  key={res._id}>{res.name}</option>
                                )
                            })}
                        </select>
                        <br />
                        {/* <input className="input-group mb-3" value={name} onChange={(e) => setName(e.target.value)} placeholder="Insira um nome" type="text" /> */}
                        <input className="input-group mb-3" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Insira uma descrição" type="text" />
                        <input className="input-group mb-3" value={date} onChange={(e) => setDate(mask(e.target.value, '99/99/9999'))} placeholder="Insira a data" type="text" />
                        <div className="input-group mb-3">
                            <div className="custom-file">
                                <input type="file" onChange={(e: any) => imgSubmit(e)} className="custom-file-input btbyfhnbfe" id="inputGroupFile01" />
                                <label className="custom-file-label" htmlFor="inputGroupFile01">{inputName}</label>
                            </div>
                        </div>
                    </div>

                    <strong onClick={onSubmit} className='vjanltjviurytrhbnkc' >Criar um cardápio</strong>
                </form>
            </Modal>
            <Modal
                isOpen={modal2}
                onRequestClose={() => setModal2(false)}
                style={customStyles}
                appElement={document.getElementById('root') as HTMLElement}
                contentLabel="Form Modal">
                <div className='carusyuiuytfbnm'>
                    <select value={itemUpdate.name} onChange={(e) => setItemUpdate({ ...itemUpdate, name: e.target.value })} className="form-control" id="exampleFormControlSelect1">
                        {turmas.map(res => {
                            return (
                                <option  key={res._id}>{res.name}</option>
                            )
                        })}
                    </select>
                    <br />
                    <input className="input-group mb-3" value={itemUpdate.name} onChange={(e) => setItemUpdate({ ...itemUpdate, name: e.target.value })} />
                    <input className="input-group mb-3" value={itemUpdate.description} onChange={(e) => setItemUpdate({ ...itemUpdate, description: e.target.value })} />
                    <input className="input-group mb-3" value={itemUpdate.data} onChange={(e) => setItemUpdate({ ...itemUpdate, data: mask(e.target.value, '99/99/9999') })} />
                    <div className="input-group mb-3">
                        <div className="custom-file">
                            <input type="file" onChange={(e: any) => imgUpdate(e)} className="custom-file-input btbyfhnbfe" id="inputGroupFile01" />
                            <label className="custom-file-label" htmlFor="inputGroupFile01">{inputName}</label>
                        </div>
                    </div>
                    <strong onClick={onUpdate} className='vjanltjviurytrhbnkc' >Atualizar Dados</strong>
                </div>
            </Modal>
            <div onClick={() => setModal(true)} className="float">
                <img height='50%' src={Add} alt="" />
            </div>
        </>
    )
}
export default Cardapio;