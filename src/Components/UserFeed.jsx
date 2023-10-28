import React, { useEffect, useState } from 'react'
import { feedGET } from '../CustomHooks/UseFetch'
import styles from './UserFeed.module.css'

const UserFeed = () => {
  const [feed, setFeed] = useState([])


  useEffect(()=>{

    const token = window.localStorage.getItem('token')
    const {url,options} = feedGET(token)

    const buscarFeed = async () =>{
     const response =  await fetch(url, options)
     const json = await response.json()
     setFeed(json)

    }
    buscarFeed()

  },[])
  return (
    <div className={styles.feed}>
        {feed ? feed.map((item,index)=>(
            <div className={styles.feedItem}key={index}> 
                <p>{item.conteudo}</p>
                <img src={item.imagem_url} alt={item.conteudo} />
            </div>
        )): ''}
    </div>
  )
}

export default UserFeed