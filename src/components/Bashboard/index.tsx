import React from 'react';
import { Link } from 'react-router-dom'

import './styles.css';


const Bashboard: React.FC = () => {
  
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
                    <Link className="itemBash" to='/admin/atividades'>
                        <img className='imgsa' src={atividades} alt="Atividades" />
                        <h3 className='aovartre'>Atividades</h3>
                    </Link>
                    <Link className="itemBash" to='/admin/turmas'>
                        <img className='imgsa' src={turmas} alt="Turmas" />
                        <h3 className='aovartre'>Turmas</h3>
                    </Link>
                    <Link className="itemBash" to='/admin/galery'>
                        <img className='imgsa' src={galery} alt="Galery" />
                        <h3 className='aovartre'>Galeria</h3>
                    </Link>
                </div>

                <div className="rowsBlocks">
                    <Link className="itemBash" to='/admin/professores'>
                        <img className='imgsa' src={users} alt="Users" />
                        <h3 className='aovartre'>Usuários</h3>
                    </Link>
                    <Link className="itemBash" to='/admin/portifolio'>
                        <img className='imgsa' src={portifolio} alt="Portifolio" />
                        <h3 className='aovartre'>Portifólio</h3>
                    </Link>
                    <Link className="itemBash" to='/admin/cardapio'>
                        <img className='imgsa' src={cardapio} alt="Cardapio" />
                        <h3 className='aovartre'>Cardápio</h3>
                    </Link>
                </div>
            </div>
        </>
    )
}
export default Bashboard;