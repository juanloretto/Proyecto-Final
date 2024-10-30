import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: '' });
    const [usuarioEditando, setUsuarioEditando] = useState(null);

    useEffect(() => {
        // Cargar usuarios desde el backend al montar el componente
        axios.get('/api/usuarios')
            .then(response => {
                const data = response.data;
                if (Array.isArray(data)) {
                    setUsuarios(data);
                } else {
                    console.error('La respuesta no es un array:', data);
                }
            })
            .catch(error => {
                console.error('Error al obtener usuarios:', error);
            });
    }, []);

    const eliminarUsuario = (id) => {
        axios.delete(`/api/usuarios/${id}`)
            .then(() => setUsuarios(usuarios.filter(usuario => usuario.id !== id)))
            .catch(error => console.error('Error al eliminar usuario:', error));
    };

    const suspenderUsuario = (id) => {
        axios.put(`/api/usuarios/${id}/suspender`)
            .then(response => setUsuarios(usuarios.map(usuario =>
                usuario.id === id ? response.data : usuario
            )))
            .catch(error => console.error('Error al suspender usuario:', error));
    };

    const agregarUsuario = (evento) => {
        evento.preventDefault();
        const usuarioConId = { ...nuevoUsuario, id: new Date().getTime(), activo: true };
        axios.post('/api/usuarios', usuarioConId)
            .then(response => setUsuarios([...usuarios, response.data]))
            .catch(error => console.error('Error al agregar usuario:', error));
        setNuevoUsuario({ nombre: '' });
    };

    const manejarCambio = (evento) => {
        setNuevoUsuario({ ...nuevoUsuario, [evento.target.name]: evento.target.value });
    };

    const editarUsuario = (usuario) => {
        setUsuarioEditando(usuario);
    };

    const actualizarUsuario = (evento) => {
        evento.preventDefault();
        axios.put(`/api/usuarios/${usuarioEditando.id}`, usuarioEditando)
            .then(response => {
                setUsuarios(usuarios.map(usuario =>
                    usuario.id === usuarioEditando.id ? response.data : usuario
                ));
                setUsuarioEditando(null);
            })
            .catch(error => console.error('Error al actualizar usuario:', error));
    };

    const manejarCambioEdicion = (evento) => {
        setUsuarioEditando({ ...usuarioEditando, [evento.target.name]: evento.target.value });
    };

    return (
        <div>
            <h3>Gestión de Usuarios</h3>
            <form onSubmit={agregarUsuario}>
                <input
                    type="text"
                    name="nombre"
                    value={nuevoUsuario.nombre}
                    onChange={manejarCambio}
                    placeholder="Nombre del usuario"
                    required
                />
                <button type="submit">Agregar Usuario</button>
            </form>
            <ul>
                {Array.isArray(usuarios) && usuarios.map((usuario, index) => (
                    <li key={index}>
                        {usuario.nombre} - {usuario.activo ? "Activo" : "Inhabilitado"}
                        <button onClick={() => suspenderUsuario(usuario.id)}>Inhabilitar</button>
                        <button onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
                        <button onClick={() => editarUsuario(usuario)}>Editar</button>
                    </li>
                ))}
            </ul>
            {usuarioEditando && (
                <form onSubmit={actualizarUsuario}>
                    <h3>Editar Usuario</h3>
                    <input
                        type="text"
                        name="nombre"
                        value={usuarioEditando.nombre}
                        onChange={manejarCambioEdicion}
                        required
                    />
                    <button type="submit">Actualizar Usuario</button>
                    <button onClick={() => setUsuarioEditando(null)}>Cancelar</button>
                </form>
            )}
        </div>
    );
};

export default AdminUsuarios;
