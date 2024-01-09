import React from 'react'
import { NavLink} from 'react-router-dom';
import styles from './HeaderModal.module.css'

const HeaderModal = () => {
  return (
    <div style={{display:'flex', gap:'10px'}}>
        <NavLink to='/user/treino/meuTreino' end>
                <a>Meu Treino</a>
        </NavLink>
        <NavLink to='/user/treino/meusExercicios' >
                <a>Meus Exercícios</a>
        </NavLink>
   </div>
  )
}

export default HeaderModal