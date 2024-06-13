// src/componentes/sucursales/Sucursales.tsx
import { useEffect } from 'react';
import Sucursal from '../../entidades/Sucursal';
import { useAtributos } from '../../hooks/useAtributos';
import GrillaGenerica from '../../componentes/grillaGenerica/GrillaGenerica';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store'; // Asegúrate de importar RootState

export default function Sucursales() {
  const { empresas, modalEmpresas, getEmpresasRest, setNombreApartado } = useAtributos();

  const sucursal = new Sucursal();
  const sucursalBase = new Sucursal();

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

  // Obtener las sucursales directamente del objeto empresaSeleccionada
  const sucursales = empresaSeleccionada.sucursales;

  return (
    <div className="m-3">
      <GrillaGenerica
        entidadPrevia={sucursal}
        entidadBase={sucursalBase}
        data={sucursales} // Pasamos las sucursales directamente a GrillaGenerica
        listaSelects={{ empresa: [empresas, modalEmpresas] }}
      />
    </div>
  );
}
