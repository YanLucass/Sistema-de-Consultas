import api from "../../utils/api";
//react
import { useEffect, useState } from "react";
//styles
import styles from './PatientsAppointment.module.css'

//date-fns method to format dates
import { format } from "date-fns";

function PatientsAppointment() {

    const [token] = useState(localStorage.getItem('token' || ''));
    //storage individuals appointment
    const [appointments, setAppointments] = useState([]);

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
                </div>
               ))}
        </div>
     
    )
}

export default PatientsAppointment;