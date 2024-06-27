import Pedido from "../entidades/Pedido";
import BackendClient from "./BackendClient";

const BASE_URL = import.meta.env.VITE_API_URL + "/pedidos";

export default class PedidoService extends BackendClient<Pedido> {
    constructor() {
        super(BASE_URL);
    }
}
