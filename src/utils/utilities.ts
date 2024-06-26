import { Dispatch, SetStateAction } from "react";

import BackendClient from '../servicios/BackendClient';
/**
 * Función para manejar la eliminación genérica de un elemento.
 * @param _index El índice del elemento a eliminar en el array de datos filtrados.
 * @param backendService Instancia del servicio de backend utilizado para realizar la eliminación.
 * @param filteredData Array de datos filtrados donde se encuentra el elemento a eliminar.
 * @param fetchItems Función para volver a cargar los elementos después de la eliminación.
 * @param confirmationMessage Mensaje de confirmación para la eliminación (opcional).
 * @param successMessage Mensaje de éxito después de la eliminación (opcional).
 * @param errorMessage Mensaje de error en caso de falla en la eliminación (opcional).
 * @param url URL de la API donde se encuentra el recurso a eliminar.
 */
export const handleDelete = async <T>(
  _index: number,
  _backendService: BackendClient<T>,
  _filteredData: any[],
  _fetchItems: () => void,
  _confirmationMessage: string = '¿Estás seguro de eliminar este elemento?',
  _successMessage: string = 'Elemento eliminado correctamente.',
  _errorMessage: string = 'Hubo un problema al eliminar el elemento.',
  _url: string
) => {
 // const itemId = itemToDelete.id.toString(); // Convertimos el ID a string


  // if (result.isConfirmed) {
  // await backendService.delete(url,itemId);
  //  fetchItems(); // Vuelve a obtener los elementos después de la eliminación
  //Swal.fire(
  //'¡Eliminado!',
  //successMessage,
  //'success'
  // );
  // } catch (error) {
  // console.error("Error al eliminar el elemento:", error);
  // Swal.fire(
  //  'Error',
  // errorMessage,
  //  'error'
  // );
  // }
  // }
};


/**
 * Función para realizar una búsqueda dentro de un conjunto de datos.
 * @param query La cadena de búsqueda.
 * @param data Array de datos en el que se realizará la búsqueda.
 * @param nombre El nombre de la propiedad sobre la que se realizará la búsqueda.
 * @param setData Función para actualizar los datos filtrados con los resultados de la búsqueda.
 */
export const handleSearch = (
  query: string,
  data: any[],
  nombre: string, // Cambiado a string en lugar de any
  setData: Dispatch<SetStateAction<any[]>>
) => {
  const filtered = data.filter((item) =>
    item[nombre].toLowerCase().includes(query.toLowerCase())
  );
  setData(filtered);
};

