import React from "react";
import styles from "./Modal.module.css";
import { IoMdClose } from "react-icons/io";

const Modal = ({ item, setOpenModal }) => {
  console.log(item.imagem_url);
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <img src={item.imagem_url} alt={item.conteudo} />
        <h3>{item.conteudo}</h3>
        <IoMdClose
          fill="black"
          style={{ fontSize: "3rem" }}
          onClick={() => setOpenModal(null)}
        />
      </div>
    </div>
  );
};

export default Modal;
