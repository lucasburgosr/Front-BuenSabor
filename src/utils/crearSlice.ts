import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define el tipo de la entidad
interface IEntity {
  id: number;
  // Otras propiedades de la entidad
}

// Define el tipo del estado inicial
interface IInitialState<T extends IEntity> {
  entities: T[];
  selectedEntity: T | null; // Agrega la propiedad para la entidad seleccionada
}

// Define el estado inicial
const initialState: IInitialState<any> = {
  entities: [],
  selectedEntity: null, // Inicializa la entidad seleccionada como null
};

// Función para crear un slice genérico para cualquier tipo de entidad
export function createEntitySlice<T extends IEntity>(entityName: string) {
  const entitySlice = createSlice({
    name: `${entityName}State`,
    initialState,
    reducers: {
      setEntities: (state, action: PayloadAction<T[]>) => {
        state.entities = action.payload;
      },
      resetEntities: (state) => {
        state.entities = [];
      },
      // Nueva acción para seleccionar una entidad
      selectEntity: (state, action: PayloadAction<T | null>) => {
        state.selectedEntity = action.payload;
      },
      // Agrega otras acciones específicas de la entidad si es necesario
    },
  });

  return entitySlice;
}
