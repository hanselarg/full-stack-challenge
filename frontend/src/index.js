// Importa la biblioteca principal de React
import React from 'react';

// Importa ReactDOM para renderizar la aplicación en el DOM
import ReactDOM from 'react-dom/client';

// Importa el componente Provider de React-Redux para conectar Redux con React
import { Provider } from 'react-redux';

// Importa la store de Redux que contiene el estado global
import { store } from './store';

// Importa el componente principal de la aplicación
import App from './App';

// Importa los estilos globales de la aplicación
import './index.css';

// Crea el "root" de la aplicación usando la API de React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza la aplicación en el elemento "root"
root.render(
  // Habilita el modo estricto de React para detectar errores comunes en el desarrollo
  <React.StrictMode>
    {/* Envuelve la aplicación con el proveedor de Redux para que todos los componentes puedan acceder al estado global */}
    <Provider store={store}>
      {/* Renderiza el componente principal "App" */}
      <App />
    </Provider>
  </React.StrictMode>
);
