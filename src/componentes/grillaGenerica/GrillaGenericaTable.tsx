import Base from "../../entidades/Base";
import Domicilio from "../../entidades/Domicilio";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useAppSelector } from "../../redux/hooks";
import Imagen from "../../entidades/Imagen";

export type GrillaGenericaTableProps<T> = {
  entidades: T[];
  labels: string[];
  categoria: number;
  keys: Array<keyof T>;
  openModalPedidos: () => void;
  openModalDomicilios: (domicilios: Domicilio[]) => void;
  cambiarBooleano: (value: number, atributo: string) => void;
  handleOpenModal: (id: number) => void;
  deleteEntidad: (id: number) => void;
  sinEditar: boolean;
};

function GrillaGenericaTable<T extends Base>({
  entidades,
  labels,
  categoria,
  keys,
  openModalPedidos,
  openModalDomicilios,
  cambiarBooleano,
  handleOpenModal,
  deleteEntidad,
  sinEditar,
}: GrillaGenericaTableProps<T>) {
  const empleado = useAppSelector((state) => state.empleado.selectedEntity);
  const userRole = empleado.rol;
  const canEdit = ["ADMIN", "SUPERADMIN"].includes(userRole);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0", // Fondo gris claro
        padding: "15px", // Espaciado interno
        borderRadius: "10px", // Bordes redondeados
        boxShadow: "5px 10px 2px rgba(0, 0, 0, 0.3)", // Sombra sutil
        margin: "5px 0", // Margen superior e inferior
      }}
    >
      <Paper sx={{ width: "100%", overflow: "hidden", background: "#e0ebc2" }}>
        <table className="table text-center">
          <thead>
            <tr>
              {labels &&
                labels.map((label: string, index: number) => (
                  <th
                    style={{ textAlign: "center", backgroundColor: "#a6c732" }}
                    key={index}
                    scope="col"
                    hidden={[
                      "Id",
                      "Imagen",
                      "Imagenes",
                      "Cargar detalles",
                      "Tiene sucursales",
                      "Promociones",
                      "Categorías",
                    ].includes(label)}
                  >
                    <div style={{ fontWeight: "normal" }}>
                      <b>{label}</b>
                    </div>
                  </th>
                ))}
              {canEdit && !sinEditar && (
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "#a6c732",
                    fontWeight: "normal",
                  }}
                  scope="col"
                >
                  <b>Modificar</b>
                </th>
              )}
              {canEdit && (
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "#a6c732",
                    fontWeight: "normal",
                  }}
                  scope="col"
                >
                  <b>Eliminar</b>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {entidades
              .filter(
                (entidadI) =>
                  categoria === 0 || entidadI.categoria.id === categoria
              )
              .map((entidadI: T) => (
                <tr key={entidadI.id}>
                  {keys.map((key, index) => (
                    <td
                    style={{ backgroundColor: "#e0ebc2" }}
                    key={index}
                    hidden={[
                      "id",
                      "eliminado",
                      "articuloManufacturadoDetalles",
                      "sucursales",
                      "promocionDetalles",
                      "type",
                      "promociones",
                    ].includes(String(key))}
                  >
                    {!["esParaElaborar", "casaMatriz"].includes(String(key)) ? (
                      !["domicilios", "pedidos"].includes(String(key)) ? (
                        key === "imagenes" ? (
                          <div>
                            {entidadI.imagenes.map((imagen : Imagen) => (
                              <img
                                key={imagen.id}
                                src={imagen.url}
                                alt={`Imagen de ${entidadI.denominacion}`}
                                style={{ width: "100px", height: "100px" }}
                              />
                            ))}
                          </div>
                        ) : (
                          <div style={{ backgroundColor: "#e0ebc2" }}>
                            <b>
                              {typeof entidadI[key] === "object"
                                ? entidadI[key]?.denominacion ||
                                  entidadI[key]?.nombre ||
                                  entidadI[key]?.calle + " " + entidadI[key]?.numero
                                : typeof entidadI[key] === "number"
                                ? entidadI[key].toLocaleString("es-AR")
                                : entidadI[key]}
                            </b>
                          </div>
                        )
                      ) : (
                        <div style={{ backgroundColor: "#e0ebc2" }}>
                          <a
                            className="btn btn-dark"
                            style={{ marginBottom: 10 }}
                            onClick={() => {
                              key === "pedidos"
                                ? openModalPedidos()
                                : openModalDomicilios(entidadI.domicilios);
                            }}
                          >
                            {" "}
                            {labels[index]}{" "}
                          </a>
                        </div>
                      )
                    ) : (
                      <div style={{ backgroundColor: "#e0ebc2" }}>
                        <a
                          className={entidadI[key] ? "btn btn-success" : "btn btn-dark"}
                          style={{
                            width: "100px",
                            marginBottom: "10px",
                            backgroundColor: entidadI[key] ? "#a6c732" : "#e05151",
                            color: "#ffffff", // Color del texto
                            border: "none",
                            padding: "5px 20px",
                            borderRadius: "4px",
                            textAlign: "center",
                            textDecoration: "none",
                            display: "inline-block",
                          }}
                          onClick={() => {
                            cambiarBooleano(entidadI.id, String(key));
                          }}
                        >
                          {entidadI[key] ? "Sí" : "No"}
                        </a>
                      </div>
                    )}
                  </td>
                  
                  ))}

                  {canEdit && !sinEditar && (
                    <td style={{ backgroundColor: "#e0ebc2" }}>
                      <div style={{ backgroundColor: "#e0ebc2" }}>
                        <Button
                          style={{
                            letterSpacing: "1px",
                            fontWeight: "bold",
                            backgroundColor: "#a6c732",
                          }}
                          className="custom-button"
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            handleOpenModal(entidadI.id);
                          }}
                        >
                          Modificar
                        </Button>
                      </div>
                    </td>
                  )}

                  {canEdit && (
                    <td style={{ backgroundColor: "#e0ebc2" }}>
                      <div style={{ backgroundColor: "#e0ebc2" }}>
                        <Button
                          style={{
                            letterSpacing: "1px",
                            fontWeight: "bold",
                            backgroundColor: "#e05151",
                          }}
                          className="custom-button"
                          variant="contained"
                          color="primary"
                          onClick={() => deleteEntidad(entidadI.id)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </Paper>
    </div>
  );
}

export default GrillaGenericaTable;
