import { useEffect } from "react";
import { useAtributos } from "../../hooks/useAtributos";
import { RootState } from "../../redux/store/store";
import CategoriasForm from "./CategoriasForm";
import { useAppSelector } from "../../redux/hooks";

export default function Categorias() {
  const { getEmpresasRest, setNombreApartado } = useAtributos();

  const empresaSeleccionada = useAppSelector(
    (state: RootState) => state.empresa.selectedEntity
  );

  useEffect(() => {
    setNombreApartado("Categorías");
    getEmpresasRest();
  }, []);

  if (!empresaSeleccionada) {
    return <div>Selecciona una empresa para ver las categorías.</div>;
  }

  return (
    <div className="m-3">
      <CategoriasForm />
    </div>
  );
}
