import { useEffect } from "react";
import { useAtributos } from "../../hooks/useAtributos";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store"; // Asegúrate de importar RootState
import CategoriaService from "../../servicios/CategoriaService";
import CategoriasForm from "./CategoriasForm";

export default function Categorias() {
  const {
    getEmpresasRest,
    setNombreApartado,
    setCategorias,
  } = useAtributos();

  const urlapi = import.meta.env.VITE_API_URL;

  const empresaSeleccionada = useSelector(
    (state: RootState) => state.empresa.selectedEntity // Asegúrate de que la ruta sea correcta
  );

  useEffect(() => {
    setNombreApartado("Categorías");
    getEmpresasRest();
  }, []);

  useEffect(() => {
    const fetchCategorias = async () => {
      if (empresaSeleccionada) {
        const categoriaService = new CategoriaService(
          `${urlapi}/categorias/${empresaSeleccionada.id}`
        );
        const categorias = await categoriaService.getAll();
        setCategorias(categorias);
      }
    };

    fetchCategorias();
  }, [empresaSeleccionada, setCategorias, urlapi]);

  if (!empresaSeleccionada) {
    return <div>Selecciona una empresa para ver las categorías.</div>;
  }

  return (
    <div className="m-3">
      <CategoriasForm />
    </div>
  );
}
