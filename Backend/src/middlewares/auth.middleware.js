// Importamos la librería jsonwebtoken para trabajar con JWT.
import jwt from 'jsonwebtoken'

// Middleware de autenticación
// Este middleware se ejecuta antes de llegar al controlador de la ruta.
// Sirve para verificar que el usuario tenga un token válido en la cabecera.
export const authMiddleware = (req, res, next) => {
  // Obtenemos la cabecera de autorización (Authorization: Bearer <token>)
  const authHeader = req.headers.authorization

  // Si existe la cabecera, separamos por espacio y tomamos la segunda parte (el token)
  const token = authHeader && authHeader.split(' ')[1]

  // Si no hay token, retornamos error 403 (Prohibido)
  if (!token) return res.status(403).json({ error: 'Token requerido' })

  try {
    // Verificamos y decodificamos el token usando la clave secreta guardada en .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Guardamos el id del usuario dentro del request para usarlo en la siguiente función
    req.userId = decoded.id

    // Si todo salió bien, pasamos al siguiente middleware o controlador
    next()
  } catch {
    // Si falla la verificación, retornamos error 401 (No autorizado)
    res.status(401).json({ error: 'Token inválido' })
  }
}
