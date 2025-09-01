import { useEffect, useState } from "react"// Importa los hooks de React:
// - useState: para manejar estados (datos que cambian dentro del componente)
// - useEffect: para ejecutar lógica en momentos específicos del ciclo de vida del componente (ej: cuando se monta)
import { getTasks, createTask, updateTask, deleteTask } from "../api"
import { useNavigate } from "react-router-dom" // Importa el hook useNavigate de react-router-dom:
// - Sirve para navegar programáticamente entre rutas (ej: redirigir después de un logout o login)

export default function TaskPage() {
    const [tasks, setTasks] = useState([]) // Estado que guarda todas las tareas en forma de array
    const [title, setTitle] = useState("") // Estado que guarda el título de la tarea que se está escribiendo en el formulario
    const [description, setDescription] = useState("") // Estado que guarda la descripción de la tarea
    const [done, setDone] = useState(false) // Estado que indica si la tarea está realizada (true) o pendiente (false)
    const [editingTask, setEditingTask] = useState(null)// Estado que guarda la tarea que se está editando actualmente
    // - null significa que no se está editando ninguna
    // - si tiene un valor, es la tarea seleccionada para edición
    const navigate = useNavigate()
    const token = localStorage.getItem("token") // Recupera el token de autenticación almacenado en el navegador
    // - Se usa para verificar si el usuario está logueado
    // - También puede enviarse en las peticiones a la API

    useEffect(() => {
        if (!token) {
            navigate("/login")
            return
        }

        loadTasks()
    }, [])

    async function loadTasks() {
        const res = await getTasks(token)
        if (res.error) {
            navigate('/login')
        } else {
            setTasks(res)
        }
    }

    // Maneja el envío del formulario de tareas (crear o editar)
    async function handleSubmit(e) {
        e.preventDefault() // Evita que el formulario recargue la página.

        if (editingTask) {
            // 🔹 Si estamos editando una tarea existente:
            const updated = await updateTask(
                editingTask.id,             // ID de la tarea que se está editando
                { title, description, done }, // Nuevos valores de la tarea
                token                        // Token para autenticar la petición
            )

            // Actualiza la lista de tareas: reemplaza la vieja por la nueva editada
            setTasks(tasks.map(t => (t.id === updated.id ? updated : t)))

            // Sale del modo edición
            setEditingTask(null)
        } else {
            // 🔹 Si NO estamos editando → crear una nueva tarea:
            const newTask = await createTask(
                { title, description, done }, // Datos de la nueva tarea
                token
            )

            // Agrega la nueva tarea al array existente
            setTasks([...tasks, newTask])
        }

        // 🔹 Limpia el formulario para que quede listo para otra tarea
        setTitle('')
        setDescription('')
        setDone(false)
    }

    // Maneja la eliminación de una tarea
    async function handleDelete(id) {
        await deleteTask(id, token) // Borra en el backend
        setTasks(tasks.filter(t => t.id !== id)) // Borra en el frontend (estado)
    }

    // Activa el modo edición cargando los valores de la tarea seleccionada
    function handleEdit(task) {
        setEditingTask(task)        // Marca qué tarea se está editando
        setTitle(task.title)        // Carga el título en el input
        setDescription(task.description) // Carga la descripción en el input
        setDone(task.done)          // Carga el estado (hecha o no)
    }

    // Maneja el cierre de sesión
    function handleLogout() {
        localStorage.removeItem("token") // Elimina el token de autenticación
        localStorage.removeItem("user")  // Elimina los datos del usuario
        window.location.href = "/login"; // Redirige manualmente a la pantalla de login
    }




    return (
        <div>
            <h2>Mis Tareas</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <select value={done} onChange={(e) => setDone(e.target.value === "true")}>
                    <option value="false">Pendiente</option>
                    <option value="true">Realizada</option>
                </select>
                <button type="submit">
                    {editingTask ? "Actualizar" : "Crear"}
                </button>
            </form>
            <ul>
                {tasks.map(t => (
                    <li key={t.id}>{t.title} - {t.description}
                        <span> [{t.done ? "✅ Realizada" : "⌛ Pendiente"}]</span>
                        <button onClick={() => handleEdit(t)}>✏️</button>
                        <button onClick={() => handleDelete(t.id)}>🗑️</button>
                    </li>
                ))}
            </ul>

            <button className="logout-btn" onClick={handleLogout}>🚪 Cerrar Sesión </button>
        </div>
    )
}