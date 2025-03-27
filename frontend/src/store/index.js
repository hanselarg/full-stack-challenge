// Importa la función configureStore desde Redux Toolkit para crear la tienda (store)
import { configureStore } from '@reduxjs/toolkit';

// Importa la función para crear el middleware de Saga
// Redux-Saga es un middleware que permite manejar efectos secundarios (como llamadas a APIs) de manera asíncrona en Redux.
import createSagaMiddleware from 'redux-saga';

// Importa el reducer de proyectos desde el archivo projectSlice.js
import projectReducer from './projectSlice';

// Importa la función saga principal desde el archivo projectSaga.js
import { projectSaga } from './projectSaga';

// Crea una instancia del middleware de Redux-Saga
const sagaMiddleware = createSagaMiddleware();

// Configura y crea la tienda (store) utilizando Redux Toolkit
export const store = configureStore({
  // Define el reductor principal que maneja el estado de proyectos
  reducer: {
    projects: projectReducer, // El estado "projects" es gestionado por el reductor projectReducer
  },
  // Añade middlewares personalizados a la tienda
  middleware: (getDefaultMiddleware) =>
    // Utiliza el middleware predeterminado y concatena el middleware de Saga
    getDefaultMiddleware().concat(sagaMiddleware),
});

// Inicia la ejecución de la saga principal del proyecto
sagaMiddleware.run(projectSaga);
