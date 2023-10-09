import React, { useContext } from 'react'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import  Dumbbell  from '../Assets/dumbbell.svg'
import { UserContext } from '../UserContext'


const Header = () => {
  const {data,logado} = useContext(UserContext)
  
  return (
    <header>
      <nav className={styles.navbar}>
        <Link to='/'>
        <img className={styles.logo} src={Dumbbell} alt="logo" height='30px'/>
        </Link>
          <div className={styles.links}>
              <Link to='/'>Home</Link>
          {logado ? <Link to='/login'>{data.username} </Link> : <Link to='/login'>Login/criar</Link>}
          </div>
      </nav>
    </header>
  )
}

export default Header