import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await loginUser({ email, password })
        if (res.error) {
            setError(res.error)
        } else {
            localStorage.setItem('token', res.token)
            navigate('/tasks')
        }
    }



    return (
        <div>
            <h2>Iniciar Sesion</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit">Entrar</button>
            </form>
            <p>
                ¿No tienes cuenta?{" "}
                <Link to="/register">Regístrate aquí</Link>
            </p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
}