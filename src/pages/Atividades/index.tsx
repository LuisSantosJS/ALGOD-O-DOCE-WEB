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
import { urltoFile } from '../../utils/fileToBase64';

interface Item {
    _id: string,
    description: string,
    imageURL: string,
    name: string,
    initialDate: string,
    endDate: string
}

const Add = require('../../assets/add-image.png');
const Atividades: React.FC<any> = () => {
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
    const [inputName, setInputName] = useState<string>('Selecionar arquivo');
    const [desc, setDesc] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [initialDate, setInitialDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [fileType, setFileType] = useState<string>('');
    

    useEffect(() => {
        setTitle('Atividades');
        return () => {
            setTitle('Admin');
        }
    }, [setTitle])

    const onUpdate = () => {
        if (loadingUploadUpdate) {
            return addToast(`Aguarde! fazendo upload da imagem...`, {
                appearance: 'info',
                autoDismiss: true,
            })
        }
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
        if ((Number(a[2]) < 2020) || (Number(b[2]) < 2020)) {
            return addToast(`Insira somente datas válidas (ano)`, {
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

    const getIconFromFileType = () => {
        let iconType = "";
        if (fileType === '') iconType = 'fa fa-file-o fa-3x';
        if (fileType.indexOf('word') > -1) iconType = 'fa fa-file-word-o fa-3x';
        if (fileType.indexOf('pdf') > -1) iconType ='fa fa-file-pdf-o fa-3x';
        return iconType;
    }

    const checkIfFileExists = (fileData : any) =>  {
        let checkStatus = "";
        if (!fileData) {
            checkStatus = "Sem arquivo anexado !";
            return;
        } else {
            checkStatus = "Arquivo já em anexo";
        }
        
        urltoFile(fileData, 'arquivo').then((file : any) => {
            setFileType(file.type);            
        });
        return checkStatus;
    }

    const imgSubmit = (e: any) => {
        if (String(e.target.files[0].name).length !== 0) {
            setInputName(e.target.files[0].name);
            var reader = new FileReader();
            var file = e.target.files[0];
            reader.onload = function (upload: any) {
                setAnexo(String(upload.target.result));
                setLoadingUpload(false);
                addToast(`Atividade pronta para ser criada!`, {
                    appearance: 'info',
                    autoDismiss: true,
                })
                addToast(`Pressione no botão Adicionar atividade novamente !`, {
                    appearance: 'info',
                    autoDismiss: true,
                })
            };
            reader.readAsDataURL(file);
        }
    }

    const imgUpdate = (e: any) => {
        if (String(e.target.files[0].name).length !== 0) {
            setInputName(e.target.files[0].name);
            var reader = new FileReader();
            var file = e.target.files[0];
            reader.onload = function (upload: any) {
                setItemUpdate({ ...itemUpdate, imageURL: `${upload.target.result}` })
                setLoadingUploadUpdate(false);
                addToast(`Atividade pronta para atualizada!`, {
                    appearance: 'info',
                    autoDismiss: true,
                })
                addToast(`Pressione no botão atualizar dados!`, {
                    appearance: 'info',
                    autoDismiss: true,
                })
            };
            reader.readAsDataURL(file);
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
            return addToast(`Aguarde! fazendo upload do arquivo...`, {
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
            const data: Item = res.data;
            setResult([...result, data]);
            setModal2(false);
            addToast(`Atividade criada com successo!`, {
                appearance: 'success',
                autoDismiss: true,
            })
        }).catch((err) => {
            addToast(`Ocorreu um erro!` + err, {
                appearance: 'error',
                autoDismiss: true,
            });            
        })
    }

    const onDelete = (id: string) => {
        if (!window.confirm('Confirma e exclusão da Atividade ?')) {
            return;
        }
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
            <div className="container-fluid">
                <div className="row" style={{ marginTop: '120px'}}>
                    <div className="col-12">
                        <h3>Listagem de Atividades</h3>
                    </div>
                </div>
                <div className="row">
                    {result.map(res => {
                        return (
                            <React.Fragment key={res._id}>
                                <div className="col-lg-3 col-md-6">
                                    <div className="card" style={{marginBottom: '15px'}}>
                                        <div className="card-header">
                                            <h5><i className="fa fa-file-o fa-2x" style={{marginRight: '10px'}}></i>{res.name}</h5>
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text text-center">{res.description}</p>
                                            <p className="card-text text-center">De {res.initialDate} à {res.endDate}</p>
                                            <i className="fa fa-pencil fa-2x"  onClick={() => { setItemUpdate(res); setModal(true); }} style={{color: 'blue', float: 'right', cursor: 'pointer'}} />
                                            <i className="fa fa-trash-o fa-2x"  onClick={() => onDelete(res._id)} style={{marginRight: '10px', color: 'red', float: 'right', cursor: 'pointer'}} />                                                
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
        </main>
        <Modal
            isOpen={modal2}
            onRequestClose={() => setModal2(false)}
            style={customStyles}
            appElement={document.getElementById('root') as HTMLElement}
            contentLabel="Form Modal">
            <h5>Inclusão de Atividade</h5>    
            <form onSubmit={onSubmit} encType='multipart/form-data' id="atividadesForm">
                <div className="form-group">
                    <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Insira um nome" type="text" />
                </div>
                <div className="form-group">
                    <input className="form-control" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Insira uma descrição" type="text" />
                </div>
                <div className="form-group">
                    <input className="form-control" name="initialDate" value={initialDate} onChange={(e) => setInitialDate(mask(e.target.value, '99/99/9999'))} placeholder="Insira a data de inicio" type="text" />                    
                </div>
                <div className="form-group">
                    <input className="form-control" value={endDate} onChange={(e) => setEndDate(mask(e.target.value, '99/99/9999'))} placeholder="Insira a data final" type="text" />
                </div>
                <div className="form-group">
                    <div className="custom-file">
                        <input type="file" onChange={(e: any) => imgSubmit(e)} className="custom-file-input btbyfhnbfe" id="inputGroupFile01" />
                        <label className="custom-file-label" htmlFor="inputGroupFile01">{inputName}</label>
                    </div>
                </div>                
                <button className="btn btn-primary float-right" onClick={onSubmit}>Adicionar Atividade</button>
            </form>
        </Modal>
        <Modal
            isOpen={modal}
            onRequestClose={() => setModal(false)}
            style={customStyles}
            appElement={document.getElementById('root') as HTMLElement}
            contentLabel="Form Modal">
            <h5>Alteração de Atividade</h5>

            <form onSubmit={onSubmit} encType='multipart/form-data'>
                <div className="form-group">
                    <input className="form-control" value={itemUpdate.name} onChange={(e) => setItemUpdate({ ...itemUpdate, name: e.target.value })} />
                </div>
                <div className="form-group">
                    <input className="form-control" value={itemUpdate.description} onChange={(e) => setItemUpdate({ ...itemUpdate, description: e.target.value })} />
                </div>
                <div className="form-group">
                    <input className="form-control" value={itemUpdate.initialDate} onChange={(e) => setItemUpdate({ ...itemUpdate, initialDate: e.target.value })} />
                </div>
                <div className="form-group">
                    <input className="form-control" value={itemUpdate.endDate} onChange={(e) => setItemUpdate({ ...itemUpdate, endDate: e.target.value })} />
                </div>
                <div className="form-group">
                    <div className="custom-file">
                        <input type="file" onChange={(e: any) => imgUpdate(e)} className="custom-file-input btbyfhnbfe" id="inputGroupFile01" />
                        <label className="custom-file-label" htmlFor="inputGroupFile01">{inputName}</label>
                    </div>
                </div>
                <div className="form-group">
                    <i className={getIconFromFileType()} style={{marginRight: '10px'}}></i><span>{checkIfFileExists(itemUpdate.imageURL)}</span>
                </div>
                <button className="btn btn-primary float-right" onClick={onUpdate}>Atualizar Dados</button>
            </form>
        </Modal>
        <div onClick={() => setModal2(true)} className="float">
            <img height='50%' src={Add} alt="" />
        </div>
        </>
    )
}
export default Atividades;