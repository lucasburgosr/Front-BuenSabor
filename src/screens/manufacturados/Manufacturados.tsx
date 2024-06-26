import { useEffect } from "react";
import ArticuloManufacturado from "../../entidades/ArticuloManufacturado";
import GrillaGenerica from "../../componentes/grillaGenerica/GrillaGenerica";
import { useAtributos } from "../../hooks/useAtributos";
import { useAppSelector } from "../../redux/hooks";
import { callApi } from "../../componentes/auth0/callApi";
import { useAuth0 } from "@auth0/auth0-react";
import SucursalService from "../../servicios/SucursalService";
import { useDispatch } from "react-redux";
import { setCategoria } from "../../redux/slices/slicesUnificados";
import Categoria from "../../entidades/Categoria";

export default function Manufacturados() {
  const { setNombreApartado } = useAtributos();
  const { getAccessTokenSilently } = useAuth0();
  const sucursalesService = new SucursalService("/sucursales");
  const dispatch = useDispatch();

  const manufacturado = new ArticuloManufacturado();
  const manufacturadoBase = new ArticuloManufacturado();
  const {
    categorias,
    modalCategorias,
    unidadesMedida,
    modalUnidadesMedida,
    getCategoriasRest,
    getUnidadesMedidaRest,
  } = useAtributos();

  const sucursal = useAppSelector((state) => state.sucursal.selectedEntity);
  console.log(sucursal.id);

  useEffect(() => {
    const getCategorias = async () => {
      const token = await callApi(getAccessTokenSilently);

      if (!token) {
        throw new Error("No se pudo obtener el token");
      }

      const categorias = sucursalesService.getCategorias(sucursal.id);

      if (!categorias) {
        console.log("Error al traer categorias");
      } else {
        console.log(categorias);
      }
      dispatch(setCategoria(await categorias));
    };

    setNombreApartado("Manufacturados");
    getCategorias();
  }, []);

  const categoriasX = useAppSelector((state) => state.categoria.entities);
  const manufacturados: any[] = [];

  if (Array.isArray(categoriasX)) {
    categoriasX.forEach((categoria) => {
      // Filtrar los artículos que sean de tipo manufacturado y agregarlos a manufacturados
      const manufacturadosEnCategoria = categoria.articulos.filter((articulo: { type: string; }) => articulo.type === "manufacturado");
      
      // Agregar los manufacturadosEnCategoria al array manufacturados
      manufacturados.push(...manufacturadosEnCategoria);
    });
  
    // Imprimir el array manufacturados después de llenarlo
    console.log("Artículos manufacturados encontrados:");
    console.log(manufacturados);
  } else {
    console.log("categoriasX no es un array válido.");  // Mensaje de precaución si no es un array
  }

  return (
    <div className="m-3">
      <GrillaGenerica
        entidadPrevia={manufacturado}
        entidadBase={manufacturadoBase}
        listaSelects={{
          unidadMedida: [unidadesMedida, modalUnidadesMedida],
          categoria: [categorias, modalCategorias],
        }}
        data={manufacturados}
      />
    </div>
  );
}
