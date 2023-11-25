import React from "react";
import Input from "../Components/Input";
import UseForm from "../CustomHooks/UseForm";
import styles from "./UserPost.module.css";

import { useState } from "react";
import { userPOST } from "../CustomHooks/UseFetch";
import { useNavigate } from "react-router-dom";

const UserPost = () => {
  const conteudo = UseForm();
  const [img, setImg] = useState({});
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("imagem", img.raw);
    formData.append("conteudo", conteudo.value);

    const { url, options } = userPOST(formData, token);

    const response = await fetch(url, options);
    if (response.ok) {
      navigate("/user/feed");
    }
  };

  const handleImgChange = ({ target }) => {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  };
  return (
    <div className={styles.userPost}>
      <form onSubmit={handleSubmit}>
        <Input
          type={"text"}
          placeholder={"Título"}
          name={"conteudo"}
          {...conteudo}
        />
        <input
          type="file"
          name="imagem"
          id="imagem"
          onChange={handleImgChange}
        />
        <button type="submit">Enviar</button>
      </form>
      <div className={styles.boxImagem}>
        {" "}
        {img.preview ? <img src={img.preview} /> : ""}
      </div>
    </div>
  );
};

export default UserPost;
