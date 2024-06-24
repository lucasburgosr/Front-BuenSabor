import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const CallbackPage = () => {
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Aquí puedes poner la lógica para redirigir a una ruta según el rol del usuario
      navigate('/inicio'); // O la ruta que desees
    } else {
      navigate('/'); // O la ruta de login si no está autenticado
    }
  }, [isAuthenticated, user, navigate]);

  return <div>Loading...</div>; // Puedes mostrar un indicador de carga aquí
};

export default CallbackPage;
