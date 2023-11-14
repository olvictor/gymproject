import React, { useEffect, useState } from "react";
import { feedGET } from "../CustomHooks/UseFetch";
import styles from "./UserFeed.module.css";
import { IoEyeSharp } from "react-icons/io5";
import Modal from "./Modal";

const UserFeed = () => {
  const [feed, setFeed] = useState([]);
  const [currentShow, setCurrentShow] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [itemModal, setItemModal] = useState(null);
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const { url, options } = feedGET(token);
    const buscarFeed = async () => {
      const response = await fetch(url, options);
      if (response.ok) {
        const json = await response.json();
        setFeed(json);
      }
    };
    buscarFeed();
  }, []);

  const handleClick = (item) => {
    setItemModal(item);
    setOpenModal(true);
  };

  return (
    <div className={styles.feed}>
      {feed
        ? feed.map((item, index) => (
            <div
              className={styles.feedItem}
              key={index}
              onMouseEnter={() => setCurrentShow(index)}
              onMouseLeave={() => setCurrentShow(null)}
              onClick={() => handleClick(item)}
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
          ))
        : ""}

      {openModal && <Modal item={itemModal} setOpenModal={setOpenModal} />}
    </div>
  );
};

export default UserFeed;
