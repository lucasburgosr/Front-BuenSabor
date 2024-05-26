import Base from "./Base";
import Domicilio from "./Domicilio";
import Imagen from "./Imagen";
import Sucursal from "./Sucursal";

export default class Empleado extends Base {
    rol:string = "";
    domicilio:Domicilio = new Domicilio();
    nombre:String = "" ;
    apellido:String = "" ;
    telefono:String = "" ;
    email:String = "" ;
    fechaNacimiento:Date = new Date();
    imagen:Imagen = new Imagen();
    sucursal:Sucursal = new Sucursal();
    
    static nombre:string = "Empleado";
    static labels:string[] = ["Id", "Rol", "Domicilio", "Nombre", "Apellido", "Teléfono", "Email", "Fecha de nacimiento", "Imágen", "Sucursal"];
}