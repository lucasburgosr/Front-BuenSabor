import { useEffect, useState } from "react";
import Empresa from "../../entidades/Empresa";
import { useAtributos } from "../../hooks/useAtributos";
import EmpresaService from "../../servicios/EmpresaService";
import CardGenerica from "../../componentes/cardGenerica/CardGenerica";

export default function Empresas() {
  const { setNombreApartado } = useAtributos();
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState<Empresa | null>(null);

  const urlapi = import.meta.env.VITE_API_URL;
  const empresasService = new EmpresaService(urlapi + "/empresas");

  const empresaBase = new Empresa();

  useEffect(() => {
    setNombreApartado("Empresas");
    cargarEmpresas();
  }, []);

  const cargarEmpresas = async () => {
    try {
      const empresasData = await empresasService.getAll();
      setEmpresas(empresasData);
    } catch (error) {
      console.error("Error al cargar las empresas:", error);
    }
  };

  const handleSeleccionarEmpresa = (empresa: Empresa) => {
    setEmpresaSeleccionada(empresa); // Actualiza el estado con la empresa seleccionada
  };

  return (
    <div className="m-3 d-flex flex-column align-items-center">
      <h2>Selecciona una empresa:</h2>
      <ul>
        {empresas.map((empresa) => (
          <li key={empresa.id} style={{ listStyleType: "none", margin: "10px 0" }}>
            <CardGenerica
              entidadPrevia={empresa}
              entidadBase={empresaBase}
              apiServicio={empresasService}
              onSeleccionarEmpresa={handleSeleccionarEmpresa} // Pasa la función como prop
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

