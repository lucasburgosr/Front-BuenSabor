import { useEffect } from "react";
import { useAtributos } from "../../hooks/useAtributos";
import UnidadMedidaFrom from "./UnidadMedidaForm";

function Categorias() {
    const {setNombreApartado} = useAtributos();

    useEffect(() => {
        setNombreApartado('Categorías');
    }, []);

    return (
        <div className="m-3">
            <UnidadMedidaFrom />
        </div>
    );
}

export default Categorias;