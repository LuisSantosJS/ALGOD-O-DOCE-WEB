import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../service/api';
import { useToasts } from 'react-toast-notifications';
import upload, { UPLOAD_URL } from '../../service/upload';
import './styles.css'
import Modal from 'react-modal';
import { useTitle } from '../../context/contextHeader'
import { useToken } from '../../context/contextMain';
interface Item {
    _id: string,
    description: string,
    imageURL: string,
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
const customStyles2 = {

    content: {
        top: '50%',
        left: '50%',
        width: '40%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
const del = require('../../assets/delete.png');
const Add = require('../../assets/add-image.png');
const Galery: React.FC = () => {
    const [result, setResult] = useState<Item[]>([]);
    const { token } = useToken();
    const { addToast } = useToasts();
    const { setTitle } = useTitle();
    const [modal, setModal] = useState<boolean>(false);
    const [modal2, setModal2] = useState<boolean>(false);
    const [anexo, setAnexo] = useState<string>('');
    const [delItem, setDelItem] = useState<Item>({} as Item);
    const [loadingUpload, setLoadingUpload] = useState<boolean>(true);
    const [inputName, setInputName] = useState<string>('Selecionar foto');
    const [desc, setDesc] = useState<string>('');
    useEffect(() => {
        const loadImaes = () => {
            api.get('/galeria/index').then(ress => {
                setResult(ress.data);
            })
        }
        loadImaes();

    }, []);

    useEffect(()=>{
        setTitle('Galeria');
        return ()=>{
            setTitle('Admin');
        }
    },[])
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
                addToast(`Imagem pronta para ser finalizada!`, {
                    appearance: 'info',
                    autoDismiss: true,
                })
                addToast(`Pressione o botão enviar imagem!`, {
                    appearance: 'info',
                    autoDismiss: true,
                })
            }).catch(res => console.log(res))
        }
    }
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
        api.post('/galeria/create', {
            description: String(desc),
            imageURL: String(anexo)
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

    const onDelete = () => {
        const config = {
            headers: {
                'x-access-token': `${token}`
            }
        }
        api.post('/galeria/delete', { id: delItem._id }, config).then(res => {
            if (res.data.message === 'error') {
                addToast(`Ocorreu um erro!`, {
                    appearance: 'error',
                    autoDismiss: true,
                })
            } else {
                const valor = result.filter(res => res._id !== delItem._id);
                setResult(valor);

                addToast(`Sucesso`, {
                    appearance: 'success',
                    autoDismiss: true,
                })

            }
        })
        setModal2(false);

    }
    return (
        <>
            <Header />
            <main id="main">



                <div className="viewContainercsr">
                    <div className="spacingviewbash" />
                    {result.map(res => {
                        return (
                            <div className='asiyvgoclvyosueyt' key={res._id}>

                                <img className='asvuhaiouaoibsivv' onClick={() => {
                                    setDelItem(res);
                                    setModal2(true);
                                }} src={`${res.imageURL}`} alt="" />
                            </div>
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
                        <input className={'inpstshome'} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Insira uma descrição" type="text" id="lname" name="lname" />
                    </div>
                    <div className="input-group mb-3">
                        <div className="custom-file">
                            <input type="file" onChange={(e: any) => imgSubmit(e)} className="custom-file-input btbyfhnbfe" id="inputGroupFile01" />
                            <label className="custom-file-label" htmlFor="inputGroupFile01">{inputName}</label>
                        </div>
                    </div>
                    <strong onClick={onSubmit} className='vjanltjviurytrhbnkc' >Enviar Imagen</strong>
                </form>
            </Modal>

            <Modal
                isOpen={modal2}
                onRequestClose={() => setModal2(false)}
                style={customStyles2}
                appElement={document.getElementById('root') as HTMLElement}
                contentLabel="Form Modal">
                <div className='luigiokio'>
                    <img className='asvuhaiouaoibsivv2' src={`${delItem.imageURL}`} alt="" />
                    <img src={del} onClick={onDelete} className='as' height='40' alt="delete" />
                </div>

            </Modal>


            <div onClick={() => setModal(true)} className="float">
                <img height='50%' src={Add} alt="" />
            </div>
        </>
    )
}
export default Galery;