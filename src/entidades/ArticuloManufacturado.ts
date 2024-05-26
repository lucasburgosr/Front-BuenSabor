import Categoria from "./Categoria";
import Imagen from "./Imagen";
import ArticuloManufacturadoDetalle  from "./ArticuloManufacturadoDetalle";
import UnidadMedida from "./UnidadMedida";
import Base from "./Base";

export default class ArticuloManufacturado extends Base {
    denominacion:string = "";
    categoria:Categoria = new Categoria();
    descripcion:string = "";
    precioVenta:number = 0;
    tiempoEstimadoMinutos:number = 0;
    unidadMedida:UnidadMedida = new UnidadMedida();
    articuloManufacturadoDetalles:ArticuloManufacturadoDetalle[] = [];
    preparacion:string ="";
    stock:number = 0;
    precioCosto:number = 0;
    imagenes:Imagen[] = [];

    static nombre:string = "Artículo Manufacturado";
    static labels:string[] = ["Id", "Denominación", "Categoría", "Descripción", "Precio de venta", "Tiempo estimado", "Unidad de medida", "Cargar detalles", "Preparación", "Stock actual", "Precio de costo", "Imágenes"];
}