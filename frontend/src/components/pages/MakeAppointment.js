import api from '../../utils/api';
import styles from '../form/Form'
import { useState } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//layout
import Input from "../form/Input";

//hook
import useFlashMessage from '../../hooks/useFlashMessage';

function MakeAppointment() {


    const [appointment, setAppointment] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    //flash message
    const { setFlashMessage } = useFlashMessage();

    function onChange(e) {
        setAppointment({...appointment, [e.target.name]: e.target.value});
    }

    //consume api to schedule appointment
    async function scheduleAppointment() {

        let msgText = 'Consulta agendada com sucesso!';
        let msgType = 'success';
        try {
           const response = await api.post(`/scheduling/create/${id}`, appointment);
           navigate('/scheduling');

        } catch (error) {
            msgText = error.response.data.message;
            msgType = 'error';
        }

        setFlashMessage(msgText, msgType);
    }

    function submit(e) {
        e.preventDefault();
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