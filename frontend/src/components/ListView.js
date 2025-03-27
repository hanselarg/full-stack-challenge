// Importa la biblioteca principal de React
import React from 'react';

// Importa el hook useSelector desde React-Redux para acceder al estado global
import { useSelector } from 'react-redux';

// Importa componentes de Material-UI para crear la tabla y estilizarla
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

// Componente funcional para mostrar la lista de proyectos en una tabla
function ListView() {
  // Utiliza el hook useSelector para obtener la lista de proyectos desde el estado global
  const { projects } = useSelector((state) => state.projects);

  // Retorna el componente de la tabla con los proyectos
  return (
    // Contenedor de la tabla que utiliza Paper para darle un efecto de material
    <TableContainer component={Paper}>
      {/* Tabla principal */}
      <Table>
        {/* Cabezal de la tabla */}
        <TableHead>
          <TableRow>
            {/* Celdas del encabezado de la tabla con títulos */}
            <TableCell>Name</TableCell>       {/* Título de la columna de nombre */}
            <TableCell>Type</TableCell>       {/* Título de la columna de tipo */}
            <TableCell>Latitude</TableCell>   {/* Título de la columna de latitud */}
            <TableCell>Longitude</TableCell>  {/* Título de la columna de longitud */}
          </TableRow>
        </TableHead>
        {/* Cuerpo de la tabla donde se muestran los proyectos */}
        <TableBody>
          {/* Mapea cada proyecto para crear una fila en la tabla */}
          {projects.map((project) => (
            <TableRow key={project.id}> {/* Fila única por cada proyecto */}
              {/* Celda que muestra el nombre del proyecto */}
              <TableCell>{project.name}</TableCell>
              {/* Celda que muestra el tipo de proyecto con capitalización */}
              <TableCell>
                <Typography sx={{ textTransform: 'capitalize' }}>
                  {project.type}
                </Typography>
              </TableCell>
              {/* Celda que muestra la latitud del proyecto */}
              <TableCell>{project.latitude}</TableCell>
              {/* Celda que muestra la longitud del proyecto */}
              <TableCell>{project.longitude}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// Exporta el componente para que pueda ser usado en otros archivos
export default ListView;


//💡 Resumen:
//1. Estado Global:
//Utiliza useSelector para obtener la lista de proyectos desde el estado gestionado por Redux.

//Mapea la lista de proyectos para crear filas en la tabla.

//2. Tabla con Material-UI:
//Utiliza el componente TableContainer con Paper para darle un aspecto elevado.

//La tabla se estructura en:

//TableHead: Para el encabezado con los títulos de las columnas.

//TableBody: Para el contenido dinámico de la tabla.

//Cada fila de la tabla se genera dinámicamente con map() para cada proyecto.

//3. Estilo del Texto:
//Utiliza el componente Typography para capitalizar el tipo de proyecto.