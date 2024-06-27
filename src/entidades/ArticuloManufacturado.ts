import ArticuloManufacturadoDetalle  from "./ArticuloManufacturadoDetalle";
import Articulo from "./Articulo";

export default class ArticuloManufacturado extends Articulo {
    descripcion:string = "";
    tiempoEstimadoMinutos:number = 0;
    articuloManufacturadoDetalles:ArticuloManufacturadoDetalle[] = [];
    preparacion:string ="";
    stock:number = 0;
    precioCosto:number = 0;

    static nombre:string = "Artículo Manufacturado";
    static labels = [ "Imágenes", "Denominación", "Precio de venta", "Unidad de medida", "Categoría", "Descripción", "Tiempo estimado", "Preparación", "Stock actual", "Precio de costo"];
}