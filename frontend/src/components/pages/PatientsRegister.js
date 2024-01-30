import api from '../../utils/api';
import { useState } from 'react';
import styles from '../form/Form.module.css'
import { useNavigate } from 'react-router-dom';

//layouts
import Input from '../form/Input';
import useFlashMessage from '../../hooks/useFlashMessage';

function PatientsRegister() {

    const [patient, setPatient] = useState({});

    //flash message
    const { setFlashMessage } = useFlashMessage();

    //navegation 
    const navigate = useNavigate();
    function onChange(e) {
        setPatient({...patient, [e.target.name]: e.target.value});
    }


   

    async function submit(e) {
        e.preventDefault();
        console.log(patient);
       await createPatient(patient);
       navigate("/")
    }   

   
    return (
        <div className={styles.register_container}>
            <Input 
                text="Paciente"
                type="text"
                name="name"
                placeholder="Digite o nome do paciente"
                handleOnChange={onChange}
            />

            <Input 
               text="Email"
               type="text"
               name="email"
               placeholder="Digite seu email" 
               handleOnChange={onChange}
            />


            <Input 
                text="CPF:"
                type="text"
                name="cpf"
                placeholder="Ex: 73746783801"
                handleOnChange={onChange}
            />


            <Input 
                text="Telefone"
                type="tel"
                name="phone"
                placeholder="ex: 81994386323"
                handleOnChange={onChange}
            />
     
            <Input 
                text="Senha"
                type="password"
                name="password"
                placeholder="Cadastre uma senha"
                handleOnChange={onChange}
            />
            
            <Input 
                text="Confirme sua senha"
                type="password"
                name="confirmPassword"
                handleOnChange={onChange}
            />
            <input type='submit' onClick={submit} className={styles.inputButton}></input>
        </div>
    )
}

export default PatientsRegister;