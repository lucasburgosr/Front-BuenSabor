import { ChangeEvent, useCallback, RefObject } from 'react';
import BackendClient from "../../servicios/BackendClient";
import Base from '../../entidades/Base';
import ArticuloInsumo from '../../entidades/ArticuloInsumo';

export type UseGrillaHandlersProps<T> = {
  entidad: T,
  setEntidad: (entidad: T) => void,
  entidades: T[],
  setEntidades: (entidades: T[]) => void,
  apiServicio: BackendClient<T>,
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

  const cleanArticuloInsumo = (articuloInsumo: ArticuloInsumo): any => {
    const { type, ...cleanedArticuloInsumo } = articuloInsumo;
    return cleanedArticuloInsumo;
  };

  const cleanArticuloManufacturadoDetalles = (detalles: any[]): any[] => {
    return detalles.map(detalle => {
      if (detalle.articuloInsumo) {
        detalle.articuloInsumo = cleanArticuloInsumo(detalle.articuloInsumo);
      }
      return detalle;
    });
  };

  const cleanData = (data: any): any => {
    // Crear una copia profunda del objeto
    const cleanedData = JSON.parse(JSON.stringify(data));
  
    // Asegurarse de que la propiedad type está presente
    if (cleanedData.articuloManufacturadoDetalles) {
      cleanedData.articuloManufacturadoDetalles = cleanedData.articuloManufacturadoDetalles.map((detalle: any) => {
        if (detalle.articuloInsumo) {
          detalle.articuloInsumo.type = 'insumo';
        }
        return detalle;
      });
    }
  
    // Establecer el tipo para el objeto principal si es un ArticuloManufacturado
    if (cleanedData.articuloManufacturadoDetalles) {
      cleanedData.type = 'manufacturado';
    } else {
      cleanedData.type = 'insumo';
    }
  
    return cleanedData;
  };

  const getDatosRest = useCallback(async () => {
    const datos: T[] = await apiServicio.getAll();
    setEntidades(datos);
  }, [apiServicio, setEntidades]);

  const deleteEntidad = useCallback(async (id: number) => {
    try {
      await apiServicio.delete(id);
    } catch {
      alert(`Hubo un conflicto. Asegúrese de que ${(entidad as any).constructor.nombre} no esté utilizándose en otros datos.`);
    }
    getDatosRest();
  }, [apiServicio, (entidad as any).constructor.name, getDatosRest]);

  const save = useCallback(async (formData: T) => {
    const cleanedFormData = cleanData(formData);

    if (cleanedFormData.id === 0) {
      await apiServicio.post(cleanedFormData);
    } else {
      await apiServicio.put(cleanedFormData.id, cleanedFormData);
    }
    getDatosRest();
    const modalClose: HTMLElement | null = document.getElementById(`btn-close-${(entidad as any).constructor.name}`);
    modalClose?.click();
  }, [apiServicio, (entidad as any).constructor.name, getDatosRest]);

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
      const seleccion: T = entidad;
      Object.assign(seleccion, entidades.find(a => a.id === id)!);
      if (entidad.constructor.name === 'Cliente') {
        (seleccion as any).pedidos = [];
      }
      setEntidad(seleccion);
    } else {
      const nueva: T = entidad;
      Object.assign(entidad, entidadBase);
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

