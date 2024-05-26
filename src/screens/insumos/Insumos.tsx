import { useEffect } from "react";
import ArticuloInsumo from "../../entidades/ArticuloInsumo";
import GrillaGenerica from "../../componentes/grillaGenerica/GrillaGenerica";
import ArticuloInsumoService from "../../servicios/ArticuloInsumoService";
import { useAtributos } from "../../hooks/useAtributos";

export default function Insumos() {
    const {setNombreApartado} = useAtributos();

    const insumo = new ArticuloInsumo();
    const insumoBase = new ArticuloInsumo();
    const {categorias, modalCategorias, unidadesMedida, modalUnidadesMedida, getCategoriasRest, getUnidadesMedidaRest} = useAtributos();

    const urlapi = import.meta.env.VITE_API_URL;
    const articuloInsumoService = new ArticuloInsumoService(urlapi + "/insumos");

    useEffect(() => {
        getCategoriasRest();
        getUnidadesMedidaRest();
        setNombreApartado('Insumos');
    }, []);
    
    return (
        
    <div className="m-3">
        <GrillaGenerica entidadPrevia={insumo} entidadBase={insumoBase} apiServicio={articuloInsumoService} listaSelects={{'unidadMedida':[unidadesMedida, modalUnidadesMedida], 'categoria':[categorias, modalCategorias]}} />
    </div>

    )
}