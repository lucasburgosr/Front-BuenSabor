import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import Pedido from "../../entidades/Pedido";
import { useAppSelector } from "../../redux/hooks";

interface TablePedidosProps {
    data: Pedido[];
    openModalPedidos: () => void;
    openModalDomicilios: (domicilios: any[]) => void; // Ajusta el tipo según sea necesario
    cambiarBooleano: (value: number, atributo: string) => void;
    handleOpenModal: (id: number) => void;
    deleteEntidad: (id: number) => void;
}

export default function TablePedidos({
    data,
    openModalPedidos,
    openModalDomicilios,
    cambiarBooleano,
    handleOpenModal,
    deleteEntidad,
}: TablePedidosProps) {
    const empleado = useAppSelector((state) => state.empleado.selectedEntity);
    const userRole = empleado.rol;
    const canEdit = ["ADMIN", "SUPERADMIN"].includes(userRole);

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
                        {canEdit && <TableCell>Eliminar</TableCell>}
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
                                        onClick={() => handleOpenModal(pedido.id)}
                                    >
                                        MODIFICAR
                                    </Button>
                                </TableCell>
                            )}
                            {canEdit && (
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#e05151",
                                            color: "#ffffff",
                                            fontWeight: "bold",
                                        }}
                                        onClick={() => deleteEntidad(pedido.id)}
                                    >
                                        ELIMINAR
                                    </Button>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}