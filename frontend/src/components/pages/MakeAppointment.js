import api from '../../utils/api';
import styles from '../form/Form'
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//layout
import Input from "../form/Input";

//hook
import useFlashMessage from '../../hooks/useFlashMessage';

function MakeAppointment() {


    const [appointment, setAppointment] = useState({});
    //to storage currentPatient logged
    const [patient, setPatient] = useState({});

    //get token
    const [token] = useState(localStorage.getItem('token'|| ''));

    const { id } = useParams();
    const navigate = useNavigate();

    //flash message
    const { setFlashMessage } = useFlashMessage();

    function onChange(e) {
        setAppointment({...appointment, [e.target.name]: e.target.value});
    }


    //get data from  current patient 
    useEffect(() => {
        
        api.get('/patients/getCurrentPatient', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then(response => {
            setPatient(response.data.user)
        })
        .catch(err => {
            console.log('Deu erro ao pegar usuario atual', err);
        })
    }, []);

    

    //consume api to schedule appointment
    async function scheduleAppointment() {
        let msgText = 'Consulta agendada com sucesso!';
        let msgType = 'success';
        try {
           const response = await api.post(`/schedules/makeAppointment`, appointment, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
           });
            
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

    function submit(e) {
        e.preventDefault();
        //add patientId to appointment
        //add patient id to appointment
        setAppointment({...appointment, 'patientId': patient.id})
        scheduleAppointment();
    }
    
    return (

        <div>
            <h2>Marque a consulta:</h2>
             <Input 
                type="date"
                text="Data"
                id="date"
                name="date"
                handleOnChange={onChange}
             />

             <Input 
                type="time"
                text="Hora"
                id="hour"
                name="hour"
                handleOnChange={onChange}
             />

             <Input 
                type="text"
                text="Descrição"
                id="description"
                name="description"
                handleOnChange={onChange}
             />

            <input type="submit" value="Agendar" onClick={submit} />
        </div>
      
    )
   
}

export default MakeAppointment;