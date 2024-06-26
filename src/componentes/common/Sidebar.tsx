import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  cilBalanceScale,
  cilBarChart,
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useAuth0 } from "@auth0/auth0-react";
import Sucursal from "../../entidades/Sucursal";
import { selectSucursal } from "../../redux/slices/slicesUnificados";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = useSelector(
    (state: RootState) => state.empleado.selectedEntity.rol
  );
  const isAuthenticated = useAuth0();
  const dispatch = useDispatch();

  const empresaSeleccionada = useSelector(
    (state: RootState) => state.empresa.selectedEntity
  );
  const sucursales: Sucursal[] = empresaSeleccionada
    ? empresaSeleccionada.sucursales
    : [];

  const selectedSucursal = useSelector(
    (state: RootState) => state.sucursal.selectedEntity
  );

  const handleSucursalChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = parseInt(event.target.value, 10); // Asume que los IDs son números
    const selectedSucursal = sucursales.find(
      (sucursal) => sucursal.id === selectedId
    );
    if (selectedSucursal) {
      dispatch(selectSucursal(selectedSucursal));
    }
  };

  const shouldShowSidebar = !["/"].includes(location.pathname);

  if (!shouldShowSidebar) {
    return null; // No renderizar el sidebar si la ruta es '/' o si el usuario no está autenticado, no tiene rol, o no hay empresa seleccionada
  }

  return (
    <div>
      <CSidebar
        className="border-end d-flex flex-column"
        style={{ height: "104vh", backgroundColor: "#e2e9d0" }}
      >
        <CSidebarNav>
          <CNavTitle>Menu</CNavTitle>
          {/* Selector de Sucursales */}
          {(userRole === "SUPERADMIN" || userRole === "ADMIN") &&
            sucursales.length > 0 && (
              <CNavItem>
                <select
                  value={selectedSucursal ? selectedSucursal.id : ""}
                  onChange={handleSucursalChange}
                  className="form-select"
                >
                  <option value="" disabled>
                    Seleccione una sucursal
                  </option>
                  {sucursales.map((sucursal) => (
                    <option key={sucursal.id} value={sucursal.id}>
                      {sucursal.nombre}
                    </option>
                  ))}
                </select>
              </CNavItem>
            )}
          {(userRole === "SUPERADMIN" ||
            userRole === "ADMIN" ||
            userRole === "CAJERO") && (
            <CNavItem>
              <Link to={`/inicio`} className="nav-link">
                <CIcon customClassName="nav-icon" icon={cilBarChart} />
                Inicio
              </Link>
            </CNavItem>
          )}
          {(userRole === "SUPERADMIN" ||
            userRole === "ADMIN" ||
            userRole === "DELIVERY" ||
            userRole === "COCINERO" ||
            userRole === "CAJERO") && (
            <CNavItem>
              <Link to={`/sucursales`} className="nav-link">
                <CIcon customClassName="nav-icon" icon={cilFastfood} />
                Sucursales
              </Link>
            </CNavItem>
          )}
          {(userRole === "SUPERADMIN" || userRole === "ADMIN") && (
            <CNavItem>
              <Link to={`/categorias`} className="nav-link">
                <CIcon customClassName="nav-icon" icon={cilPeople} />
                Categorías
              </Link>
            </CNavItem>
          )}
          {(userRole === "SUPERADMIN" ||
            userRole === "ADMIN" ||
            userRole === "COCINERO" ||
            userRole === "CAJERO") && (
            <CNavGroup
              toggler={
                <>
                  <CIcon customClassName="nav-icon" icon={cilFastfood} />
                  Productos
                </>
              }
            >
              <CNavItem>
                <Link to={`/manufacturados`} className="nav-link">
                  <span className="nav-icon">
                    <span className="nav-icon-bullet"></span>
                  </span>
                  Lista de Productos
                </Link>
              </CNavItem>
              <CNavItem>
                <Link to={`/insumos`} className="nav-link">
                  <span className="nav-icon">
                    <span className="nav-icon-bullet"></span>
                  </span>
                  Insumos
                </Link>
              </CNavItem>
            </CNavGroup>
          )}
          {(userRole === "SUPERADMIN" || userRole === "ADMIN") && (
            <CNavItem>
              <Link to={`/promociones`} className="nav-link">
                <CIcon customClassName="nav-icon" icon={cilDollar} />
                Promociones
              </Link>
            </CNavItem>
          )}
          {(userRole === "SUPERADMIN" || userRole === "ADMIN") && (
            <CNavItem>
              <Link to={`/empleados`} className="nav-link">
                <CIcon customClassName="nav-icon" icon={cilDollar} />
                Empleados
              </Link>
            </CNavItem>
          )}

          {(userRole === "SUPERADMIN" || userRole === "ADMIN") && (
            <CNavItem>
              <Link to={`/unidadMedida`} className="nav-link">
                <CIcon customClassName="nav-icon" icon={cilBalanceScale} />
                Unidad de Medida
              </Link>
            </CNavItem>
          )}
          {(userRole === "SUPERADMIN" || userRole === "ADMIN") && (
            <CNavItem>
              <Link to={`/`} className="nav-link">
                Volver a Empresas
              </Link>
            </CNavItem>
          )}
        </CSidebarNav>
      </CSidebar>
    </div>
  );
};

export default Sidebar;
