import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import Pedido from "../../entidades/Pedido";
import { useAppSelector } from "../../redux/hooks";
import PedidoModal from "./pedidoModal";

interface TablePedidosProps {
    data: Pedido[];
    handleUpdate: (pedido: Pedido) => void;
    deleteEntidad: (id: number) => void;
}

export default function TablePedidos({
    data,
    handleUpdate,
}: TablePedidosProps) {
    const empleado = useAppSelector((state) => state.empleado.selectedEntity);
    const userRole = empleado.rol;
    const canEdit = ["ADMIN", "SUPERADMIN"].includes(userRole);

    const [open, setOpen] = useState(false);
    const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);

    const handleClose = () => setOpen(false);

    const handleOpen = (pedido: Pedido) => {
        setSelectedPedido(pedido);
        setOpen(true);
    };

    return (
        <TableContainer component={Paper} sx={{ boxShadow: "5px 10px 2px rgba(0, 0, 0, 0.3)" }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#a6c732" }}>
                        <TableCell>Id</TableCell>
                        <TableCell>Hora Estimada de Finalización</TableCell>
                        <TableCell>Tipo de Envío</TableCell>
                        <TableCell>Forma de Pago</TableCell>
                        <TableCell>Cliente</TableCell>
                        <TableCell>Empleado</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Total</TableCell>
                        {canEdit && <TableCell>Modificar</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((pedido) => (
                        <TableRow key={pedido.id} sx={{ backgroundColor: "#e0ebc2" }}>
                            <TableCell>{pedido.id}</TableCell>
                            <TableCell>{pedido.horaEstimadaFinalizacion}</TableCell>
                            <TableCell>{pedido.tipoEnvio}</TableCell>
                            <TableCell>{pedido.formaPago}</TableCell>
                            <TableCell>{pedido.cliente.nombre}</TableCell>
                            <TableCell>{pedido.empleado.nombre}</TableCell>
                            <TableCell>{pedido.estado}</TableCell>
                            <TableCell>{pedido.total}</TableCell>
                            {canEdit && (
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#a6c732",
                                            color: "#ffffff",
                                            fontWeight: "bold",
                                        }}
                                        onClick={() => handleOpen(pedido)}
                                    >
                                        MODIFICAR
                                    </Button>
                                </TableCell>
                            )}
                            
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {selectedPedido && (
                <PedidoModal
                    open={open}
                    handleClose={handleClose}
                    pedido={selectedPedido}
                    handleUpdate={handleUpdate}
                />
            )}
        </TableContainer>
    );
}