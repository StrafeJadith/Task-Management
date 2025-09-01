import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { registerUser } from "../api"


export default function RegisterPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setError(null)
        setSuccess(null)

        const res = await registerUser({ name, email, password })

        if (res.error) {
            setError(res.error)
        } else {
            setSuccess("Registro exitoso 🎉 Ahora inicia sesión.")
            setTimeout(() => navigate("/login"), 2000) // redirige en 2 seg
        }
    }




    return (
        <div>
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Registrarme</button>
            </form>

            <p>
                ¿Ya tienes cuenta?{" "}
                <Link to="/login">Inicia sesión aquí</Link>
            </p>



            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
    )
}