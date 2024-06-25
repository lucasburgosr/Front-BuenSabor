import Categoria from "../entidades/Categoria";
import Empresa from "../entidades/Empresa";
import Sucursal from "../entidades/Sucursal";
import BackendClient from "./BackendClient";

export default class SucursalService extends BackendClient<Sucursal> {
  async getAllByEmpresa(id: number): Promise<Sucursal[]> {
    const response = await fetch(`${this.baseUrl}/sucursales/empresas/${id}`);
    const data = await response.json();
    return data as Sucursal[];
  }

  async getEmpresa(id: number): Promise<Empresa> {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${this.baseUrl}/sucursal/${id}/empresa`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error fetching promociones: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching promociones:", error);
      throw error;
    }
  }

  async getCategorias(sucursalId: number): Promise<Categoria[]> {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}${
          this.baseUrl
        }/${sucursalId}/categorias`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error fetching categorías: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching categorías: ", error);
      throw error;
    }
  }
}
