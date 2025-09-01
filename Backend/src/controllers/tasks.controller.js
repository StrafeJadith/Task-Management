import { pool } from '../db/database.js' // Import la constante pool que habia exportado. Ahora puedo pg y dotenv para poder comunicarme con mi base de datos.

// Obtener todas las tareas.

export const getAllTasks = async (req, res) => { // Se exporta la funcion getAllTasks y se utiliza async y await para hacer esta consulta asincrona.
  const userId = req.userId
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1 ORDER BY id ASC', [userId]) // En una constante realizo mediante pool accedo a un metodo llamado query para realizar consultas a la base de datos, en este caso mostrar todos los datos de la tabla tasks.
    res.json(result.rows) // La respuesta se codifica en formato json
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tareas' })
  }
}

// Crear una nueva tarea

export const createTask = async (req, res) => { // req (request) y res (response), mediante la req podemos acceder a los valores de la solicitud.
  const userId = req.userId
  const { title, description } = req.body // req.body nos da los valores o el contenido que tiene tittle y description. req.body devuelve un objeto en este caso solo queremos usar tittle y description por lo tanto desestructuramos y usamos esos 2 valores.
  await pool.query('INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3)', // Se realiza una consulta para insertar datos en la tabla task (title y description) en los valores reales que iran ahi ($1 y $2) pero estos no serian los valores reales, solo serian marcadores de posicion, esto para evitar inyecciones SQL.
    [title, description, userId] // Este array que tiene title y description tiene los valores reales que irian en los marcadores mencionados anterior mente.
  )

  res.json({ message: 'Tarea Creada' }) // La respuesta se codifica en formato json y muestra un mensaje.
}

// Actualizar una tarea

export const updateTask = async (req, res) => {
  const userId = req.userId
  const { id } = req.params // req.params contiene los parámetros dinámicos de la URL. Aquí extraemos "id" para identificar un recurso específico.
  const { title, description, done } = req.body // Ya explicado arriba.
  await pool.query(
    'UPDATE tasks SET title=$1, description=$2, done=$3 WHERE id=$4 AND user_id=$5', // Ya explicado arriba
    [title, description, done, id, userId] // Ya explicado arriba
  )
  res.json({ message: 'Tarea actualizada' }) // La respuesta se codifica en formato json y muestra un mensaje.
}

// Eliminar una tarea

export const deleteTask = async (req, res) => {
  const userId = req.userId
  const { id } = req.params // Ya explicado arriba
  await pool.query('DELETE FROM tasks WHERE id=$1 AND user_id=$2', [id, userId]) // ya explicado arriba
  res.json({ message: 'Tarea eliminada' }) // La respuesta se codifica en formato json y muestra un mensaje.
}
