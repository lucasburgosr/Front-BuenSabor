import Promocion from "../entidades/Promocion";
import BackendClient from "./BackendClient";

export default class PromocionService extends BackendClient<Promocion> {
    async getPromocionesBySucursalIds(sucursalIds: number[]): Promise<Promocion[]> {
        const response = await this.getAll();
        return response.filter(promocion => sucursalIds.includes(promocion.sucursal.id));
    }
}
