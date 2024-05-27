import Sucursal from "../entidades/Sucursal";
import BackendClient from "./BackendClient";

export default class SucursalService extends BackendClient<Sucursal> {

    async getAllByEmpresa(id: number): Promise<Sucursal[]> {
        const response = await fetch(`${this.baseUrl}/sucursales/empresas/${id}`);
        const data = await response.json();
        return data as Sucursal[];
    }

}
