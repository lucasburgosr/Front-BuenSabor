//import { useEffect } from "react";

//import GrillaGenerica from "../../componentes/grillaGenerica/GrillaGenerica";
//import { useAtributos } from "../../hooks/useAtributos";
//import { useSelector } from "react-redux";
//import { RootState } from "../../redux/store/store";

/*export default function Empleados() {
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
*/

import React from 'react';

// Definición del tipo de empleado
type Empleado = {
  id: number;
  rol: 'Superadmin' | 'admin' | 'cocinero' | 'delivery' | 'cajero';
};

// Lista de empleados de ejemplo
const empleados: Empleado[] = [
  { id: 1, rol: 'Superadmin' },
  { id: 2, rol: 'admin' },
  { id: 3, rol: 'cocinero' },
  { id: 4, rol: 'delivery' },
  { id: 5, rol: 'cajero' },
];

const Empleados: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', paddingTop: '50px' }}>
      <div style={{ width: '30%' }}>
        <h2 style={{ textAlign: 'center' }}>Lista de Empleados</h2>
        <table style={{ backgroundColor: '#a6c732', borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#a6c732' }}>ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#a6c732' }}>Rol</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado) => (
              <tr key={empleado.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#e0ebc2' }}>{empleado.id}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#e0ebc2' }}>{empleado.rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Empleados;


