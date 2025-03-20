# 🌍 Visualizador de Proyectos de Energía Renovable

## 📋 Requisitos Previos
- Python 3.8 o superior
- Node.js 14.0 o superior
- npm 6.0 o superior

## 🚀 Instalación

### Backend (Python)

1. Crear un entorno virtual:
```bash
python -m venv venv
```

2. Activar el entorno virtual:
- En Windows:
```bash
.\venv\Scripts\activate
```
- En Linux/Mac:
```bash
source venv/bin/activate
```

3. Instalar las dependencias:
```bash
pip install -r requirements.txt
```

### Frontend (React)

1. Navegar al directorio del frontend:
```bash
cd frontend
```

2. Instalar las dependencias:
```bash
npm install
```

## 🔧 Ejecución del Proyecto

### Backend

1. Asegúrate de estar en el directorio raíz del proyecto
2. Activa el entorno virtual si no está activado
3. Ejecuta el servidor:
```bash
python main.py
```
El servidor estará disponible en `http://localhost:5000`

### Frontend

1. En una nueva terminal, navega al directorio del frontend:
```bash
cd frontend
```

2. Inicia la aplicación:
```bash
npm start
```
La aplicación estará disponible en `http://localhost:3000`

## 📝 Notas Importantes
- Asegúrate de que el backend esté corriendo antes de iniciar el frontend
- Verifica que los puertos 3000 y 5000 estén disponibles
- Para detener cualquiera de los servidores, presiona `Ctrl + C` en la terminal correspondiente

## 🔍 Estructura del Proyecto
```
proyecto/
├── backend/
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── package.json
│   └── src/
└── README.md
```

## 📌 Objective  
Develop a Full Stack application that allows users to visualize renewable energy projects on an interactive map and in a list view. Users should be able to filter projects by type.

## 🔧 General Requirements  
- **Backend**: Expose an API that returns a list of renewable energy projects with their locations and types.  
- **Frontend**: Implement the interface using **React with Redux and Sagas** for state management.  
- **Views**: The application must allow switching between a map view and a list view.  

## 🛠️ Technical Requirements  

### **Backend (Python)**  
- Create an API endpoint that returns information about renewable energy projects.  
- Each project should include the following fields:  
  - `id`: Unique identifier.  
  - `name`: Project name.  
  - `type`: Type of renewable energy (e.g., **solar, wind, hydroelectric**).  
  - `latitude`, `longitude`: Project location.  
- Allow filtering projects by type through the API.  

### **Frontend (React + Redux + Sagas)**  
- Implement the interface using **React**.  
- Manage global state with **Redux** and handle asynchronous API calls with **Redux-Saga**.  
- Enable switching between **map view and list view**.  
- Implement a filter by project type that dynamically updates both views in real-time.  

## 📊 Evaluation Criteria  
- ✅ Correct implementation and consumption of the API.  
- ✅ Proper use of **Redux and Sagas** to manage data flow.  
- ✅ Ability to dynamically filter projects in the frontend.  
- ✅ Code structure, best practices, and clarity in the solution.  

## 📎 Submission Guidelines  
1. **Fork this repository** and work in your own private repository.  
2. Once completed, **share your repository** or submit a **ZIP file** with your solution.  
3. Include a **README** explaining how to run your project.  

Good luck! 🚀  
