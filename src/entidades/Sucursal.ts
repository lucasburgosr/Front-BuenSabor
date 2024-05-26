import Base from "./Base";
import Domicilio from "./Domicilio";
import Empresa from "./Empresa";
import Promocion from "./Promocion";

export default class Sucursal extends Base {
    nombre:string = '';
    horarioApertura:Date = new Date;
    horarioCierre:Date = new Date;
    domicilio:Domicilio = new Domicilio();
    empresa:Empresa = new Empresa();
    promociones:Promocion[] = [];
    casaMatriz:boolean = false;

    static nombre:string = "Sucursal";
    static labels:string[] = ['Id', 'Nombre', 'Horario apertura', 'Horario cierre', 'Domicilio', 'Empresa', 'Promociones', 'Es casa matriz']
}