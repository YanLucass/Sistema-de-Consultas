
import { Link } from "react-router-dom"
import styles from './NavBar.module.css';
import logo from '../../assets/images/doisUnidos.png'
import { useContext } from "react";
import Context from "../../context/UserContext";

function NavBar() {
  const { authenticated, logout } = useContext(Context)
    return (
        <nav id={styles.navbar}>
        <Link to="/" id={styles.logo}>
            <img src={logo} alt="Dois unidos associação"/>
        </Link>
  
        <ul>
          {authenticated ? (
            <>
            <li><Link to = '/make/appointment'>Marcar consulta</Link></li>
            <li><Link to='/patients/appointments'> Minhas consultas </Link> </li>
            <li onClick={logout}>Logout</li>
            </>
          )

          :
          (
            <>
            <li>
              <Link to="/patients/register">Cadastrar paciente</Link>
            </li>
          <li>
             <Link to="/login">Login</Link>
          </li>
          </>
          )}
        </ul>
    </nav>
    )
}

export default NavBar;