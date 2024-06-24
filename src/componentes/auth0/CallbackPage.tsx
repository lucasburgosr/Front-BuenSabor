import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppSelector } from '../../redux/hooks';

const CallbackPage = () => {
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();
  const empleado = useAppSelector((state) => state.empleado.selectedEntity);

  useEffect(() => {
    if (isAuthenticated && user && empleado.rol !== "SUPERADMIN" && empleado.rol !== "ADMIN") {
      navigate('/inicio');
    } else {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  return <div>Loading...</div>;
};

export default CallbackPage;
