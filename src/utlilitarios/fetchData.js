import axios from "axios"
import { useQuery } from "react-query"
import { dataGet } from "../CustomHooks/UseFetch"

const token = window.localStorage.getItem('token');


export const buscarTreino = async () => {

  const {url,options} = dataGet(token)

    const {data ,refetch} = useQuery('buscarTreinos2', async () =>{
        return await axios.get(url,options).then((response) => response.data)
      },{
        refetchOnWindowFocus:false,
    })
    return {
        data,refetch
    }
}