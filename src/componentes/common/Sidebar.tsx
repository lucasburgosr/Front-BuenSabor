import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cilBarChart, cilBuilding, cilCart, cilFastfood, cilPeople } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CNavGroup, CNavItem, CNavTitle, CSidebar, CSidebarNav } from "@coreui/react";
import '@coreui/coreui/dist/css/coreui.min.css';
import { cilDollar } from "@coreui/icons";

const Sidebar: React.FC = () => {
    const location = useLocation();
    const shouldShowSidebar = !['/empresas'].includes(location.pathname);

    if (!shouldShowSidebar) {
        return null; // No renderizar el sidebar si la ruta es '/special-view'
    }

    return (
        <div>
            <CSidebar className="border-end d-flex flex-column" style={{ height: '104vh', backgroundColor: '#e2e9d0' }}>
                <CSidebarNav>
                    <CNavTitle>
                        Menu
                    </CNavTitle>
                    <CNavItem>
                        <Link to="/Inicio" className="nav-link" >
                            <CIcon customClassName="nav-icon" icon={cilBarChart} />
                            Inicio
                        </Link>
                    </CNavItem>
                    <CNavItem>
                        <Link to="/sucursales" className="nav-link">
                        <CIcon customClassName="nav-icon" icon={cilFastfood} />
                            Sucursales
                        </Link>
                    </CNavItem>
                    <CNavItem>
                        <Link to="/categorias" className="nav-link">
                        <CIcon customClassName="nav-icon" icon={cilPeople} />
                            Categorías
                        </Link>
                    </CNavItem>
                    <CNavItem>
                        <Link to="/clientes" className="nav-link">
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
                            <Link to="/manufacturados" className="nav-link" >
                                <span className="nav-icon"><span className="nav-icon-bullet"></span></span>
                                Lista de Productos
                            </Link>
                        </CNavItem>
                        <CNavItem>
                            <Link to="/categorias" className="nav-link">
                                <span className="nav-icon"><span className="nav-icon-bullet"></span></span>
                                Categorías
                            </Link>
                        </CNavItem>
                    </CNavGroup>

                    <CNavItem>
                        <Link to="/promociones" className="nav-link">
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
                            <Link to="/empleados" className="nav-link" >
                                <span className="nav-icon"><span className="nav-icon-bullet"></span></span>
                                Lista de Empleados
                            </Link>
                        </CNavItem>
                        <CNavItem>
                            <Link to="/roles" className="nav-link">
                                <span className="nav-icon"><span className="nav-icon-bullet"></span></span>
                                Roles
                            </Link>
                        </CNavItem>
                    </CNavGroup>
                    <CNavItem>
                        <Link to="/insumos" className="nav-link">
                            <CIcon customClassName="nav-icon" icon={cilCart} />
                            Insumos
                        </Link>
                    </CNavItem>
                </CSidebarNav>
            </CSidebar>
        </div>
    );
}

export default Sidebar;
