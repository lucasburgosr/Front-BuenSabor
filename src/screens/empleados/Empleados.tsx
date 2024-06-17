import { useEffect } from "react";
import Empleado from "../../entidades/Empleado";
import GrillaGenerica from "../../componentes/grillaGenerica/GrillaGenerica";
import { useAtributos } from "../../hooks/useAtributos";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

export default function Empleados() {
  const { setNombreApartado } = useAtributos();

  const empleado = new Empleado();
  const empleadoBase = new Empleado();
  const { sucursales, modalSucursales, getSucursalesRest } = useAtributos();

  const empresaSeleccionada = useSelector(
    (state: RootState) => state.empresa.selectedEntity // Asegúrate de que la ruta sea correcta
  );

  useEffect(() => {
    getSucursalesRest();
    setNombreApartado("Empleados");
  });

  if (!empresaSeleccionada) {
    return <div>Selecciona una empresa para ver las sucursales.</div>;
  }

  const empleados = empresaSeleccionada.sucursales.empleados;

  /* const roles = Object.values(Rol)
    .splice(0, Object.values(Rol).length / 2)
    .map((rol) => {
      return { id: rol, denominacion: rol };
    }); */

  return (
    <div className="m-3">
      <GrillaGenerica
        entidadPrevia={empleado}
        entidadBase={empleadoBase}
        data={empleados}
        listaSelects={{ sucursal: [sucursales, modalSucursales] }}
      />
    </div>
  );
}
