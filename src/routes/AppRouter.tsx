// src/routes/AppRouter.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { AuthenticationGuard } from "../componentes/auth0/AuthenticationGuard";
import Empleados from "../screens/empleados/Empleados";

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
            <Route path="/" element={<Empresas />} />
            <Route
              path="/inicio"
              element={<AuthenticationGuard component={Inicio} />}
            />
            <Route
              path="/manufacturados"
              element={<AuthenticationGuard component={Manufacturados} />}
            />
            <Route
              path="/insumos"
              element={<AuthenticationGuard component={Insumo} />}
            />
            <Route
              path="/categorias"
              element={<AuthenticationGuard component={Categoria} />}
            />
            <Route
              path="/promociones"
              element={<AuthenticationGuard component={Promocion} />}
            />
            <Route
              path="/sucursales"
              element={<AuthenticationGuard component={Sucursales} />}
            />
            <Route
              path="/empleados"
              element={<AuthenticationGuard component={Empleados} />}
            />
            <Route
              path="/unidadMedida"
              element={<AuthenticationGuard component={UnidadMedida} />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AppRouter;
