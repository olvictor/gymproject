import React, { useState } from 'react'
import styles from './UserPerfil.module.css'

const UserPerfil = () => {
  const [userInfo, setUserInfo] = useState(null)

  return (
    <div className={styles.containerPerfil}>
      <h1 className={styles.tituloUser}>Perfil do usuário</h1>
      {!userInfo ?  
        <div>
            <form action=""></form>
            <p>aa</p>
        </div>
          : 
      <div className={styles.containerUserInfo}>
              <div className={styles.infoUser}>
                <label>Nome:</label>
                <input type="text" placeholder='teste' disabled/>
              </div>
              <div className={styles.infoUser}>
                <label>idade:</label>
                <input type="text" placeholder='26' disabled/>
              </div>
              <div className={styles.infoUser}>
                <label>Altura:</label>
                <input type="text" placeholder='1.80' disabled/>
              </div>
              <div className={styles.infoUser}>
                <label>Peso:</label>
                <input type="text" placeholder='80' disabled/>
              </div>
              <div className={styles.infoUser}>
                <label>Sexo:</label>
                <input type="text" placeholder='Masculino' disabled/>
              </div>
      </div>}
      
</div>
  )
}

export default UserPerfil