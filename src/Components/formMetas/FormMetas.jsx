import React from 'react'
import styles from './FormMetas.module.css'
import close from '../../Assets/close.svg'

const FormMetas = ({setOpenModalForm}) => {
  return (
    <div className={styles.modalFormMetas}> 
    <img src={close} alt="close"/>
        <form>
            <input type='text' />
            <input type='text'/>
            <input type="date" />
            <button>Enviar</button>
        </form> 
    </div>
  )
}

export default FormMetas