import React from "react";
import Input from "../input/Input";
import UseForm from "../../CustomHooks/UseForm";
import styles from "./UserPost.module.css";

import { useState } from "react";
import { userPOST } from "../../CustomHooks/UseFetch";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";

const UserPost = () => {
  const conteudo = UseForm();
  const [img, setImg] = useState({});
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");
  
  const mutation = useMutation({
    mutationFn: async (dados) =>{
    const { url, options } = userPOST(dados, token);
     return  await axios.post(url,dados,options).then((response)=> response.data)
    },onSuccess(){
      navigate("/user/feed");
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("imagem", img.raw);
    formData.append("conteudo", conteudo.value);

    mutation.mutate(formData)
  
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
          placeholder={"Descrição da imagem..."}
          name={"conteudo"}
          {...conteudo}
        />
     <div className={styles.containerCustomInput}>
        <label for="imagem" className={styles.customInput}>Escolher Arquivo</label>
        <input
            type="file"
            name="imagem"
            id="imagem"
            onChange={handleImgChange}
          />
     </div>


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
