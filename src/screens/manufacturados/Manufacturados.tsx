import { useEffect } from "react";
import ArticuloManufacturado from "../../entidades/ArticuloManufacturado";
import GrillaGenerica from "../../componentes/grillaGenerica/GrillaGenerica";
import ArticuloManufacturadoService from "../../servicios/ArticuloManufacturadoService";
import { useAtributos } from "../../hooks/useAtributos";
import { useParams } from "react-router-dom";

export default function Manufacturados() {
    const {setNombreApartado} = useAtributos();
    const { idEmpresa } = useParams();

    const manufacturado = new ArticuloManufacturado();
    const manufacturadoBase = new ArticuloManufacturado();
    const {categorias, modalCategorias, unidadesMedida, modalUnidadesMedida, getCategoriasRest, getUnidadesMedidaRest} = useAtributos();

    const urlapi = import.meta.env.VITE_API_URL;
  const articuloManufacturadoService = new ArticuloManufacturadoService(
    `${urlapi}/manufacturados/empresas/${idEmpresa}`
  );

    useEffect(() => {
        getCategoriasRest();
        getUnidadesMedidaRest();
        setNombreApartado('Manufacturados');
    }, []);
    
    return (
        
    <div className="m-3">
        <GrillaGenerica entidadPrevia={manufacturado} entidadBase={manufacturadoBase} apiServicio={articuloManufacturadoService} listaSelects={{ 'unidadMedida': [unidadesMedida, modalUnidadesMedida], 'categoria': [categorias, modalCategorias] }} data={[]} />
    </div>

    )
}