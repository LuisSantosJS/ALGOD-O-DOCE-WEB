import React, { useEffect } from 'react';
import { useToken } from '../../context/contextMain';
import './styles.css';


const Bashboard: React.FC = () => {
    const { token } = useToken();
    const atividades = require('../../assets/list.png');
    const turmas = require('../../assets/students.png');
    const galery = require('../../assets/photos.png');
    const users = require('../../assets/teacher-at-the-blackboard.png');
    const portifolio = require('../../assets/portfolio.png');
    const cardapio = require('../../assets/menu.png');


    return (
        <>
            <div className="viewContainerBash">
                <div className="spacingviewbash" />
                <div className="rowsBlocks">
                    <div className="itemBash">
                        <img className='imgsa' src={atividades} alt="Atividades" />
                    </div>
                    <div className="itemBash">
                        <img className='imgsa' src={turmas} alt="Atividades" />
                    </div>
                    <div className="itemBash">
                        <img className='imgsa' src={galery} alt="Atividades" />
                    </div>
                </div>
                <div className="rowsBlocks">
                    <div className="itemBash">
                        <img className='imgsa' src={users} alt="Atividades" />
                    </div>
                    <div className="itemBash">
                        <img className='imgsa' src={portifolio} alt="Atividades" />
                    </div>
                    <div className="itemBash">
                        <img className='imgsa' src={cardapio} alt="Atividades" />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Bashboard;