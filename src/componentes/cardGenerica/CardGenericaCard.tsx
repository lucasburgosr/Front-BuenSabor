import { Link } from "react-router-dom";
import Base from "../../entidades/Base";

export type GrillaGenericaTableProps<T> = {
  entidades: T[];
  labels: string[];
  categoria: number;
  keys: Array<keyof T>;
  openModalPedidos: () => void;
  handleOpenModal: (id: number) => void;
  deleteEntidad: (id: number) => void;
  sinEditar: boolean;
  onClick?: (entidad: T) => void; // Nuevo prop onClick
};

function CardGenericaCard<T extends Base>({
  entidades,
  categoria,
  onClick, // Nuevo prop onClick
}: GrillaGenericaTableProps<T>) {
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-2 justify-content-center gap-3">
      {entidades
        .filter(
          (entidadI) => categoria === 0 || entidadI.categoria.id === categoria
        )
        .map((entidadI: T) => (
          <div
            style={{
              width: "50vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f0f0f0",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 10px 2px rgba(0, 0, 0, 0.3)",
              margin: "5px 0",
            }}
            key={entidadI.id}
            className="col"
            onClick={() => onClick && onClick(entidadI)} // Manejar el click
          >
            <Link
              to={`/empresas/inicio/`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                className="card"
                style={{ width: "18rem", backgroundColor: "#e0ebc2" }}
              >
                <h3 style={{ textAlign: "center" }} className="card-title">
                  {entidadI.nombre}
                </h3>
                <img
                  src={entidadI.imagen.url}
                  className="card-img-top"
                  style={{ height: "200px" }}
                  alt="..."
                />
                <div className="card-body">
                  <p className="card-text">{entidadI.razonSocial}</p>
                  <p className="card-text">{entidadI.cuil}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default CardGenericaCard;
