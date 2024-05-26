/* import { useEffect } from "react";
import Empleado from "../../entidades/Empleado";
import GrillaGenerica from "../../componentes/grillaGenerica/GrillaGenerica";
import EmpleadoService from "../../servicios/EmpleadoService";
import { useAtributos } from "../../hooks/useAtributos";
import { Rol } from "../../enums/Rol";

export default function Empleados() {
    const {setNombreApartado} = useAtributos();

    const empleado = new Empleado();
    const empleadoBase = new Empleado();
    const {sucursales, modalSucursales, getSucursalesRest} = useAtributos();

    const roles = Object.values(Rol).splice(0, Object.values(Rol).length/2).map(rol => { return {id:rol, denominacion:rol}})

    const urlapi = import.meta.env.VITE_API_URL;
    const empleadoService = new EmpleadoService(urlapi + "/empleados");

    useEffect(() => {
        getSucursalesRest();
        setNombreApartado('Empleados');
    }, []);
    
    return (
        
    <div className="m-3">
        <GrillaGenerica entidadPrevia={empleado} entidadBase={empleadoBase} apiServicio={empleadoService} listaSelects={{'rol':[roles], 'sucursal':[sucursales, modalSucursales]}}/>
    </div>

    )
} */