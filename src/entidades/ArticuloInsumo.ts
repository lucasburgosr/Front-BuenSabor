import Articulo from "./Articulo";

export default class ArticuloInsumo extends Articulo {
    stockActual:number = 0;
    stockMinimo:number = 0;
    stockMaximo:number = 0;
    precioCompra:number = 0;
    esParaElaborar:boolean = false;

    static nombre:string = "Artículo Insumo";
    static labels:string[] = ["Id", "Imágenes", "Denominación", "Precio de venta", "Unidad de medida", "Categoría", "Stock actual", "Stock mínimo", "Stock máximo", "Precio de compra", "Es Para Elaborar"];
    //    static labels:string[] = ["Id", "Imágenes", "Denominación", "Precio", "Stock mínimo", "Stock máximo", "Precio de compra", "Precio de venta", "Unidad de Medida", "Imágenes", "Es Para Elaborar"];

}