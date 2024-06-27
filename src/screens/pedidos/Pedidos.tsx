import { useEffect, useState } from "react";
import Pedido from "../../entidades/Pedido";
import PedidoService from "../../servicios/PedidoService";
import { Typography } from "@mui/material";
import Domicilio from "../../entidades/Domicilio";
import TablePedidos from "./TablePedidos";

export default function Pedidos() {
    const [data, setData] = useState<Pedido[]>([]);
    const urlapi = import.meta.env.VITE_API_URL;
    const pedidoService = new PedidoService(urlapi + "/pedidos");

    useEffect(() => {
        const fetchData = async () => {
            const response = await pedidoService.getAll();
            setData(response);
        };

        fetchData();
    }, []);

    const openModalPedidos = () => {
        // Lógica para abrir modal de pedidos
    };

    const openModalDomicilios = (domicilios: Domicilio[]) => {
        // Lógica para abrir modal de domicilios
    };

    const cambiarBooleano = (value: number, atributo: string) => {
        // Lógica para cambiar atributo booleano
    };

    const handleOpenModal = (id: number) => {
        // Lógica para abrir modal de modificación
    };

    const deleteEntidad = (id: number) => {
        // Lógica para eliminar entidad
    };

    return (
        <div className="m-3">
            <Typography variant="h4" gutterBottom>
                Pedidos
            </Typography>
            <TablePedidos 
                data={data}
                openModalPedidos={openModalPedidos}
                openModalDomicilios={openModalDomicilios}
                cambiarBooleano={cambiarBooleano}
                handleOpenModal={handleOpenModal}
                deleteEntidad={deleteEntidad}
            />
        </div>
    );
}