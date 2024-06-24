// src/componentes/sucursales/Sucursales.tsx
import Sucursal from '../../entidades/Sucursal';
import { useAtributos } from '../../hooks/useAtributos';
import GrillaGenerica from '../../componentes/grillaGenerica/GrillaGenerica';
import { useAppSelector } from '../../redux/hooks';

export default function Sucursales() {
  const { empresas, modalEmpresas } = useAtributos();

  const empleado = useAppSelector((state) => state.empleado.selectedEntity);
  const empresa = useAppSelector((state) => state.empresa.selectedEntity);

  const sucursal = new Sucursal();
  const sucursalBase = new Sucursal();

  let sucursales = [];

  if(empleado.rol !== "ADMIN" && empleado.rol !== "SUPERADMIN") {
    sucursales.push(empleado.sucursal);
  } else {
    console.log(empresa.sucursales)
    sucursales.push(...empresa.sucursales)
  }

  return (
    <div className="m-3">
      <GrillaGenerica
        entidadPrevia={sucursal}
        entidadBase={sucursalBase}
        data={sucursales}
        listaSelects={{ empresa: [empresas, modalEmpresas] }}
      />
    </div>
  );
}
