import Base from "../../entidades/Base";
import { Button } from "@mui/material";
export type GrillaGenericaTableProps<T> = {
  entidades: T[],
  labels: string[],
  categoria: number,
  keys: Array<keyof T>,
  openModalPedidos: () => void,
  handleOpenModal: (id: number) => void,
  deleteEntidad: (id: number) => void,
  sinEditar: boolean
};

function CardGenericaCard<T extends Base>({
  entidades,
  categoria,
  handleOpenModal,
  deleteEntidad,
  sinEditar
}: GrillaGenericaTableProps<T>) {
  return (
    <div 
    
    className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-2 justify-content-center gap-3">
      {entidades.filter(entidadI => (categoria === 0 || entidadI.categoria.id === categoria)).map((entidadI: T) => (
        <div  style={{
          width: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f0f0", // Fondo gris claro
          padding: "15px", // Espaciado interno
          borderRadius: "10px", // Bordes redondeados
          boxShadow: "0 10px 2px rgba(0, 0, 0, 0.3)", // Sombra sutil
          margin: "5px 0" // Margen superior e inferior
        }} key={entidadI.id} className="col">
          <div className="card" style={{ width: "18rem", backgroundColor: "#e0ebc2" }}>
            <h3 style={{ textAlign: 'center' }} className="card-title">{entidadI.nombre}</h3>
            <img src={entidadI.imagen.url} className="card-img-top" style={{ height: '200px' }} alt="..." />
            <div className="card-body">
              <p className="card-text">{entidadI.razonSocial}</p>
              <p className="card-text">{entidadI.cuil}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardGenericaCard;
