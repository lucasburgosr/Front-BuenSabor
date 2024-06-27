import { Routes, Route } from "react-router-dom";
import Inicio from "../screens/inicio/Inicio";
import Manufacturados from "../screens/manufacturados/Manufacturados";
import Insumo from "../screens/insumos/Insumos";
import UnidadMedida from "../screens/UnidadMedida/UnidadMedidaForm";
import Categoria from "../screens/categorias/Categorias";
import Promocion from "../screens/promociones/Promociones";
import Sucursales from "../screens/sucursales/Sucursales";
import Navbar from "../componentes/common/NavBar";
import Sidebar from "../componentes/common/Sidebar";
import Empresas from "../screens/empresas/Empresas";
import PrivateRoute from "../componentes/auth0/PrivateRoute";
import Empleados from "../screens/empleados/Empleados";
import CallbackPage from "../componentes/auth0/CallbackPage";
import Pedidos from "../screens/pedidos/Pedidos";

const AppRouter: React.FC = () => {
  return (
    <>
      <div style={{ width: "100%" }}>
        <Navbar />
      </div>
      <div className="d-flex" style={{ width: "100%" }}>
        <Sidebar />
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/callback" element={<CallbackPage />} />{" "}
            {/* Maneja la ruta /callback */}
            <Route
              path="/"
              element={
                <PrivateRoute
                  component={Empresas}
                  allowedRoles={[
                    "SUPERADMIN",
                    "ADMIN",
                    "CAJERO",
                    "DELIVERY",
                    "COCINERO",
                  ]}
                />
              }
            />
            <Route
              path="/inicio"
              element={
                <PrivateRoute
                  component={Inicio}
                  allowedRoles={["SUPERADMIN", "ADMIN", "CAJERO"]}
                />
              }
            />
            <Route
              path="/manufacturados"
              element={
                <PrivateRoute
                  component={Manufacturados}
                  allowedRoles={["SUPERADMIN", "ADMIN", "COCINERO"]}
                />
              }
            />
            <Route
              path="/insumos"
              element={
                <PrivateRoute
                  component={Insumo}
                  allowedRoles={["SUPERADMIN", "ADMIN", "COCINERO"]}
                />
              }
            />
            <Route
              path="/categorias"
              element={
                <PrivateRoute
                  component={Categoria}
                  allowedRoles={["SUPERADMIN", "ADMIN"]}
                />
              }
            />
            <Route
              path="/promociones"
              element={
                <PrivateRoute
                  component={Promocion}
                  allowedRoles={["SUPERADMIN", "ADMIN", "CAJERO"]}
                />
              }
            />
            <Route
              path="/sucursales"
              element={
                <PrivateRoute
                  component={Sucursales}
                  allowedRoles={[
                    "SUPERADMIN",
                    "ADMIN",
                    "DELIVERY",
                    "CAJERO",
                    "COCINERO",
                  ]}
                />
              }
            />
            <Route
              path="/empleados"
              element={
                <PrivateRoute
                  component={Empleados}
                  allowedRoles={["SUPERADMIN", "ADMIN"]}
                />
              }
            />
            <Route
              path="/unidadMedida"
              element={
                <PrivateRoute
                  component={UnidadMedida}
                  allowedRoles={["SUPERADMIN", "ADMIN"]}
                />
              }
            />
            <Route
              path="/pedidos"
              element={
                <PrivateRoute
                  component={Pedidos}
                  allowedRoles={["SUPERADMIN", "ADMIN", "COCINERO", "CAJERO", "DELIVERY"]}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AppRouter;
