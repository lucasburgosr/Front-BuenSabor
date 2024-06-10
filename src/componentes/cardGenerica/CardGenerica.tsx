import { useEffect, useRef, useState } from "react";
import Base from "../../entidades/Base";
import FormularioGenerico from "../formularioGenerico/FormularioGenerico";
import BackendClient from "../../servicios/BackendClient";
import { usePedidos } from "../../hooks/usePedidos";
import ModalGenerico from "../modalGenerico/ModalGenerico";
import CardGenericaCard from "./CardGenericaCard";
import useGrillaHandlers from "../grillaGenerica/useGrillaHandler";
import { Add } from "@mui/icons-material";
import { Box,Button } from "@mui/material";


type ListArgs<T extends Base> = {
  entidadPrevia: T;
  entidadBase: T;
  apiServicio: BackendClient<T>;
  listaSelects?: {};
  sinNuevo?: boolean;
  sinEditar?: boolean;
  onClick?: (entidad: T) => void; // Nuevo prop onClick
};

function CardGenerica<T extends Base>({
  entidadPrevia,
  entidadBase,
  apiServicio,
  listaSelects = {},
  sinNuevo = false,
  sinEditar = false,
  onClick,
}: ListArgs<T>) {
  const [entidad, setEntidad] = useState<T>(entidadPrevia);
  const [entidades, setEntidades] = useState<T[]>([]);
  const [categoria, setCategoria] = useState<number>(0);
  const [labels, setLabels] = useState<string[]>([]);

  const { modalPedidos, openModalPedidos } = usePedidos();
  const modalRef = useRef<any>(null);

  const { getDatosRest, deleteEntidad, save, handleOpenModal } =
    useGrillaHandlers({
      entidad,
      setEntidad,
      entidades,
      setEntidades,
      apiServicio,
      categoria,
      setCategoria,
      listaSelects,
      entidadBase,
      modalRef,
    });

  useEffect(() => {
    getDatosRest();
  }, []);

  useEffect(() => {
    setLabels((entidadBase as any).constructor.labels as string[]);
  }, [entidadBase]);

  return (
    <>
      <ModalGenerico
        titulo={(entidadBase as any).constructor.name}
        tituloModal={(entidadBase as any).constructor.nombre}
        ref={modalRef}
      >
        <FormularioGenerico
          data={entidad}
          onSubmit={save}
          listaSelects={listaSelects}
        />
      </ModalGenerico>

      {modalPedidos}

      <div

      >
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
      </div>
     
      <Box
      sx={{
        display: "flex",
        justifyContent: "center",
       width:"100%",
        height: "30%", // Opcional: ajustar la altura del contenedor
      }}
    >
      <Button
        onClick={() => handleOpenModal(0)}
        sx={{
          bgcolor: "#a6c732",
          "&:hover": {
            bgcolor: "#a0b750",
          },
          my: 3,
          width: "5%",
          height: "30%", // Ajustar la altura del botón
        }}
        variant="contained"
        startIcon={<Add />}
      >
        Nuevo
      </Button>
    </Box>
        
    </>
    
  );
}

export default CardGenerica;
