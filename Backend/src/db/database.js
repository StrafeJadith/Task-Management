import pkg from 'pg' // PG Es la librería que te permite conectarte a una base de datos PostgreSQL y hacer consultas desde tu código Node.
import dotenv from 'dotenv' // Es una librería que carga las variables de entorno desde un archivo .env a process.env en Node.js.

dotenv.config()
const { Pool } = pkg // Desestructuramos la clase Pool de pg para manejar un pool de conexiones a la base de datos.

// Este fragmento crea y exporta un pool de conexiones a PostgreSQL usando los datos del archivo .env, para que otras partes de la aplicación puedan hacer consultas a la base de datos de forma eficiente.
export const pool = new Pool({
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  // port: process.env.DB_PORT
  connectionString: process.env.DATABASE_PUBLIC_URL, // o DATABASE_PUBLIC_URL
  ssl: { rejectUnauthorized: false } // necesario en Railway
})
