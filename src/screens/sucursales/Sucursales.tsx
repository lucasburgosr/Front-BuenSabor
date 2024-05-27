import { useEffect } from "react";
import Sucursal from "../../entidades/Sucursal";
import { useAtributos } from "../../hooks/useAtributos";
import SucursalService from "../../servicios/SucursalService";
import GrillaGenerica from "../../componentes/grillaGenerica/GrillaGenerica";
import { useParams } from "react-router-dom";

export default function Sucursales() {
  const { empresas, modalEmpresas, getEmpresasRest, setNombreApartado } =
    useAtributos();
  const { idEmpresa } = useParams();

  // Verifica si idEmpresa está disponible y es un número
  if (idEmpresa) {
    console.log("ID disponible:", idEmpresa);
    // Utiliza el ID disponible para realizar operaciones
  } else {
    console.log("ID no disponible");
  }

  const sucursal = new Sucursal();
  const sucursalBase = new Sucursal();

  const urlapi = import.meta.env.VITE_API_URL;
  const sucursalesService = new SucursalService(
    `${urlapi}/sucursales/empresas/${idEmpresa}`
  );

  useEffect(() => {
    setNombreApartado("Sucursales");
    getEmpresasRest();
  }, []);

  return (
    <div className="m-3">
      <GrillaGenerica
        entidadPrevia={sucursal}
        entidadBase={sucursalBase}
        apiServicio={sucursalesService}
        listaSelects={{ empresa: [empresas, modalEmpresas] }}
      />
    </div>
  );
}
