import ArticuloInsumo from "./ArticuloInsumo";
import ArticuloManufacturado from "./ArticuloManufacturado";
import Base from "./Base";
import Sucursal from "./Sucursal";

export default class Categoria extends Base {
  denominacion: string = "";
  subCategorias: Categoria[] = [];
  sucursales: Sucursal[] = [];
  articulos: ArticuloInsumo[] | ArticuloManufacturado[] = [];
}
