import React from 'react'
import styles from './ModalTreino.module.css'
import { IoMdClose } from "react-icons/io";

const ModalTreino = ({treino,setOpenModalTreino}) => {
  return (
    <div className={styles.modalTreino}>
            <IoMdClose  style={{position:'absolute',right:'0px',fontSize:'30px'}} onClick={()=> setOpenModalTreino(false)}/>
            <nav>
              <ul>
                <li>Dias de treino</li>
                <li>Execícios</li>
              </ul>
            </nav>
            {treino.map((item)=>(
             <p>{item.bodyPart}</p>
            ))}
    </div>
  )
}

export default ModalTreino