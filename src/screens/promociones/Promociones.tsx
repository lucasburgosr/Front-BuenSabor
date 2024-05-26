import { useEffect } from "react";
import Promocion from "../../entidades/Promocion";
import GrillaGenerica from "../../componentes/grillaGenerica/GrillaGenerica";
import { useAtributos } from "../../hooks/useAtributos";
import PromocionService from "../../servicios/PromocionService";
import { TipoPromocion } from "../../enums/TipoPromocion";

export default function Promociones() {
    const {setNombreApartado} = useAtributos();

    const promocion = new Promocion();
    const promocionBase = new Promocion();

    const tiposPromocion = Object.values(TipoPromocion).splice(0, Object.values(TipoPromocion).length/2).map(tipo => { return {id:tipo, denominacion:tipo}})

    const urlapi = import.meta.env.VITE_API_URL;
    const promocionesService = new PromocionService(urlapi + "/promociones");

    useEffect(() => {
        setNombreApartado('Promociones');
    }, []);
    
    return (
        
    <div className="m-3">
        <GrillaGenerica entidadPrevia={promocion} entidadBase={promocionBase} apiServicio={promocionesService} listaSelects={{'tipoPromocion':[tiposPromocion]}} />
    </div>

    )
}