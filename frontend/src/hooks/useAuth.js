import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import useFlashMessage from "./useFlashMessage";
import { useEffect, useState } from "react";


export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false); //start logged out
    const { setFlashMessage } = useFlashMessage();
    const navigate = useNavigate();


    //To deal with protected routes, if you have a token in localStorage, we will change the default API Authorization to always pass
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true);
        }
    }, []);



 //create a new Patient. Consume api from route /patient/
 async function createPatient(patient) {

    let msgText = "Paciente cadastrado com sucesso!";
    let msgType = 'success';

    try {      
        const response = await api.post('/patients/', patient);
        await insertTokenData(response.data);
        navigate("/")
    } catch (error) {
        msgType = 'error'
        if (error?.response?.data?.validation?.body?.message) {
            msgText = error.response.data.validation.body.message;
        } else if(error?.response?.data?.message) {
            msgText = error.response.data.message;
        } 
        
    }

    setFlashMessage(msgText, msgType); 
}

    //login
    async function login(user) {
        let msgText = 'Login realizado com sucesso'
        let msgType = 'success'

        try {
           const response = await api.post('/login', user)
           const data = response.data;
           await insertTokenData(data)
        } catch (error) {
            msgType = 'error'
            if(error?.response?.data?.validation?.body?.message) {
                msgText = error.response.data.validation.body.message;
            } else if(error?.response?.data?.message) {
                msgText = error.response.data.message;
            }
        }

        setFlashMessage(msgText, msgType);
    }

    //logout function
    async function logout() {
        let msgText = 'Logout realizado com sucesso. Se Cuide!';
        let msgType = 'success';
        try {
            //deslog and remove token
            setAuthenticated(false);
            localStorage.removeItem('token');
            //to remove token from instace of api
            api.defaults.headers.Authorization = undefined;
            navigate('/login');
        } catch (error) {
            msgText = error.response.data.message;
            msgType = 'error';
        }

        setFlashMessage(msgText, msgType);
    }


    //insert into localstorage the token from response.data
    async function insertTokenData(data) {
        setAuthenticated(true);
         let teste = localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('token', JSON.stringify(data.token));
        navigate("/");
    }

    return { authenticated, createPatient, login, logout }
}