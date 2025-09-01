import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom' // Permite un manejo de rutas mas limpio
// BrowserRouter -> Componente que envuelve toda la app y habilita el enrutamiento
// Routes -> Contenedor de todas las rutas definidas
// Route -> Define cada ruta con su path y componente
// Navigate -> Permite redirigir a otra ruta (ej: si no hay sesión, enviar a /login)
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TaskPage from './pages/TaskPage'
import './App.css'

function App() {


  return (
    <Router>{/* Envuelve toda la aplicación para habilitar el sistema de rutas */}
      <Routes> {/* Contenedor que agrupa todas las rutas definidas */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/tasks' element={<TaskPage />} />
        <Route path='*' element={<Navigate to='/login' />} /> {/* Cualquier ruta no definida (*) redirige automáticamente a /login */}
      </Routes>
    </Router>
  )
}

export default App
