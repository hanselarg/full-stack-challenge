// Importa React y el hook useEffect para manejar efectos secundarios
import React, { useEffect } from 'react';

// Importa los hooks de React-Redux para despachar acciones y acceder al estado
import { useDispatch, useSelector } from 'react-redux';

// Importa componentes de la librería MUI (Material-UI) para el diseño de la interfaz
import { Container, Box, ToggleButtonGroup, ToggleButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// Importa el componente de vista de mapa personalizado
import MapView from './components/MapView';

// Importa el componente de vista de lista personalizado
import ListView from './components/ListView';

// Importa las acciones de Redux para cambiar el modo de vista y el tipo de proyecto seleccionado
import { setViewMode, setSelectedType } from './store/projectSlice';

// Componente principal de la aplicación
function App() {
  // Inicializa el hook useDispatch para despachar acciones a la store de Redux
  const dispatch = useDispatch();

  // Usa el hook useSelector para obtener el estado actual desde la store de Redux
  const { viewMode, selectedType } = useSelector((state) => state.projects);

  // Efecto secundario que se ejecuta cuando se monta el componente o cambia el tipo seleccionado
  useEffect(() => {
    // Despacha una acción para obtener los proyectos según el tipo seleccionado
    dispatch({ type: 'FETCH_PROJECTS', payload: selectedType });
  }, [dispatch, selectedType]); // El efecto depende del dispatch y del tipo seleccionado

  // Retorna la estructura del componente
  return (
    // Contenedor principal con un ancho máximo "lg" (large)
    <Container maxWidth="lg">
      {/* Caja con margen superior (my: margin y) */}
      <Box sx={{ my: 4 }}>
        {/* Caja que contiene los botones y el selector con estilo flexible */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          {/* Grupo de botones de alternancia para cambiar entre vistas */}
          <ToggleButtonGroup
            value={viewMode} // Modo de vista actual (mapa o lista)
            exclusive // Solo permite seleccionar uno a la vez
            onChange={(e, newMode) => {
              // Si se selecciona un nuevo modo, lo despacha a Redux
              if (newMode !== null) {
                dispatch(setViewMode(newMode));
              }
            }}
          >
            {/* Botón de vista de mapa */}
            <ToggleButton value="map">Map View</ToggleButton>
            {/* Botón de vista de lista */}
            <ToggleButton value="list">List View</ToggleButton>
          </ToggleButtonGroup>

          {/* Control de formulario para seleccionar el tipo de proyecto */}
          <FormControl sx={{ minWidth: 200 }}>
            {/* Etiqueta del selector */}
            <InputLabel>Project Type</InputLabel>
            {/* Selector desplegable para elegir el tipo de proyecto */}
            <Select
              value={selectedType || ''} // Muestra el tipo seleccionado o una cadena vacía
              label="Project Type" // Etiqueta del selector
              // Despacha la acción para cambiar el tipo seleccionado en la store
              onChange={(e) => dispatch(setSelectedType(e.target.value || null))}
            >
              {/* Opción para mostrar todos los tipos */}
              <MenuItem value="">All Types</MenuItem>
              {/* Opción para proyectos solares */}
              <MenuItem value="solar">Solar</MenuItem>
              {/* Opción para proyectos eólicos */}
              <MenuItem value="wind">Wind</MenuItem>
              {/* Opción para proyectos hidroeléctricos */}
              <MenuItem value="hydroelectric">Hydroelectric</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Renderiza la vista de mapa o la vista de lista según el modo actual */}
        {viewMode === 'map' ? <MapView /> : <ListView />}
      </Box>
    </Container>
  );
}

// Exporta el componente para que pueda ser usado en otros archivos
export default App;

//Resumen:

//El componente App utiliza React-Redux para manejar el estado global.

//Utiliza Material-UI para crear una interfaz moderna y estilizada.

//El usuario puede cambiar entre vista de mapa y vista de lista.

//Permite seleccionar el tipo de proyecto desde un menú desplegable.

//Se utilizan los hooks useEffect, useDispatch y useSelector para manejar los efectos secundarios y el estado global.