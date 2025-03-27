# Importamos las librerías necesarias para construir la API
from fastapi import FastAPI, HTTPException  # FastAPI para la aplicación y HTTPException para manejar errores
from fastapi.middleware.cors import CORSMiddleware  # Middleware para permitir CORS
from pydantic import BaseModel  # BaseModel para crear modelos de datos validados
from typing import List, Optional  # Tipado para definir listas y parámetros opcionales
import random  # Módulo para generar números aleatorios (no se usa en este código)

# Creamos una instancia de la aplicación FastAPI
app = FastAPI()

# Habilitamos CORS para permitir el acceso desde cualquier origen
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir solicitudes desde cualquier origen
    allow_credentials=True,  # Permitir el envío de credenciales (cookies, autenticación)
    allow_methods=["*"],  # Permitir todos los métodos HTTP (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permitir todos los encabezados HTTP
)

# Definición del modelo de proyecto utilizando Pydantic
class Project(BaseModel):
    id: int  # Identificador único del proyecto
    name: str  # Nombre del proyecto
    type: str  # Tipo de proyecto (por ejemplo, solar, eólico, hidroeléctrico)
    latitude: float  # Latitud geográfica del proyecto
    longitude: float  # Longitud geográfica del proyecto

# Datos de ejemplo: una lista de proyectos con información geográfica y tipo
projects = [
    Project(
        id=1,
        name="Solar Farm Alpha",  # Nombre del proyecto
        type="solar",  # Tipo de proyecto (solar)
        latitude=40.7128,  # Latitud (coordenadas de Nueva York)
        longitude=-74.0060  # Longitud (coordenadas de Nueva York)
    ),
    Project(
        id=2,
        name="Wind Farm Beta",  # Nombre del proyecto
        type="wind",  # Tipo de proyecto (eólico)
        latitude=34.0522,  # Latitud (coordenadas de Los Ángeles)
        longitude=-118.2437  # Longitud (coordenadas de Los Ángeles)
    ),
    Project(
        id=3,
        name="Hydro Plant Gamma",  # Nombre del proyecto
        type="hydroelectric",  # Tipo de proyecto (hidroeléctrico)
        latitude=47.6062,  # Latitud (coordenadas de Seattle)
        longitude=-122.3321  # Longitud (coordenadas de Seattle)
    ),
]

# Ruta GET para obtener todos los proyectos o proyectos filtrados por tipo

#@app.get: Es un decorador de FastAPI que define una ruta HTTP GET.
#Esto significa que cuando un usuario hace una solicitud GET a la URL especificada, se llamará a la función que está justo debajo del decorador.
#response_model=List[Project]: Define el tipo de dato de la respuesta que la función devolverá.
#Aquí se indica que la respuesta será una lista de objetos del tipo Project.
#Esto permite que FastAPI realice la validación automática y genere documentación OpenAPI correctamente.
@app.get("/api/projects", response_model=List[Project])
#async: Indica que la función es asíncrona. Esto permite manejar tareas de manera no bloqueante.
#Esto es especialmente útil cuando la función realiza operaciones de E/S (como llamadas a bases de datos o APIs externas).
#def: Palabra clave que define una función.
#get_projects: Nombre de la función.
#project_type: Optional[str] = None:
#project_type: Parámetro opcional de tipo str.
#Optional[str]: Indica que el parámetro puede ser una cadena o None.
#= None: Si el usuario no proporciona el valor, el parámetro será None por defecto.
async def get_projects(project_type: Optional[str] = None):
    # Verificar si se proporciona un tipo de proyecto como parámetro
    if project_type:
        # Filtrar los proyectos cuyo tipo coincide con el parámetro proporcionado (ignorando mayúsculas)

        #projects: Es la lista o colección de objetos que estamos iterando.
        #for p in projects: Itera sobre cada elemento p en la lista projects.
        #if p.type.lower() == project_type.lower():
        #Verifica si el tipo del proyecto (p.type), convertido a minúsculas con .lower(), coincide con el tipo de proyecto proporcionado (project_type.lower()).
        #Esto hace que la comparación sea insensible a mayúsculas/minúsculas.
        #Resultado:
        #El resultado es una nueva lista que contiene solo los proyectos cuyo tipo coincide con el valor de project_type.
        filtered_projects = [p for p in projects if p.type.lower() == project_type.lower()]
        # Retornar la lista filtrada de proyectos
        return filtered_projects
    # Si no se proporciona tipo, retornar la lista completa de proyectos
    return projects

# Ruta GET para obtener un proyecto específico por ID
@app.get("/api/projects/{project_id}", response_model=Project)
async def get_project(project_id: int):
    # Buscar el proyecto con el ID proporcionado utilizando una comprensión de lista

    #next() es una función integrada en Python que devuelve el primer elemento de un iterador.
    #Si el iterador está vacío o no encuentra ningún elemento que cumpla la condición, retorna el valor por defecto (en este caso, None).

    #Esta es una expresión generadora que produce un objeto generador.
    #p for p in projects: Recorre cada objeto p en la lista projects.
    #if p.id == project_id: Filtra los objetos que tengan un ID igual al valor proporcionado en project_id.
    project = next((p for p in projects if p.id == project_id), None)
    # Si no se encuentra el proyecto, lanzar una excepción HTTP 404
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    # Retornar el proyecto encontrado
    return project

# Ejecutar la aplicación directamente con Uvicorn si el archivo se ejecuta como script principal
if __name__ == "__main__":
    import uvicorn  # Importamos Uvicorn para ejecutar el servidor ASGI
    uvicorn.run(app, host="0.0.0.0", port=8000)  # Ejecutamos la aplicación en el puerto 8000



#Resumen:

#FastAPI y CORS: Se usa para crear una API web que permite solicitudes desde cualquier origen.

#Modelo de Proyecto: Se define un modelo con atributos como id, name, type, latitude, y longitude.

#Datos de Ejemplo: Se crea una lista estática de proyectos para propósitos de demostración.

#Rutas API:

#/api/projects: Devuelve todos los proyectos o los filtra por tipo.

#/api/projects/{project_id}: Devuelve el proyecto específico por ID o lanza un error 404 si no existe.

#Ejecución del Servidor: El script arranca el servidor web en el puerto 8000 usando Uvicorn.
