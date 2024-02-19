import React, { Suspense, useEffect, useState } from "react";
import { feedGET } from "../../CustomHooks/UseFetch";
import styles from "./UserFeed.module.css";
import { IoEyeSharp } from "react-icons/io5";
import Modal from "../modal/Modal";
import Loading from "../loading/Loading";
import { useQuery } from "react-query";
import axios from "axios";

const UserFeed = () => {
  const [currentShow, setCurrentShow] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [showItem, setShowItem] = useState([])


  const token = window.localStorage.getItem("token");
  const { url, options } = feedGET(token);

  const handleClick = (index) => {
    setCurrentItem(index);
    setOpenModal(true);
  };

  const { data, refetch } = useQuery("getFeed",
    async () => {
      return await axios
        .get(url, options)
        .then((response) => response.data);
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      onSuccess: (data)=>{
        setShowItem(data)
      }
    }
  );

  return (
    <Suspense fallback={<Loading />} >
      <div className={styles.feed}>
      {showItem.length > 0 && showItem.map((item, index) => (
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
                top: "38%",
              }}
            />
          </div>
        ))}

        {openModal && (
          <Modal
            feed={showItem}
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            setOpenModal={setOpenModal}
            setShowItem={setShowItem}
          />
        )}
      </div>
    </Suspense>
  );
};

export default UserFeed;
