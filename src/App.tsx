// App.tsx

import React, { useEffect, useState } from "react";
import AppRouter from "../src/routes/AppRouter";
import { useAppDispatch } from "./redux/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import EmpleadoService from "./servicios/EmpleadoService";
import {
  selectEmpleado,
  selectSucursal,
} from "./redux/slices/slicesUnificados";
import { callApi } from "./componentes/auth0/callApi";

const App: React.FC = () => {
  const empleadoService = new EmpleadoService("/empleados");

  const dispatch = useAppDispatch();

  const {
    isAuthenticated,
    user: userAuth0,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokenAndEmpleado = async () => {
      try {
        // Obtener el token y guardarlo en localStorage
        const token = await callApi(getAccessTokenSilently);
        
        if (!token) {
          throw new Error("No se pudo obtener el token");
        }

        console.log("Token obtenido:", token);

        // Aquí continuas con la lógica para obtener el empleado
        if (!userAuth0 || !userAuth0.email) {
          console.error("User email not available");
          setError("User email not available");
          return;
        }

        const empleado = await empleadoService.getEmpleadoByMail(userAuth0.email);
        if (empleado) {
          console.log("Empleado encontrado:", empleado);
          dispatch(selectEmpleado(empleado));
          if(empleado.rol === "COCINERO") {
            dispatch(selectSucursal(empleado.sucursal));
          }
        }
      } catch (error) {
        console.error("Error en la aplicación:", error);
        setError("Error en la aplicación");
      } finally {
        setLoadingUser(false);
      }
    };

    if (isAuthenticated) {
      fetchTokenAndEmpleado();
    } else if (!isLoading) {
      console.log("No autenticado, redirigiendo al login");
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect, userAuth0]);

  if (isLoading || loadingUser) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>; // Manejo de error
  }

  return (
    <div style={{ width: "100%" }}>
      <AppRouter />
    </div>
  );
};

export default App;
