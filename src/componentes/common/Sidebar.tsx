import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  cilBalanceScale,
  cilBarChart,
  cilBuilding,
  cilCart,
  cilFastfood,
  cilPeople,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CNavGroup,
  CNavItem,
  CNavTitle,
  CSidebar,
  CSidebarNav,
} from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import { cilDollar } from "@coreui/icons";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Obtener el idEmpresa de la URL
  const urlParts = location.pathname.split("/");
  const empresaId = urlParts[urlParts.length - 1];
  const handleTabChange = (section: string) => {
    navigate(`/${section}/empresas/${empresaId}`);
  };

  const shouldShowSidebar = !["/"].includes(location.pathname);

  if (!shouldShowSidebar) {
    return null; // No renderizar el sidebar si la ruta es '/special-view'
  }

  return (
    <div>
      <CSidebar
        className="border-end d-flex flex-column"
        style={{ height: "104vh", backgroundColor: "#e2e9d0" }}
      >
        <CSidebarNav>
          <CNavTitle>Menu</CNavTitle>
          <CNavItem>
            <Link to={`/empresas/inicio/${empresaId}`} className="nav-link">
              <CIcon customClassName="nav-icon" icon={cilBarChart} />
              Inicio
            </Link>
          </CNavItem>
          <CNavItem>
            <Link to={`/sucursales/empresas/${empresaId}`} className="nav-link">
              <CIcon customClassName="nav-icon" icon={cilFastfood} />
              Sucursales
            </Link>
          </CNavItem>
          <CNavItem>
            <Link to={`/empresas/categorias/${empresaId}`} className="nav-link">
              <CIcon customClassName="nav-icon" icon={cilPeople} />
              Categorías
            </Link>
          </CNavItem>
          <CNavItem>
            <Link to={`/empresas/clientes/${empresaId}`} className="nav-link">
              <CIcon customClassName="nav-icon" icon={cilBuilding} />
              Clientes
            </Link>
          </CNavItem>
          <CNavGroup
            toggler={
              <>
                <CIcon customClassName="nav-icon" icon={cilFastfood} />
                Productos
              </>
            }
          >
            <CNavItem>
              <Link
                to={`/manufacturados/empresas/${empresaId}`}
                className="nav-link"
              >
                <span className="nav-icon">
                  <span className="nav-icon-bullet"></span>
                </span>
                Lista de Productos
              </Link>
            </CNavItem>
            <CNavItem>
              <Link to={`/empresas/insumos/${empresaId}`} className="nav-link">
                <span className="nav-icon">
                  <span className="nav-icon-bullet"></span>
                </span>
                Insumos
              </Link>
            </CNavItem>
          </CNavGroup>

          <CNavItem>
            <Link
              to={`/empresas/promociones/${empresaId}`}
              className="nav-link"
            >
              <CIcon customClassName="nav-icon" icon={cilDollar} />
              Promociones
            </Link>
          </CNavItem>

          <CNavGroup
            toggler={
              <>
                <CIcon customClassName="nav-icon" icon={cilPeople} />
                Empleados
              </>
            }
          >
            <CNavItem>
              <Link
                to={`/empresas/empleados/${empresaId}`}
                className="nav-link"
              >
                <span className="nav-icon">
                  <span className="nav-icon-bullet"></span>
                </span>
                Lista de Empleados
              </Link>
            </CNavItem>
            <CNavItem>
              <Link to={`/empresas/roles/${empresaId}`} className="nav-link">
                <span className="nav-icon">
                  <span className="nav-icon-bullet"></span>
                </span>
                Roles
              </Link>
            </CNavItem>
          </CNavGroup>
          <CNavItem>
            <Link to={`/empresas/insumos${empresaId}`} className="nav-link">
              <CIcon customClassName="nav-icon" icon={cilCart} />
              Insumos
            </Link>
          </CNavItem>
          <CNavItem>
            <Link
              to={`unidadMedida/empresas/${empresaId}`}
              className="nav-link"
            >
              <CIcon customClassName="nav-icon" icon={cilBalanceScale} />
              Unidad de Medida
            </Link>
          </CNavItem>
          <CNavItem>
            <Link to={`/`} className="nav-link">
              Volver a Empresas
            </Link>
          </CNavItem>
        </CSidebarNav>
      </CSidebar>
    </div>
  );
};

export default Sidebar;
