import React, { useEffect, useState } from "react";
import { feedGET } from "../CustomHooks/UseFetch";
import styles from "./UserFeed.module.css";
import { IoEyeSharp } from "react-icons/io5";
import Modal from "./Modal";
import { useQuery } from "react-query";
import axios from "axios";

const UserFeed = () => {
  const [currentShow, setCurrentShow] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const token = window.localStorage.getItem("token");
  const { url } = feedGET(token);

  const handleClick = (index) => {
    setCurrentItem(index);
    setOpenModal(true);
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data, isLoading } = useQuery(
    "getFeed",
    async () => {
      return await axios
        .get(url, axiosConfig)
        .then((response) => response.data);
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.feed}>
      {data.map((item, index) => (
        <div
          className={styles.feedItem}
          key={index}
          onMouseEnter={() => setCurrentShow(index)}
          onMouseLeave={() => setCurrentShow(null)}
          onClick={() => handleClick(index)}
        >
          <img src={item.imagem_url} alt={item.conteudo} />
          <IoEyeSharp
            style={{
              display: index === currentShow ? "block" : "none",
              position: "absolute",
              fontSize: "4rem",
              top: "33%",
            }}
          />
        </div>
      ))}

      {openModal && (
        <Modal
          feed={data}
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
          setOpenModal={setOpenModal}
        />
      )}
    </div>
  );
};

export default UserFeed;
