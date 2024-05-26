import { useEffect, useRef, useState } from "react";
import Base from "../../entidades/Base";
import FormularioGenerico from "../formularioGenerico/FormularioGenerico";
import BackendClient from "../../servicios/BackendClient";
import { usePedidos } from "../../hooks/usePedidos";
import ModalGenerico from "../modalGenerico/ModalGenerico";
import CardGenericaCard from "./CardGenericaCard";
import useGrillaHandlers from "../grillaGenerica/useGrillaHandler";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

type ListArgs<T extends Base> = {
  entidadPrevia: T,
  entidadBase: T,
  apiServicio: BackendClient<T>,
  listaSelects?: {},
  sinNuevo?: boolean,
  sinEditar?: boolean,
  onSeleccionarEmpresa: (empresa: T) => void // Añadido para manejar la selección de la empresa
}

function CardGenerica<T extends Base>({ entidadPrevia, entidadBase, apiServicio, listaSelects = {}, sinNuevo = false, sinEditar = false, onSeleccionarEmpresa }: ListArgs<T>) {
  const [entidad, setEntidad] = useState<T>(entidadPrevia);
  const [entidades, setEntidades] = useState<T[]>([]);
  const [categoria, setCategoria] = useState<number>(0);
  const [labels, setLabels] = useState<string[]>([]);

  const { modalPedidos, openModalPedidos } = usePedidos();
  const modalRef = useRef<any>(null);

  const { getDatosRest, deleteEntidad, save, handleOpenModal } = useGrillaHandlers({
    entidad,
    setEntidad,
    entidades,
    setEntidades,
    apiServicio,
    categoria,
    setCategoria,
    listaSelects,
    entidadBase,
    modalRef
  });

  useEffect(() => {
    getDatosRest();
  }, []);

  useEffect(() => {
    setLabels((entidadBase as any).constructor.labels as string[]);
  }, [entidadBase]);

  const handleCardClick = () => {
    onSeleccionarEmpresa(entidad); // Llama a la función prop con la entidad actual
  };

  return (
    <>
      <ModalGenerico titulo={(entidadBase as any).constructor.name} tituloModal={(entidadBase as any).constructor.nombre} ref={modalRef}>
        <FormularioGenerico data={entidad} onSubmit={save} listaSelects={listaSelects} />
      </ModalGenerico>

      {modalPedidos}

      <div style={{ height: '89vh', display: 'flex', flexDirection: 'column', alignItems: "center" }}>
        <Link to="/inicio" style={{ textDecoration: "none", color: "inherit" }} onClick={handleCardClick}>
          <CardGenericaCard
            entidades={entidades}
            labels={labels}
            categoria={categoria}
            keys={Object.keys(entidad) as Array<keyof T>}
            openModalPedidos={openModalPedidos}
            handleOpenModal={handleOpenModal}
            deleteEntidad={deleteEntidad}
            sinEditar={sinEditar}
          />
        </Link>
        {!sinNuevo && (
          <Button
            onClick={() => handleOpenModal(0)}
            sx={{
              bgcolor: "#a6c732",
              "&:hover": {
                bgcolor: "#a0b750",
              },
              my: 3,
              mx: 1,
              width: "50%"
            }}
            variant="contained"
            startIcon={<Add />}
          >
            Nuevo
          </Button>
        )}
      </div>
    </>
  );
}

export default CardGenerica;

