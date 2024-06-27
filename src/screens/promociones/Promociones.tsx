import { useEffect } from "react";
import Promocion from "../../entidades/Promocion";
import GrillaGenerica from "../../componentes/grillaGenerica/GrillaGenerica";
import { useAtributos } from "../../hooks/useAtributos";
import { TipoPromocion } from "../../enums/TipoPromocion";
import { useAppSelector } from "../../redux/hooks";

export default function Promociones() {
    const {setNombreApartado} = useAtributos();

    const promocion = new Promocion();
    const promocionBase = new Promocion();

    const sucursal = useAppSelector((state) => state.sucursal.selectedEntity);

    const promociones = sucursal.promociones;
    console.log(promociones)

    const tiposPromocion = Object.values(TipoPromocion).splice(0, Object.values(TipoPromocion).length/2).map(tipo => { return {id:tipo, denominacion:tipo}})

    useEffect(() => {
        setNombreApartado('Promociones');
    }, []);
    
    return (
        
    <div className="m-3">
        <GrillaGenerica entidadPrevia={promocion} entidadBase={promocionBase} listaSelects={{ 'tipoPromocion': [tiposPromocion] }} data={promociones} />
    </div>

    )
}