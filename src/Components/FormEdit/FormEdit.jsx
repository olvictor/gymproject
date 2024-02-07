import React from 'react'
import styles from './FormEdit.module.css'
import { IoMdClose } from "react-icons/io";
import Input from '../input/Input';
import UseForm from '../../CustomHooks/UseForm';
import { GiBodyHeight } from "react-icons/gi";
import { FaScaleBalanced } from "react-icons/fa6";
import { FaHourglassHalf } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { infoPOST } from '../../CustomHooks/UseFetch';
import { useMutation } from 'react-query';
import { imc } from '../../utlilitarios/imc';

const FormEdit = ({info,close}) => {
  const userNome = UseForm()
  const userAltura = UseForm()
  const userPeso = UseForm()
  const userIdade = UseForm()

  const imcINFO = imc(userPeso.value ,userAltura.value)

  const mutation = useMutation({
    mutationFn: async () => {
      const { url, options } = infoPOST(token);

      return await axios
        .put(
          url,
          {
            peso: userPeso.value,
            nome: userNome.value,
            altura: userAltura.value,
            idade: userIdade.value,
            sexo: userSexo,
            nivel_de_atividade: userAtividade,
            objetivo: userObjetivo,
            imc:  imcINFO.imc ,
            imc_classificacao: imcINFO.resultado[0].classificacao
          },
          options
        )
        .then((response) => response.data);
    }
  });


  const handleSubmit = async(e) =>{
    e.preventDefault()
    mutation.mutate();
  }

  return (
    <div className={styles.modalEdit}>
    <IoMdClose  className={styles.modalClose} onClick={close}/>
        <form onSubmit={handleSubmit}>
            <Input type="text" label="Nome" placeholder={info.nome} {...userNome}  name={'nome'} icon={<MdDriveFileRenameOutline  />}/>
            <Input type="text" label="Altura" placeholder={`${info.altura} m`}{...userAltura} name={'altura'} icon={<GiBodyHeight />}/>
            <Input type="number" label="Peso" {...userPeso} placeholder={`${info.peso} KG`} name={'peso'} icon={<FaScaleBalanced />}/>
            <Input type="number" label="Idade" {...userIdade} name={'idade'} placeholder={`${info.idade} nos`} icon={<FaHourglassHalf />}/>
            <select
              defaultValue={0}
              onChange={({ target }) => setUserSexo(target.value)}
            >
              <option value="0">Selecione o seu sexo</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
            </select>

            <select
              defaultValue={0}
              onChange={({ target }) => setUserObjetivo(target.value)}
            >
              <option value="0">Selecione o seu objetivo</option>
              <option value="manter">Manter Peso</option>
              <option value="ganhar">Ganhar Peso</option>
              <option value="perder">Emagrecer</option>
            </select>
            
            <select
              defaultValue={0}
              onChange={({ target }) => setUserAtividade(target.value)}
            >
              <option value="0">Nivel de atividade</option>
              <option value="leve">Leve</option>
              <option value="moderado">Moderado</option>
              <option value="pesado">Pesado</option>
            </select>
            <button>ENVIAR</button>
        </form>
    </div>
  )
}

export default FormEdit