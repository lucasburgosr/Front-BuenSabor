import ArticuloManufacturado from "../entidades/ArticuloManufacturado";
import BackendClient from "./BackendClient";

export default class ArticuloManufacturadoService extends BackendClient<ArticuloManufacturado> {
    async getAllByEmpresa(id: number): Promise<ArticuloManufacturado[]> {
        const response = await fetch(`${this.baseUrl}/sucursales/empresas/${id}`);
        const data = await response.json();
        return data as ArticuloManufacturado[];
    }
}
