import React from 'react'
import { NavLink} from 'react-router-dom';
import styles from './HeaderModal.module.css'

const HeaderModal = () => {
  return (
    <div style={{display:'flex',}}>
        <NavLink to='/user/treino/meuTreino' className={styles.linkHeaderModal} end>
                <a>Meu Treino</a>
        </NavLink>
        <NavLink to='/user/treino/meusExercicios' className={styles.linkHeaderModal}>
                <a>Meus Exercícios</a>
        </NavLink>
   </div>
  )
}

export default HeaderModal