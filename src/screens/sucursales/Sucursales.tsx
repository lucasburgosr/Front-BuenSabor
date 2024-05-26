import { useEffect } from "react";
import Sucursal from "../../entidades/Sucursal";
import { useAtributos } from "../../hooks/useAtributos";
import SucursalService from "../../servicios/SucursalService";
import GrillaGenerica from "../../componentes/grillaGenerica/GrillaGenerica";

export default function Sucursales() {
    const {empresas, modalEmpresas, getEmpresasRest, setNombreApartado} = useAtributos();

    const sucursal = new Sucursal();
    const sucursalBase = new Sucursal();

    const urlapi = import.meta.env.VITE_API_URL;
    const sucursalesService = new SucursalService(urlapi + "/sucursales");

    useEffect(() => {
        setNombreApartado('Sucursales');
        getEmpresasRest();
    }, []);
    
    return (
        
    <div className="m-3">
        <GrillaGenerica entidadPrevia={sucursal} entidadBase={sucursalBase} apiServicio={sucursalesService} listaSelects={{'empresa':[empresas, modalEmpresas]}} />
    </div>

    )
}