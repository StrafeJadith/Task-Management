import express from 'express' // Se requiere el framework express para hacer uso de sus metodos o funciones por ejemplo (use,listen)
import dotenv from 'dotenv' // Es una librería que carga las variables de entorno desde un archivo .env a process.env en Node.js.
import path from 'path' // Es un módulo nativo que sirve para trabajar con rutas de archivos y directorios de forma segura y multiplataforma.
import router from './routes/task.routes.js' // Se requiere router que es donde se estan manejando todas las rutas get post put y delete.
import { fileURLToPath } from 'url' // Se importa fileURLToPath.
import authRouter from './routes/auth.routes.js'
import cors from 'cors'

const PORT = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url) // Convierte una URL de archivo en una ruta de archivo normal del sistema. (aqui obtengo la ruta completa del archivo actual)
const __dirname = path.dirname(__filename) // Se utiliza para obtener la carpeta actual del archivo que se le pasa en los parametros. (aqui obtengo la carpeta antes de llegar archivo actual).

dotenv.config()
const app = express() // Crea una instancia de la aplicación Express

app.use(cors()) // Permite cualquier origen
app.use(express.json()) // app.use quiere decir que aqui ira un middleware, es decir algo que se hara antes de que lleguen a las rutas, express.json lo que hace es parsear el cuerpo de la solicitud.

app.use(express.urlencoded({ extended: true })) // express.urlencoded es un middleware que convierte los datos del cuerpo de la solicitud que vienen en formato URL-encoded a un objeto de JavaScript. extended: true, lo que hace es permitir objetos y arreglos complejos dentro del cuerpo de la solicitud si esta en false solo es permitidos usar Strings o arrays planos.

app.use(express.static(path.join(__dirname, '../public'))) // express.static hace accesibles archivos desde una carpeta en tu servidor.

app.use('/auth', authRouter)
app.use('/', router) // conecta el router a la aplicación, permitiendo organizar rutas en archivos separados y mantener tu código limpio.

app.listen(process.env.PORT, (req, res) => { // app.listen se utiliza para arrancar el servidor, mientras que procces.env.PORT contiene el puerto en el que el servidor estara funcionando.
  console.log(`El servidor esta escuchando en el puerto ${PORT}`)
})
