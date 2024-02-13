import api from "../../utils/api";
//react
import { useEffect, useState } from "react";
//styles
import styles from './PatientsAppointment.module.css'

//date-fns method to format dates
import { format } from "date-fns";

//hooks
import useFlashMessage from "../../hooks/useFlashMessage";

function PatientsAppointment() {

    const [token] = useState(localStorage.getItem('token' || ''));
    //storage individuals appointment
    const [appointments, setAppointments] = useState([]);

    //flash message
    const { setFlashMessage } = useFlashMessage();

    //consume api to get individuals appointments
    useEffect(() => {
    
        api.get('schedules/patientAppointments', { 
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            setAppointments(response.data.patientsAppointments);
        })
        .catch((err) => {
            console.log('Deu erro ao pegar consultas individuais', err);
        })
    }, [token]);



    //function to consume api for cancel an patient appointment

    async function cancelPatientAppointment(id) {
        let msgText = 'Consulta desmarcada com sucesso!';
        let msgType = 'success';
        try {
            await api.delete(`/schedules/cancelAppointment/${id}`);
            //update appointment list to show active appointments
            const updatedAppointments = appointments.filter(appointments => appointments.id !== id);
            setAppointments(updatedAppointments);

        } catch (error) {
            msgText = error.response.data.message;
            msgType = 'error';
        }

        setFlashMessage(msgText, msgType);
    }
    return (

        //show individuals appointments
        <div className={styles.showAppointmentsDiv}>
               <h1>Suas consultas:</h1>
               {/* for each appointment show your details */}
               {appointments.map((appointment, index) => (
                <div key={index}> 
                    {/* Formart to brazilian date */}
                    <h3>{format(new Date(appointment.date), 'dd/MM/yyyy')}</h3>
                    <p>{appointment.description}</p>
                    {/* show cancel appointment button */}
                    <button onClick={() => cancelPatientAppointment(appointment.id)}>Cancelar</button>
                </div>
               ))}
        </div>
     
    )
}

export default PatientsAppointment;