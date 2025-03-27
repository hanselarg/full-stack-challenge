// Importa la biblioteca principal de React
import React from 'react';

// Importa el hook useSelector desde React-Redux para acceder al estado global
import { useSelector } from 'react-redux';

// Importa componentes de react-leaflet para crear mapas interactivos
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// Importa los estilos predeterminados de Leaflet para que el mapa se vea correctamente
import 'leaflet/dist/leaflet.css';

// Importa la biblioteca Leaflet para manipular íconos de marcador
import L from 'leaflet';

// Soluciona el problema de los íconos de marcador predeterminados en react-leaflet
delete L.Icon.Default.prototype._getIconUrl;

// Configura los íconos predeterminados de los marcadores con la ruta correcta a las imágenes
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'), // Ícono de alta resolución
  iconUrl: require('leaflet/dist/images/marker-icon.png'),          // Ícono estándar
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),      // Sombra del ícono
});

// Componente funcional para la vista del mapa
function MapView() {
  // Usa el hook useSelector para obtener la lista de proyectos desde el estado global de Redux
  const { projects } = useSelector((state) => state.projects);

  // Retorna el componente MapContainer que muestra el mapa interactivo
  return (
    <MapContainer
      center={[39.8283, -98.5795]} // Coordenadas centrales (EE. UU.)
      zoom={4}                     // Nivel de zoom inicial
      style={{ height: '600px', width: '100%' }} // Estilo del mapa (altura y ancho)
    >
      {/* Capa de mapa usando OpenStreetMap para mostrar el fondo del mapa */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // URL de la capa de azulejos (tiles)
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' // Atribución de la capa
      />
      
      {/* Itera sobre la lista de proyectos y crea un marcador para cada uno */}
      {projects.map((project) => (
        <Marker
          key={project.id} // Identificador único para cada marcador
          position={[project.latitude, project.longitude]} // Posición del marcador
        >
          {/* Popup que aparece al hacer clic en el marcador */}
          <Popup>
            <div>
              <h3>{project.name}</h3>      {/* Muestra el nombre del proyecto */}
              <p>Type: {project.type}</p>  {/* Muestra el tipo de proyecto */}
              <p>Location: {project.latitude}, {project.longitude}</p> {/* Coordenadas del proyecto */}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

// Exporta el componente para que pueda ser utilizado en otros archivos
export default MapView;


//💡 Resumen:

//1. Solución de Íconos:
//Se corrige el problema común en react-leaflet relacionado con los íconos de los marcadores.

//Esto se hace utilizando L.Icon.Default.mergeOptions() para establecer las rutas correctas.

//2. Renderización del Mapa:
//Utiliza el componente MapContainer para contener el mapa.

//Utiliza TileLayer para cargar mapas de OpenStreetMap.

//3. Markers y Popups:
//Itera sobre la lista de proyectos obtenida del estado de Redux para crear marcadores (Marker).

//Cada marcador tiene un Popup que muestra información del proyecto cuando se hace clic.

//4. Estado Global:
//Utiliza useSelector para obtener los proyectos desde el estado global gestionado por Redux.