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
  const { authenticated } = useContext(Context);
  const navigate = useNavigate();

  // Redirect to login page if not authenticated
  if (!authenticated) {
    navigate('/login');
  }

  const [appointment, setAppointment] = useState({});
  // To store the currently logged-in patient
  const [patient, setPatient] = useState({});
  // Get token
  const storedToken = localStorage.getItem('token');
  const [token] = useState(storedToken ? JSON.parse(storedToken) : '');
  // Check authentication to protect the route

  useEffect(() => {
    // Check authentication before doing anything else
    if (!authenticated) {
      navigate('/login');
      return; // Stop execution if not authenticated
    }
  });

  // Flash message
  const { setFlashMessage } = useFlashMessage();

  // Handle input changes
  function onChange(e) {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  }

  // Fetch current patient data if the user is logged in
  useEffect(() => {
    api.get('/patients/getCurrentPatient', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setPatient(response.data.user);
      // Add 'patientId' to 'appointment'
      setAppointment({ ...appointment, patientId: response.data.user.id });
    })
    .catch((err) => {
      console.log('Error fetching current user', err);
    });
  }, [token]);

  // Consume the API to schedule an appointment
  async function scheduleAppointment() {
    let msgText = 'Appointment scheduled successfully!';
    let msgType = 'success';
    try {
      const response = await api.post(
        `/schedules/makeAppointment`,
        appointment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate('/patients/appointments');
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

  // Handle form submission
  function submit(e) {
    e.preventDefault();
    scheduleAppointment();
  }

  return (
    <div>
      <h2>Schedule appointment:</h2>
      <Input
        type="date"
        text="Date"
        id="date"
        name="date"
        handleOnChange={onChange}
      />

      <Input
        type="time"
        text="Time"
        id="hour"
        name="hour"
        handleOnChange={onChange}
      />

      <Input
        type="text"
        text="Description"
        id="description"
        name="description"
        handleOnChange={onChange}
      />

      <input type="submit" value="Schedule" onClick={submit} />
    </div>
  );
}

export default MakeAppointment;
