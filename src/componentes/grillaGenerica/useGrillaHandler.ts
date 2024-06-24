import { ChangeEvent, useCallback, RefObject } from 'react';
import BackendClient from "../../servicios/BackendClient";
import Base from '../../entidades/Base';

export type UseGrillaHandlersProps<T> = {
  entidad: T,
  setEntidad: (entidad: T) => void,
  entidades: T[],
  setEntidades: (entidades: T[]) => void,
  apiServicio?: BackendClient<T>, // Hacemos que apiServicio sea opcional
  categoria: number,
  setCategoria: (categoria: number) => void,
  listaSelects: {},
  entidadBase: T,
  modalRef: RefObject<any>
};

function useGrillaHandlers<T extends Base>({
  entidad,
  setEntidad,
  entidades,
  setEntidades,
  apiServicio,
  setCategoria,
  entidadBase,
  modalRef
}: UseGrillaHandlersProps<T>) {

  const cleanData = (data: any): any => {
    const cleanedData = JSON.parse(JSON.stringify(data));

    if (cleanedData.articuloManufacturadoDetalles) {
      cleanedData.articuloManufacturadoDetalles = cleanedData.articuloManufacturadoDetalles.map((detalle: any) => {
        if (detalle.articuloInsumo) {
          detalle.articuloInsumo.type = 'insumo';
        }
        return detalle;
      });
    }

    if (cleanedData.articuloManufacturadoDetalles) {
      cleanedData.type = 'manufacturado';
    } else {
      cleanedData.type = 'insumo';
    }

    return cleanedData;
  };

  const getDatosRest = useCallback(async () => {
    if (apiServicio) {
      const datos: T[] = await apiServicio.getAll();
      setEntidades(datos);
    }
  }, [apiServicio, setEntidades]);

  const deleteEntidad = useCallback(async (id: number) => {
    if (apiServicio) {
      try {
        await apiServicio.delete(id);
      } catch {
        alert(`Hubo un conflicto. Asegúrese de que ${(entidad as any).constructor.nombre} no esté utilizándose en otros datos.`);
      }
      getDatosRest();
    } else {
      // Eliminación local si no hay apiServicio
      setEntidades(entidades.filter(entidad => entidad.id !== id));
    }
  }, [apiServicio, (entidad as any).constructor.name, getDatosRest, entidades, setEntidades]);

  const save = useCallback(async (formData: T) => {
    const cleanedFormData = cleanData(formData);

    if (apiServicio) {
      if (cleanedFormData.id === 0) {
        await apiServicio.post(cleanedFormData);
      } else {
        await apiServicio.put(cleanedFormData.id, cleanedFormData);
      }
      getDatosRest();
    } else {
      // Guardado local si no hay apiServicio
      if (cleanedFormData.id === 0) {
        setEntidades([...entidades, { ...cleanedFormData, id: entidades.length + 1 }]);
      } else {
        setEntidades(entidades.map(entidad => entidad.id === cleanedFormData.id ? cleanedFormData : entidad));
      }
    }

    const modalClose: HTMLElement | null = document.getElementById(`btn-close-${(entidad as any).constructor.name}`);
    modalClose?.click();
  }, [apiServicio, (entidad as any).constructor.name, getDatosRest, entidades, setEntidades]);

  const cambiarBooleano = useCallback(async (value: number, atributo: string) => {
    const nuevo: T = entidades.find((entidad: T) => entidad.id === value)!;
    (nuevo as any)[atributo] = !(nuevo as any)[atributo];
    if (atributo === 'esParaElaborar') {
      (nuevo as any).type = 'insumo';
    }
    save(nuevo);
  }, [entidades, save]);

  const handleChangeCategoria = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setCategoria(Number(e.target.value));
  }, [setCategoria]);

  const handleOpenModal = useCallback((id: number) => {
    if (id) {
      const seleccion: T = { ...entidades.find(a => a.id === id)! };
      if (entidad.constructor.name === 'Cliente') {
        (seleccion as any).pedidos = [];
      }
      setEntidad(seleccion);
    } else {
      const nueva: T = { ...entidadBase };
      setEntidad(nueva);
    }
    modalRef.current.openModal();
  }, [entidad, setEntidad, entidades, entidadBase, modalRef]);

  return {
    getDatosRest,
    deleteEntidad,
    save,
    cambiarBooleano,
    handleChangeCategoria,
    handleOpenModal
  };
}

export default useGrillaHandlers;
