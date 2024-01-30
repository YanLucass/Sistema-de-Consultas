import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Link } from "react-router-dom";
import styles from './ShowPatients.module.css'

function ShowPatients() {

    const [patients, setPatients] = useState([]);

    //get all patients from route patients/all.
    useEffect(() => {
        async function fetchPatients() {
            const response = await api.get('/patients/all');
           setPatients(response.data.patients); 
        }

        fetchPatients();
    }, []);

    return (
        <div className={styles.central}>
            <div>   
                <h2>Pacientes cadastrados:</h2>
                <p>Clique para marcar consulta</p>
            </div>

            {/* show all patients registerd */}
            {patients.map((patient, index) => (
                <div className={styles.patient} key={index}> 
                    <Link to={`/make/appointment/${patient.id}`}>
                        <div className={styles.patientInfo}>
                            <span><strong>ID:</strong> {patient.id}</span>
                            <span><strong>Nome:</strong> {patient.name}</span>
                            <span><strong>Telefone:</strong> {patient.phone}</span>
                        </div>
                    </Link>
                </div>
            ))}
        </div>   
    )
}

export default ShowPatients;