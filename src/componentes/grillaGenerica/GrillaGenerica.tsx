// src/componentes/grillaGenerica/GrillaGenerica.tsx
import { useEffect, useRef, useState } from "react";
import CboBoxFiltrar from "../cboBoxFiltrar/CboBoxFiltrar";
import { useAtributos } from "../../hooks/useAtributos";
import Base from "../../entidades/Base";
import FormularioGenerico from "../formularioGenerico/FormularioGenerico";
import BackendClient from "../../servicios/BackendClient";
import { usePedidos } from "../../hooks/usePedidos";
import useGrillaHandlers from "./useGrillaHandler";
import ModalGenerico from "../modalGenerico/ModalGenerico";
import GrillaGenericaTable from "./GrillaGenericaTable";
import { useDomicilios } from "../../hooks/useDomicilios";
import { Box, Button, TablePagination, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";

type ListArgs<T extends Base> = {
  entidadPrevia: T;
  entidadBase: T;
  apiServicio?: BackendClient<T>; // Hacemos que apiServicio sea opcional
  listaSelects?: {};
  sinNuevo?: boolean;
  sinEditar?: boolean;
  data: T[];
};

function GrillaGenerica<T extends Base>({
  entidadPrevia,
  entidadBase,
  apiServicio,
  listaSelects = {},
  sinNuevo = false,
  sinEditar = false,
  data,
}: ListArgs<T>) {
  const [entidad, setEntidad] = useState<T>(entidadPrevia);
  const [entidades, setEntidades] = useState<T[]>(data);
  const { categorias } = useAtributos();
  const [categoria, setCategoria] = useState<number>(0);
  const [labels, setLabels] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { modalPedidos, openModalPedidos } = usePedidos();
  const { modalDomicilios, openModalDomicilios } = useDomicilios();
  const modalRef = useRef<any>(null);

  const {
    save,
    cambiarBooleano,
    handleChangeCategoria,
    handleOpenModal,
    deleteEntidad,
    getDatosRest, // Incluimos getDatosRest aquí
  } = useGrillaHandlers({
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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (apiServicio) {
      getDatosRest();
    }
  }, [apiServicio, getDatosRest]);

  useEffect(() => {
    setLabels((entidadBase as any).constructor.labels as string[]);
  }, [entidadBase]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const searchKey =
    (entidad as any).denominacion !== undefined ? "denominacion" : "nombre";

  const filteredEntidades = entidades.filter((entidad) =>
    (entidad as any)[searchKey].toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      {modalDomicilios}

      <div style={{ height: "89vh", display: "flex", flexDirection: "column" }}>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          mb={2}
        >
          <TextField
            label={`Buscar por ${searchKey}`}
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            size="small"
          />
        </Box>

        {Object.keys(entidad).includes("categoria") && (
          <div className="row mb-3 ms-auto" style={{ width: "25%" }}>
            <div className="col">
              <CboBoxFiltrar
                idCboInput="Categoria"
                titulo="Categoría"
                datos={categorias.filter((categoria) =>
                  entidades
                    .map((entidad) => entidad.categoria.id)
                    .includes(categoria.id)
                )}
                handleChange={handleChangeCategoria}
              />
            </div>
          </div>
        )}

        <GrillaGenericaTable
          entidades={filteredEntidades.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )}
          labels={labels}
          categoria={categoria}
          keys={Object.keys(entidad) as Array<keyof T>}
          openModalPedidos={openModalPedidos}
          openModalDomicilios={openModalDomicilios}
          cambiarBooleano={cambiarBooleano}
          handleOpenModal={handleOpenModal}
          deleteEntidad={deleteEntidad}
          sinEditar={sinEditar}
        />

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredEntidades.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {!sinNuevo && (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              onClick={() => handleOpenModal(0)}
              sx={{
                bgcolor: "#a6c732",
                "&:hover": {
                  bgcolor: "#a0b750",
                },
                my: 3,
                mx: 1,
                width: "auto", // Asegura que el ancho sea automático
                maxWidth: 200, // Limita el ancho máximo del botón
              }}
              variant="contained"
              startIcon={<Add />}
            >
              Nuevo
            </Button>
          </Box>
        )}
      </div>
    </>
  );
}

export default GrillaGenerica;
