import Promocion from "../entidades/Promocion";
import BackendClient from "./BackendClient";

export default class PromocionService extends BackendClient<Promocion> {
    /* async getPromocionesBySucursalIds(sucursalIds: number[]): Promise<Promocion[]> {
        const response = await this.getAll();
        return response.filter(promocion => sucursalIds.includes(promocion.sucursal.id));
    } */

    async getPromocionesBySucursalId(sucursalId: number): Promise<Promocion[]> {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}${
              this.baseUrl
            }/${sucursalId}/sucursales`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error(`Error fetching promociones: ${response.statusText}`);
          }
          return response.json();
        } catch (error) {
          console.error("Error fetching promociones: ", error);
          throw error;
        }
      }
}
