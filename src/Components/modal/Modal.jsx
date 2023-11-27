import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css";
import UseForm from "../../CustomHooks/UseForm";
import Input from "../input/Input";
import { IoMdClose } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { PiSubtitlesLight } from "react-icons/pi";
import { MdOutlineDateRange } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import axios from "axios";

const Modal = ({ feed, currentItem, setCurrentItem, setOpenModal }) => {
  const [comentarios, setComentarios] = useState([]);
  const comentario = UseForm();
  let post_id = feed[currentItem].id;
  const token = window.localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data, isLoading, refetch } = useQuery(
    "getComentarios",
    async () => {
      return await axios
        .get(`http://localhost:3000/comentarios/${post_id}`, axiosConfig)
        .then((response) => response.data);
    },
    {
      retry: false,
      initialData: [],
      onSuccess: (data) => {
        setComentarios(data);
      },
      onError: () => {
        setComentarios([]);
      },
    }
  );

  const leftClick = () => {
    if (currentItem > 0) {
      setCurrentItem(currentItem - 1);
      post_id -= 1;
      refetch();
    }
  };

  const rightClick = () => {
    if (currentItem < feed.length - 1) {
      setCurrentItem(currentItem + 1);
      post_id += 1;
      refetch();
    }
  };

  const mutation = useMutation({
    mutationFn: async () => {
      return await axios
        .post(
          `http://localhost:3000/comentarios`,
          {
            post_id,
            comentario: comentario.value,
          },
          axiosConfig
        )
        .then((response) => response.data);
    },
    onSuccess: () => {
      refetch();
    },
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }
  const dataCurrentItem = new Date(
    feed[currentItem].data_publicacao
  ).toLocaleString("pt-BR", { timezone: "UTC" });

  return (
    <div className={`${styles.modal}`}>
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
            <div className={styles.postInfoTittleData}>
              <h3>
                <PiSubtitlesLight /> {feed[currentItem].conteudo}
              </h3>
              <h3>
                <MdOutlineDateRange /> {dataCurrentItem}
              </h3>
            </div>
            <ul>
              {comentarios &&
                comentarios.map((item) => {
                  const data = new Date(item.data_comentario).toLocaleString(
                    "pt-BR",
                    { timezone: "UTC" }
                  );
                  return (
                    <li className={styles.itemComentario} key={item.id}>
                      <img src={item.usuario_photo} alt="Foto perfil" />
                      <div className={styles.itemComentarioInfo}>
                        <div className={styles.itemComentarioBox}>
                          <h5 className={styles.itemComentarioInfoUsuario}>
                            {item.usuario_username}
                          </h5>
                          <p>{item.comentario}</p>
                        </div>
                        <p className={styles.itemComentarioInfoData}>{data}</p>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className={styles.rightModalComentario}>
            <Input type="text" placeholder="Comente..." {...comentario} />
            {mutation.isLoading ? (
              <button disabled>Comentando...</button>
            ) : (
              <button onClick={() => mutation.mutate()}>Comentar</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
