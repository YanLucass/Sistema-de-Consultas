
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

//layouts
import Container from './components/layout/Container';
import Message from './components/layout/Message';

//pages
import Home from './components/pages/Home';
import PatientsRegister from './components/pages/PatientsRegister';
import NavBar from './components/layout/NavBar';
import ShowPatients from './components/pages/ShowPatients';
import MakeAppointment from './components/pages/MakeAppointment';
import Scheduling from './components/pages/Scheduling';
import Login from './components/pages/Login';
import PatientsAppointment from './components/pages/PatientsAppointment';

//context
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <BrowserRouter>
    <UserProvider>
    <NavBar />
    <Message />
      <Container>
        <Routes>
            <Route path = "/" element={<Home/>} />
            <Route path = "/patients/register" element={<PatientsRegister />} />
            <Route path = "/make/appointment" element={<MakeAppointment />} />
            <Route path = "/login" element={<Login />} />
            <Route path = "/patients/appointments" element={<PatientsAppointment />} />
        </Routes>
      </Container>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
