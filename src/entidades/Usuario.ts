import Base from "./Base";

export default class Usuario extends Base {
  username: string = "";
  email: string = "";
  rol?: "SUPERADMIN" | "ADMIN" | "COCINERO" | "DELIVERY" | "CAJERO" | any;
}
