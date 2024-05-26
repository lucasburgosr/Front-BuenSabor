import Base from "./Base";
import Domicilio from "./Domicilio";
import Imagen from "./Imagen";

export default class Cliente extends Base {
    rol:string = "";
    nombre:String = "" ;
    apellido:String = "" ;
    telefono:String = "" ;
    email:String = "" ;
    fechaNacimiento:Date = new Date();
    imagen:Imagen = new Imagen();
    domicilios:Domicilio[] = [];
    pedidos:[] = [];
    
    static nombre:string = "Cliente";
    static labels:string[] = ["Id", "Rol", "Nombre", "Apellido", "Teléfono", "Email", "Fecha de nacimiento", "Imágen", "Domicilios", "Pedidos"];
}