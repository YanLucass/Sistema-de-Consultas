
import { Link } from "react-router-dom"
import styles from './NavBar.module.css';
import logo from '../../assets/images/doisUnidos.png'


function NavBar() {
    return (
        <nav id={styles.navbar}>
        <Link to="/" id={styles.logo}>
            <img src={logo} alt="Dois unidos associação"/>
        </Link>
  
        <ul>
          <li>
            <Link to="/patients/register">Cadastrar paciente</Link>
          </li>
          <li><Link to = '/showPatients'>Marcar consulta</Link></li>
          <li><Link to = '/scheduling'>Cancelar consulta</Link></li>
        </ul>
    </nav>
    )
}

export default NavBar;