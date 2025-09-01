const API_URL = 'http://localhost:3000' // API URL for the backend server

/* AUTENTICACION */

export async function registerUser(data) {

    try {
        const res = await fetch(`${API_URL}/auth/register`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if(!res.ok) {
        throw new Error (`Error ${res.status}: ${res.statusText}`)
    }

    return res.json()

    } catch (error) {
        console.error('Error registrando usuario:', error)
        return { error: error.message }
    }

   

}

export async function loginUser(data){

    try {
        const res = await fetch(`${API_URL}/auth/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if(!res.ok) {
        throw new Error (`Error ${res.status}: ${res.statusText}`)
    }

    return res.json()
    } catch (error) {
        console.error('Error iniciando sesión:', error)
        return { error: error.message }
    }
}


/* CRUD DE TAREAS */


//Obtener Tareas
export async function getTasks(token){
    try {
        const res = await fetch(`${API_URL}/tasks`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error (`Error ${res.status}: ${res.statusText}`)
    }

    return res.json()
        
    } catch (error) {
        console.error('Error obteniendo tareas:', error)
        return { error: error.message }
    }
}


//Crear Tareas
export async function createTask(task,token) {
    try {
        const res = await fetch(`${API_URL}/tasks`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(task)
    })

    if(!res.ok) {
        throw new Error (`Error ${res.status}: ${res.statusText}`)
    }

    return res.json()
    } catch (error) {
        console.error('Error creando tarea:', error)
        return { error: error.message }
    }
}


//Actualizar Tareas
export async function updateTask(id, task, token) {
    try {
        const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(task)
    })

    if(!res.ok) {
        throw new Error (`Error ${res.status}: ${res.statusText}`)
    }

    return res.json()
    } catch (error) {
        console.error('Error actualizando tarea:', error)
        return { error: error.message }
    }
}


//Eliminar tareas
export async function deleteTask(id, token) {
    try {
        const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if(!res.ok) {
        throw new Error (`Error ${res.status}: ${res.statusText}`)
    }
    return res.json()
    } catch (error) {
        console.error('Error eliminando tarea:', error)
        return { error: error.message }
    }
}   
