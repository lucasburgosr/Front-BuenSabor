import Base from "./Base";
import Categoria from "./Categoria";
import Imagen from "./Imagen";
import UnidadMedida from "./UnidadMedida";

export default class ArticuloInsumo extends Base {
    denominacion:string = "";
    categoria:Categoria = new Categoria();
    stockActual:number = 0;
    stockMinimo:number = 0;
    stockMaximo:number = 0;
    precioCompra:number = 0;
    precioVenta:number = 0;
    unidadMedida:UnidadMedida = new UnidadMedida();
    imagenes:Imagen[] = [];
    esParaElaborar:boolean = false;
    type:string = "insumo";

    static nombre:string = "Artículo Insumo";
    static labels:string[] = ["Id", "Denominación", "Categoría", "Stock actual", "Stock mínimo", "Stock máximo", "Precio de compra", "Precio de venta", "Unidad de Medida", "Imágenes", "Es Para Elaborar"];
}