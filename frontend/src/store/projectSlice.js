// Importa la función createSlice desde Redux Toolkit para crear un "slice" de estado de forma sencilla
import { createSlice } from '@reduxjs/toolkit';

// Estado inicial de la slice, que contiene las propiedades del estado global relacionadas con proyectos
const initialState = {
  projects: [],     // Lista de proyectos (inicialmente vacía)
  loading: false,   // Indicador de carga (mientras se obtienen los proyectos)
  error: null,      // Mensaje de error en caso de fallo
  selectedType: null, // Tipo de proyecto seleccionado (ej: "solar", "wind")
  viewMode: 'map'   // Modo de vista actual ('map' o 'list')
};

// Crea el slice usando createSlice, que agrupa el estado y los reductores en un solo objeto
const projectSlice = createSlice({
  name: 'projects',    // Nombre del slice, que se usa en el espacio de nombres de Redux
  initialState,        // Estado inicial que se usará al crear la tienda (store)
  reducers: {          // Objetos que definen las funciones reductor (reducers) para actualizar el estado
    // Reductor para establecer la lista de proyectos
    setProjects: (state, action) => {
      state.projects = action.payload;  // Actualiza la lista de proyectos con los datos del payload
      state.loading = false;            // Indica que la carga ha finalizado
      state.error = null;               // Borra cualquier error anterior
    },
    // Reductor para cambiar el estado de carga
    setLoading: (state, action) => {
      state.loading = action.payload;   // Actualiza el estado de carga con el valor recibido
    },
    // Reductor para manejar errores
    setError: (state, action) => {
      state.error = action.payload;     // Guarda el mensaje de error recibido
      state.loading = false;            // Finaliza el estado de carga al producirse un error
    },
    // Reductor para cambiar el tipo de proyecto seleccionado
    setSelectedType: (state, action) => {
      state.selectedType = action.payload;  // Almacena el tipo de proyecto seleccionado
    },
    // Reductor para cambiar el modo de visualización (mapa o lista)
    setViewMode: (state, action) => {
      state.viewMode = action.payload;  // Actualiza el modo de vista según el valor recibido
    }
  }
});

// Exporta las acciones para que puedan ser usadas en componentes o sagas
export const { setProjects, setLoading, setError, setSelectedType, setViewMode } = projectSlice.actions;

// Exporta el reductor generado automáticamente para integrarlo en la tienda de Redux
export default projectSlice.reducer;
