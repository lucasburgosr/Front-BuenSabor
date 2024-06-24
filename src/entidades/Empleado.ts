import Base from "./Base";
import Imagen from "./Imagen";
import Pedido from "./Pedido";
import Sucursal from "./Sucursal";
import Usuario from "./Usuario";

export default class Empleado extends Base {
    rol:string = "";
    pedidos: Pedido[] = [];
    nombre:String = "" ;
    apellido:String = "" ;
    telefono:String = "" ;
    email:String = "" ;
    fechaNacimiento:Date = new Date();
    usuario:Usuario = new Usuario();
    imagen:Imagen = new Imagen();
    sucursal:Sucursal = new Sucursal();
    
    static nombre:string = "Empleado";
    static labels:string[] = ["Id", "Rol", "Pedidos", "Nombre", "Apellido", "Teléfono", "Email", "Fecha de nacimiento", "Imagen", "Sucursal"];
}