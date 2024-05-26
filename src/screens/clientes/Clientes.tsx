import Cliente from "../../entidades/Cliente";
import GrillaGenerica from "../../componentes/grillaGenerica/GrillaGenerica";
import ClienteService from "../../servicios/ClienteService";
import { useAtributos } from "../../hooks/useAtributos";
import { useEffect } from "react";
import { PedidosContextProvider } from "../../context/PedidosContext";
import { DomiciliosContextProvider } from "../../context/DomiciliosContext";

export default function Clientes() {
    const {setNombreApartado} = useAtributos();

    const cliente = new Cliente();
    const clienteBase = new Cliente();

    const urlapi = import.meta.env.VITE_API_URL;
    const clienteService = new ClienteService(urlapi + "/clientes");

    useEffect(() => {
        setNombreApartado('Clientes');
    }, []);
    
    return (
    <div className="m-3">
        <PedidosContextProvider>
        <DomiciliosContextProvider>
            <GrillaGenerica entidadPrevia={cliente} entidadBase={clienteBase} apiServicio={clienteService} sinNuevo/>
        </DomiciliosContextProvider>
        </PedidosContextProvider>
    </div>
    )
}