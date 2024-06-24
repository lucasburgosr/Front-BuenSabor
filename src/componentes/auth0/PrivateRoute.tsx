import React from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { RootState } from "../../redux/store/store";
import { useAppSelector } from "../../redux/hooks";

type Props = {
  component: React.ComponentType<object>;
  allowedRoles: string[];
};

const PrivateRoute = ({ component, allowedRoles }: Props) => {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
  const empleado = useAppSelector((state: RootState) => state.empleado.selectedEntity);

  console.log("PrivateRoute - isLoading:", isLoading);
  console.log("PrivateRoute - isAuthenticated:", isAuthenticated);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center mx-96">
        <div className="mb-4 text-2xl font-bold">Redireccionando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    loginWithRedirect();
    return null; // Renderiza nada mientras redirige al usuario
  }

  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="flex flex-col items-center justify-center mx-96">
        <div className="mb-4 text-2xl font-bold">Redireccionando...</div>
      </div>
    ),
    returnTo: import.meta.env.VITE_AUTH0_CALLBACK_URL,
  });

  return allowedRoles.includes(empleado!.rol) ? (
    <Component />
  ) : (
    <div>Acceso Denegado</div>
  );
};

export default PrivateRoute;
