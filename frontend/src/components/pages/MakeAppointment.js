import api from '../../utils/api';
import styles from '../form/Form';
import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Layout
import Input from '../form/Input';

// Hook
import useFlashMessage from '../../hooks/useFlashMessage';

// Context
import Context from '../../context/UserContext';

function MakeAppointment() {
  const [appointment, setAppointment] = useState({});
  // Para armazenar o paciente atualmente logado
  const [patient, setPatient] = useState({});

  // Obter autenticação para proteger a rota
  const { authenticated } = useContext(Context);

  // Obter token
  const [token] = useState(localStorage.getItem('token') || '');

  const { id } = useParams();
  const navigate = useNavigate();

  // Mensagem flash
  const { setFlashMessage } = useFlashMessage();

  function onChange(e) {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  }

  // Obter dados do paciente atual se o usuário estiver logado.
  useEffect(() => {
    if (!authenticated) {
      navigate('/login');
    } else {
      api
        .get('/patients/getCurrentPatient', {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        })
        .then((response) => {
          setPatient(response.data.user);
          // Adicionar 'patientId' em 'appointment'
          setAppointment({ ...appointment, patientId: response.data.user.id });
        })
        .catch((err) => {
          console.log('Deu erro ao pegar o usuário atual', err);
        });
    }
  }, [token]);

  // Consumir a API para agendar uma consulta
  async function scheduleAppointment() {
    let msgText = 'Consulta agendada com sucesso!';
    let msgType = 'success';
    try {
      const response = await api.post(
        `/schedules/makeAppointment`,
        appointment,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
    } catch (error) {
      msgType = 'error';
      if (error?.response?.data?.validation?.body?.message) {
        msgText = error.response.data.validation.body.message;
      } else if (error?.response?.data?.message) {
        msgText = error.response.data.message;
      }
    }

    setFlashMessage(msgText, msgType);
  }

  function submit(e) {
    e.preventDefault();
    // Adicionar 'patientId' à consulta
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
  );
}

export default MakeAppointment;
