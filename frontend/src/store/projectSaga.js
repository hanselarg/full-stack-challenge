// Importa funciones esenciales de redux-saga para manejar efectos secundarios
import { takeLatest, call, put } from 'redux-saga/effects';

// Importa las acciones desde el slice de proyectos para actualizar el estado en Redux
import { setProjects, setError, setLoading } from './projectSlice';

// URL base de la API para obtener los proyectos
const API_URL = 'http://localhost:8000/api';

// Generador de la saga para obtener los proyectos desde la API
function* fetchProjects(action) {
  try {
    // Despacha la acción para establecer el estado de carga en true
    yield put(setLoading(true));

    // Obtiene el tipo de proyecto del payload de la acción (si existe)
    const type = action.payload;

    // Construye la URL de la API según el tipo de proyecto seleccionado
    const url = type ? `${API_URL}/projects?project_type=${type}` : `${API_URL}/projects`;

    // Realiza la llamada a la API utilizando el método fetch (de manera asíncrona)
    const response = yield call(fetch, url);

    // Convierte la respuesta en formato JSON
    const data = yield response.json();

    // Despacha la acción para almacenar los proyectos obtenidos en el estado global
    yield put(setProjects(data));
  } catch (error) {
    // En caso de error, despacha la acción para registrar el mensaje de error en el estado
    yield put(setError(error.message));
  }
}

// Exporta la función saga principal que escucha la acción 'FETCH_PROJECTS'
export function* projectSaga() {
  // Utiliza takeLatest para escuchar la última acción 'FETCH_PROJECTS' disparada
  yield takeLatest('FETCH_PROJECTS', fetchProjects);
}


//Resumen:

//Obtención de Proyectos: La saga escucha la acción FETCH_PROJECTS y hace una llamada a la API.

//Manejo de Carga: Utiliza la acción setLoading para indicar cuándo comienza y termina la carga.

//Almacenamiento de Resultados: Utiliza la acción setProjects para guardar los datos recibidos.

//Manejo de Errores: Captura cualquier error durante la obtención de proyectos y lo almacena usando setError.

//Ejecución de la Última Acción: takeLatest garantiza que solo se ejecute la última llamada si hay múltiples disparos rápidos de la misma acción.