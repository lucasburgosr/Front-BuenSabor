import Base from "./Base";
import Imagen from "./Imagen";
import PromocionDetalle from "./PromocionDetalle";
import Sucursal from "./Sucursal";

export default class Promocion extends Base {
  imagenes: Imagen[] = [];
  denominacion: string = "";
  eliminado: boolean = false;
  fechaDesde: Date = new Date();
  fechaHasta: Date = new Date();
  horaDesde: Date = new Date();
  horaHasta: Date = new Date();
  descripcionDescuento: string = "";
  precioPromocional: number = 0;
  tipoPromocion: string = "";
  sucursales: Sucursal[] = [];
  promocionDetalles: PromocionDetalle[] = [];

  static nombre: string = "Promoción";
  static labels: string[] = [
    "Id",
    "Imágenes",
    "Denominación",
    "Fecha desde",
    "Fecha hasta",
    "Hora desde",
    "Hora hasta",
    "Descripción",
    "Precio promocional",
    "Tipo de promoción",
    "Tiene sucursales",
    "Cargar detalles",
  ];
}
