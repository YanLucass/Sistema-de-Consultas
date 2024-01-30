import { useEffect, useState } from "react";
import api from "../../utils/api";
import styles from './Scheduling.module.css'
import {format} from 'date-fns'
import useFlashMessage from "../../hooks/useFlashMessage";

function Scheduling() {

    const [scheduling, setScheduling] = useState([]);

    const { setFlashMessage } = useFlashMessage();

    //get all schedules to display.
    useEffect(() => {
        async function fetchAllScheduling() {
            try {
                const response = await api.get('/scheduling/getAll');
                 setScheduling(response.data.schedules);
            } catch (error) {
                console.log('Erro ao buscar todos os agendamentos', scheduling);     
            }
        }
        
        fetchAllScheduling();
    }, []);


    //cancel shedules function.

    async function cancelSchedule(id) {

        let msgText = 'Consulta cancelada!';
        let msgType = 'success';

        try {   
            await api.delete(`/scheduling/cancel/${id}`);
            // update list after canceling an appointment
            const updateSchedules = scheduling.filter(schedule => schedule.id !== id);
            setScheduling(updateSchedules);
        } catch (error) {
            msgText = error.response.data.message;
            msgType = 'error'
            console.log('erro ao cancelar agendamento', error);
        }

        setFlashMessage(msgText, msgType);
    }


    return (
        <div className={styles.central}>
            <h2>Agendamentos: </h2>

            {scheduling.map((schedule, index) => (
                <div className={styles.shedules} key={index}> 
                    {/* formart date do xx/mm/yyyy */}
                    <h3>{schedule.patient_name} - {schedule.patient_phone}</h3>
                    <span>Data: {format(new Date(schedule.date), 'dd/MM/yyyy')} {schedule.hour}</span>
                    <p>{schedule.description}</p>
                    <button onClick={() => cancelSchedule(schedule.id)}>Cancelar</button>
                </div>
            ))}
        </div>
    )
}

export default Scheduling;