import bcrypt from 'bcrypt' // Dependencia para encriptar contraseñas al ser guardadas en la base de datos
import jwt from 'jsonwebtoken' // Dependencia para generar tokens web.
import { pool } from '../db/database.js'

export const register = async (req, res) => {
  const { email, password } = req.body

  try {
    // Verificar si ya existe
    const check = await pool.query('SELECT * FROM users WHERE email=$1', [email])
    if (check.rows.length > 0) {
      return res.status(400).json({ message: 'El usuario ya existe' })
    }

    const hashedPassword = await bcrypt.hash(password, 10) // Se encripta la contraseña
    await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword])

    res.json({
      message: 'Usuario registrado correctamente',
      user: {
        email
      }
    })
  } catch (err) {
    res.status(500).json({ message: 'Error en registro', details: err.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    if (result.rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' })

    const user = result.rows[0]
    const isValid = await bcrypt.compare(password, user.password) // Se evaluan las contraseñas mediante compare de bycrypt que permite evaluar la contraseña que fue encriptada anteriormente
    if (!isValid) return res.status(401).json({ error: 'Contraseña incorrecta' })

    // Generamos un token JWT para el usuario autenticado.
    // - En el payload solo enviamos el id del usuario.
    // - process.env.JWT_SECRET es la clave secreta para firmar el token (se guarda en el .env).
    // - expiresIn: '1h' indica que el token expira en 1 hora.
    const token = jwt.sign(
      { id: user.id }, // payload con los datos que queremos en el token
      process.env.JWT_SECRET, // clave secreta usada para firmar el token
      { expiresIn: '1h' } // opciones del token (tiempo de expiración en este caso)
    )

    res.json({ token, user: { id: user.id, email: user.email } })
  } catch (err) {
    res.status(500).json({ error: 'Error en login', details: err.message })
  }
}
