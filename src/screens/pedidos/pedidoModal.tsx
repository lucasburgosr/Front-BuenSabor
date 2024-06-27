import { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import Pedido from "../../entidades/Pedido";
import Empleado from "../../entidades/Empleado";
import PedidoService from "../../servicios/PedidoService";

interface PedidoModalProps {
    open: boolean;
    handleClose: () => void;
    pedido: Pedido;
    handleUpdate: (pedido: Pedido) => void;
}

const estados = ["Preparacion", "Pendiente", "Cancelado", "Rechazado", "Entregado"];

export default function PedidoModal({ open, handleClose, pedido, handleUpdate }: PedidoModalProps) {
    const [estado, setEstado] = useState(pedido.estado);
    const [empleadoId, setEmpleadoId] = useState(pedido.empleado.id);
    const [empleados, setEmpleados] = useState<Empleado[]>([]);
    
    const sucursalSeleccionada = useAppSelector(state => state.sucursal.selectedEntity);

    useEffect(() => {
        setEstado(pedido.estado);
        setEmpleadoId(pedido.empleado.id);
    }, [pedido]);

    useEffect(() => {
        const fetchEmpleados = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/empleados');
                const data = await response.json();
                const filteredEmpleados = data.filter((empleado: Empleado) =>
                    empleado.rol !== "ADMIN" && empleado.rol !== "SUPERADMIN" &&
                    (!sucursalSeleccionada || empleado.sucursal?.id === sucursalSeleccionada.id)
                );
                setEmpleados(filteredEmpleados);
            } catch (error) {
                console.error('Error fetching empleados:', error);
            }
        };

        fetchEmpleados();
    }, [sucursalSeleccionada]);

    const handleEmpleadoIdChange = (event: SelectChangeEvent<string>) => {
        setEmpleadoId(parseInt(event.target.value, 10));
    };

    const handleSubmit = async () => {
        const empleadoSeleccionado = empleados.find(emp => emp.id === empleadoId);

        if (!empleadoSeleccionado) {
            console.error("Empleado no encontrado");
            return;
        }

        const updatedPedido: Pedido = {
            ...pedido,
            estado,
            empleado: {
                id: empleadoSeleccionado.id,
                rol: empleadoSeleccionado.rol,
                pedidos: empleadoSeleccionado.pedidos,
                nombre: empleadoSeleccionado.nombre,
                apellido: empleadoSeleccionado.apellido,
                telefono: empleadoSeleccionado.telefono,
                email: empleadoSeleccionado.email,
                fechaNacimiento: empleadoSeleccionado.fechaNacimiento,
                usuario: empleadoSeleccionado.usuario,
                imagen: empleadoSeleccionado.imagen,
                sucursal: empleadoSeleccionado.sucursal,
            },
        };

        try {
            const pedidoService = new PedidoService();
            await pedidoService.put(pedido.id, updatedPedido);
            handleUpdate(updatedPedido);
        } catch (error) {
            console.error("Error al actualizar el pedido:", error);
        }
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ ...modalStyle, width: 400 }}>
                <Typography variant="h6" component="h2">
                    Modificar Pedido
                </Typography>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Estado</InputLabel>
                    <Select value={estado} onChange={(e) => setEstado(e.target.value)}>
                        {estados.map((estado) => (
                            <MenuItem key={estado} value={estado}>
                                {estado}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Empleado</InputLabel>
                    <Select value={empleadoId.toString()} onChange={handleEmpleadoIdChange}>
                        {empleados.map((empleado) => (
                            <MenuItem key={empleado.id} value={empleado.id.toString()}>
                                {empleado.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
                    Modificar
                </Button>
            </Box>
        </Modal>
    );
}

const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};