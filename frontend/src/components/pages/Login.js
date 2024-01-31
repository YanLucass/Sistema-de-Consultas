import { useContext, useState } from 'react';
import styles from '../form/Form.module.css'
//form
import Input from "../form/Input"

//context
import Context from '../../context/UserContext';

function Login() {

    const [user, setUser] = useState({});

    //get function login from context 
    const { login } = useContext(Context)
    // to fill object to login
    function onChange(e) {
        setUser({...user, [e.target.name]: e.target.value});
    } 

    //send userData
    function submit(e) {
        e.preventDefault();
        login(user)  
    }

    return (
        <div className={styles.register_container}>
            <Input 
                text="Email:"
                type="email"
                name="email"
                placeholder="Digite seu email"
                handleOnChange={onChange}
            />

            <Input 
                text="Senha:"
                type="password"
                name="password"
                placeholder="Digite sua senha"
                handleOnChange={onChange}
            />

            <input type='submit' onClick={submit}></input>
        </div>
    )
}

export default Login;