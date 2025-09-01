import express from 'express' // Se importa el framework express.
import { getAllTasks, createTask, updateTask, deleteTask } from '../controllers/tasks.controller.js' // Se importan los metodos o funciones exportados en el archivo tasks.controller.js para hacer uso de ellos aqui.
import { authMiddleware } from '../middlewares/auth.middleware.js'
const router = express.Router() // Instancia un router que permite organizar rutas separadas del app principal

router.get('/tasks', authMiddleware, getAllTasks) // Se crea la ruta get, esta es la que sera utilizada para obtener todas las tareas.
router.post('/tasks', authMiddleware, createTask) // Se cra la ruta post, esta es la que sera utilizada para crear una nueva tarea.
router.put('/tasks/:id', authMiddleware, updateTask) // Se cra la ruta put, esta es la que sera utilizada para actualizar una tarea existente.
router.delete('/tasks/:id', authMiddleware, deleteTask) // Se cra la ruta delete, esta es la que sera utilizada para eliminar una tarea existente.

export default router // Exporta el router para usarlo en la aplicación principal de Express
