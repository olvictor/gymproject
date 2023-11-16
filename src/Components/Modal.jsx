import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css";
import { IoMdClose } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { PiSubtitlesLight } from "react-icons/pi";
import { MdOutlineDateRange } from "react-icons/md";

const Modal = ({ feed, currentItem, setCurrentItem, setOpenModal }) => {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    const buscarComentarios = async () => {
      const post_id = feed[currentItem].id;
      const token = window.localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/comentario/${post_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();
      setComentarios([...json]);
    };
    buscarComentarios();
  }, [currentItem]);
  console.log(comentarios);
  const leftClick = () => {
    if (currentItem > 0) {
      setCurrentItem(currentItem - 1);
    }
  };

  const rightClick = () => {
    if (currentItem < feed.length - 1) {
      setCurrentItem(currentItem + 1);
    }
  };

  return (
    <div className={`${styles.modal} container`}>
      <div className={styles.modalContent}>
        <div className={styles.modalLeft}>
          <img
            src={feed[currentItem].imagem_url}
            alt={feed[currentItem].conteudo}
          />
          <button disabled={currentItem === 0 ? true : false}>
            <FaArrowLeft
              className={styles.left}
              fill="white"
              style={{ fontSize: "3rem" }}
              onClick={leftClick}
            />
          </button>
          <button disabled={currentItem < feed.length - 1 ? false : true}>
            <FaArrowRight
              className={styles.right}
              fill="white"
              style={{ fontSize: "3rem" }}
              onClick={rightClick}
            />
          </button>
        </div>
        <div className={styles.rightModal}>
          <IoMdClose
            className={styles.close}
            fill="black"
            style={{ fontSize: "3rem" }}
            onClick={() => setOpenModal(null)}
          />
          <div className={styles.rightModalPostInfo}>
            <h3>
              <PiSubtitlesLight /> {feed[currentItem].conteudo}
            </h3>
            <h4>
              {" "}
              <MdOutlineDateRange /> {feed[currentItem].data_publicacao}
            </h4>
            <ul>
              {comentarios &&
                comentarios.map((item) => (
                  <li key={item.id}>{item.comentario}</li>
                ))}
            </ul>
          </div>
          <div className={styles.rightModalComentario}>
            <input type="text" placeholder="Digite um comentário" />{" "}
            <button>Comentar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
