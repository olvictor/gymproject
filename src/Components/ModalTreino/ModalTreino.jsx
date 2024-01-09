import React from 'react'
import styles from './ModalTreino.module.css'
import { IoMdClose } from "react-icons/io";
import { NavLink, Route, Routes } from 'react-router-dom';
import MeusExercicios from '../MeusExercicios/MeusExercicios';
import MeuTreino from '../MeuTreino/MeuTreino';

import HeaderModal from '../HeaderModal/HeaderModal';


const ModalTreino = ({treino,setOpenModalTreino}) => {
  return (
    <div className={styles.modalTreino}>
            <IoMdClose  style={{position:'absolute',right:'0px',fontSize:'30px'}} onClick={()=> setOpenModalTreino(false)}/>
            <HeaderModal />
            <Routes>
                <Route path="/" element={<HeaderModal />}></Route>
                <Route path="meusExercicios" element={<MeusExercicios />}></Route>
                <Route path="meuTreino" element={<MeuTreino treino={treino} />}></Route>
            </Routes>
    </div>
  )
}

export default ModalTreino