import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Inicio from "../screens/inicio/Inicio";
import Manufacturados from "../screens/manufacturados/Manufacturados";
import Insumo from "../screens/insumos/Insumos";
import UnidadMedida from "../screens/UnidadMedida/UnidadMedidaForm";
import Categoria from "../screens/categorias/Categorias";
/* import Clientes from "../screens/clientes/Clientes"; */
import Promocion from "../screens/promociones/Promociones";
import Sucursales from "../screens/sucursales/Sucursales";
import Navbar from "../componentes/common/NavBar";
import Sidebar from "../componentes/common/Sidebar";
import Empresas from "../screens/empresas/Empresas";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <div style={{ width: "100%" }}>
        <Navbar />
      </div>
      <div className="d-flex" style={{ width: "100%" }}>
        <Sidebar />
        <div style={{ flexGrow: 1 }}>
          <Routes>
            {/* Redirecciona la ruta raíz a /empresas */}
            <Route path="/" element={<Empresas />} />
            <Route path="/empresas/inicio/" element={<Inicio />} />
            <Route
              path="/manufacturados/empresas/"
              element={<Manufacturados />}
            />
            <Route path="/empresas/insumos/" element={<Insumo />} />
            <Route path="/empresas/categorias/" element={<Categoria />} />
            {/* <Route path="/empresas/clientes/:idEmpresa" element={<Clientes />} /> */}
            <Route path="/empresas/promociones/" element={<Promocion />} />
            <Route path="/sucursales/empresas/" element={<Sucursales />} />
            <Route path="/unidadMedida/empresas/" element={<UnidadMedida />} />
            {/* <Route path="/empleados" element={<Empleado />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AppRouter;
