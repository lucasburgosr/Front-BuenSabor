import Base from "./Base";
import Categoria from "./Categoria";
import Imagen from "./Imagen";
import PromocionDetalle from "./PromocionDetalle";
import UnidadMedida from "./UnidadMedida";

export default class Articulo extends Base {
  imagenes: Imagen[] = [];
  type: string = "";
  eliminado: boolean = false;
  denominacion: string = "";
  precioVenta: number = 0;
  unidadMedida: UnidadMedida = new UnidadMedida();
  categoria: Categoria = new Categoria();
  promocionDetalles: PromocionDetalle | undefined;
}
