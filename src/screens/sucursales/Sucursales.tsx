// src/componentes/sucursales/Sucursales.tsx
import { useEffect } from 'react';
import Sucursal from '../../entidades/Sucursal';
import { useAtributos } from '../../hooks/useAtributos';
import SucursalService from '../../servicios/SucursalService';
import GrillaGenerica from '../../componentes/grillaGenerica/GrillaGenerica';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store'; // Asegúrate de importar RootState

export default function Sucursales() {
  const { empresas, modalEmpresas, getEmpresasRest, setNombreApartado } = useAtributos();

  const sucursal = new Sucursal();
  const sucursalBase = new Sucursal();

  const urlapi = import.meta.env.VITE_API_URL;

  const empresaSeleccionada = useSelector(
    (state: RootState) => state.empresa.selectedEntity // Asegúrate de que la ruta sea correcta
  );

  useEffect(() => {
    setNombreApartado("Sucursales");
    getEmpresasRest();
  }, []);

  if (!empresaSeleccionada) {
    return <div>Selecciona una empresa para ver las sucursales.</div>;
  }

  const sucursalesService = new SucursalService(
    `${urlapi}/sucursales/empresas/${empresaSeleccionada.id}`
  );

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
