import Base from "./Base";
import Cliente from "./Cliente";
import Domicilio from "./Domicilio";
import Empleado from "./Empleado";
import Sucursal from "./Sucursal";
export default class Pedido extends Base {
    horaEstimadaFinalizacion:Date = new Date();
    total: number = 0;
    totalCosto: number = 0;
    estado: string = '';
    tipoEnvio: string = '';
    formaPago: string = '';
    fechaPedido:Date = new Date();
    domicilio:Domicilio = new Domicilio();
    sucursal:Sucursal = new Sucursal();
    cliente:Cliente = new Cliente();
    empleado:Empleado = new Empleado();
    //private Set<DetallePedido> detallePedidos = new HashSet<>();

    static nombre:string = "Pedido";
    static labels:string[] = [
        "Id", 
        "Hora estimada de finalización", 
        "Total", 
        "Costo total", 
        "Estado",
        "Tipo de envío",
        "Forma de pago", 
        "Fecha de pedido", 
        "Domicilio",
        "Sucursal",
        "Cliente",
        "Empleado"
    ];
}