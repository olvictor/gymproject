import axios from "axios"
import { useQuery } from "react-query"
import { dataGet } from "../CustomHooks/UseFetch"


export const buscarTreino = async (token) => {
    console.log(token)
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