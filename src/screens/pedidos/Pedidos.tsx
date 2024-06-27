import { useEffect, useState } from "react";
import Pedido from "../../entidades/Pedido";
import PedidoService from "../../servicios/PedidoService";
import TablePedidos from "./TablePedidos";
import { Typography } from "@mui/material";


export default function Pedidos() {
    const [data, setData] = useState<Pedido[]>([]);
    const pedidoService = new PedidoService();

    useEffect(() => {
        const fetchData = async () => {
            const response = await pedidoService.getAll();
            setData(response);
        };

        fetchData();
    }, []);

    const handleUpdate = (updatedPedido: Pedido) => {
        setData((prevData) => prevData.map(pedido => 
            pedido.id === updatedPedido.id ? updatedPedido : pedido
        ));
    };

    const deleteEntidad = async (id: number) => {
        await pedidoService.delete(id);
        setData((prevData) => prevData.filter(pedido => pedido.id !== id));
    };

    return (
        <div className="m-3">
            <Typography variant="h4" gutterBottom>
                Pedidos
            </Typography>
            <TablePedidos 
                data={data}
                handleUpdate={handleUpdate}
                deleteEntidad={deleteEntidad}
            />
        </div>
    );
}