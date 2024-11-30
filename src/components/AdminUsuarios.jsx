import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig'; // Asegúrate de que 'axiosConfig' está configurado correctamente
import { Button, Modal, Form } from 'react-bootstrap';
import { getAuthToken } from '../auth'; // Importar la función getAuthToken

const AdminUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: '', email: '', password: '', rol: 'USER_ROLE' });
    const [usuarioEditando, setUsuarioEditando] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [mostrarPassword, setMostrarPassword] = useState(false);

    useEffect(() => {
        obtenerUsuarios();
    }, []);
    const obtenerUsuarios = async () => {
        try {
            const token = getAuthToken(); // Usar la función getAuthToken para obtener el token
            if (!token) {
                console.error('Token no disponible');
                return;
            }
            console.log('Haciendo solicitud para obtener usuarios con token:', token);
            const response = await axiosInstance.get('/api/usuarios', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Respuesta de usuarios:', response.data.usuarios);
            setUsuarios(response.data.usuarios);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            if (error.response) {
                console.error('Detalles del error:', error.response.data);
            }
        }
    };
    const agregarUsuario = async (evento) => {
        evento.preventDefault();
        console.log("Datos del nuevo usuario antes de enviar:", nuevoUsuario);

        const { nombre, email, password, rol } = nuevoUsuario;
        if (!nombre || !email || !password || !rol) {
            console.error("Todos los campos son obligatorios");
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            console.error("La contraseña debe tener mínimo 8 caracteres, una mayúscula, minúscula y un dígito");
            alert("La contraseña debe tener mínimo 8 caracteres, una mayúscula, minúscula y un dígito");
            return;
        }

        try {
            const token = getAuthToken(); // Usar la función getAuthToken para obtener el token
            const response = await axiosInstance.post('/api/usuarios', nuevoUsuario, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            console.log("Respuesta del servidor al agregar usuario:", response.data);
            setUsuarios([...usuarios, response.data.usuario]);
            setNuevoUsuario({ nombre: '', email: '', password: '', rol: 'USER_ROLE', status: true });
        } catch (error) {
            console.error('Error al agregar usuario:', error);
            if (error.response) {
                console.error('Datos de error del servidor:', error.response.data);
            }
        }
    };
    const eliminarUsuario = async (id) => {
        console.log("Intentando eliminar usuario con ID:", id);
        try {
            const token = getAuthToken(); // Usar la función getAuthToken para obtener el token
            const response = await axiosInstance.delete(`/api/usuarios/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("Respuesta del servidor al eliminar usuario:", response.data);
            setUsuarios(prevUsuarios => prevUsuarios.filter(usuario => usuario.id !== id && usuario._id !== id));
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            if (error.response) {
                console.error('Datos de error del servidor:', error.response.data);
            }
        }
    };
    const actualizarUsuario = async (evento) => {
        evento.preventDefault();
        console.log("Datos del usuario editado antes de enviar:", usuarioEditando);

        const id = usuarioEditando.id || usuarioEditando._id;
        if (!id) {
            console.error('Error: ID del usuario es indefinido');
            return;
        }

        // Validar datos
        const { nombre, email, password, rol, status } = usuarioEditando;
        if (!nombre || !email || !rol) {
            console.error("Todos los campos son obligatorios");
            alert("Todos los campos son obligatorios");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.error("El email no es válido");
            alert("El email no es válido");
            return;
        }

        if (password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
            console.error("La contraseña debe tener mínimo 8 caracteres, una mayúscula, minúscula y un dígito");
            alert("La contraseña debe tener mínimo 8 caracteres, una mayúscula, minúscula y un dígito");
            return;
        }

        try {
            const token = getAuthToken(); // Usar la función getAuthToken para obtener el token
            const response = await axiosInstance.put(`/api/usuarios/${id}`, {
                nombre,
                email,
                password: password || undefined,
                rol,
                status
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            console.log("Respuesta del servidor al actualizar usuario:", response.data);
            setUsuarios(prevUsuarios => prevUsuarios.map(usuario =>
                usuario._id === id ? response.data.usuario : usuario
            ));
            setModalIsOpen(false);
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            if (error.response) {
                console.error('Datos de error del servidor:', error.response.data);
            }
        }
    };
    const manejarCambioEdicion = (evento) => {
        setUsuarioEditando({ ...usuarioEditando, [evento.target.name]: evento.target.value });
    };

    const editarUsuario = (usuario) => {
        setUsuarioEditando({ ...usuario, password: '' });  // Vaciar el campo de contraseña para introducir una nueva
        setModalIsOpen(true);
    };

    const manejarCambio = (evento) => {
        setNuevoUsuario({ ...nuevoUsuario, [evento.target.name]: evento.target.value });
    };

    const toggleMostrarPassword = () => {
        setMostrarPassword(!mostrarPassword);
    };

    const toggleStatusUsuario = async (usuario) => {
        try {
            const token = getAuthToken(); // Usar la función getAuthToken para obtener el token
            const response = await axiosInstance.put(`/api/usuarios/${usuario._id}`, {
                ...usuario,
                status: !usuario.status
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            console.log("Respuesta del servidor al actualizar estado del usuario:", response.data);
            setUsuarios(prevUsuarios => prevUsuarios.map(u =>
                u._id === usuario._id ? response.data.usuario : u
            ));
        } catch (error) {
            console.error('Error al actualizar estado del usuario:', error);
            if (error.response) {
                console.error('Datos de error del servidor:', error.response.data);
            }
        }
    };
    return (
        <div>
            <h3>Gestión de Usuarios</h3>
            <Form onSubmit={agregarUsuario}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        name="nombre"
                        value={nuevoUsuario.nombre}
                        onChange={manejarCambio}
                        placeholder="Nombre del usuario"
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="email"
                        name="email"
                        value={nuevoUsuario.email}
                        onChange={manejarCambio}
                        placeholder="Email del usuario"
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type={mostrarPassword ? "text" : "password"}
                        name="password"
                        value={nuevoUsuario.password}
                        onChange={manejarCambio}
                        placeholder="Contraseña del usuario"
                        required
                    />
                    <Form.Check 
                        type="checkbox" 
                        label="Mostrar contraseña" 
                        checked={mostrarPassword}
                        onChange={toggleMostrarPassword} 
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        as="select"
                        name="rol"
                        value={nuevoUsuario.rol}
                        onChange={manejarCambio}
                    >
                        <option value="USER_ROLE">Usuario</option>
                        <option value="ADMIN_ROLE">Administrador</option>
                    </Form.Control>
                </Form.Group>
                <Button type="submit">Agregar Usuario</Button>
            </Form>
            <ul>
                {usuarios.map((usuario) => {
                    const key = usuario.id || usuario._id || `usuario-${Math.random()}`;
                    return (
                        <li key={key}>
                            {usuario.nombre} - {usuario.email} - {usuario.status ? "Activo" : "Inactivo"}
                            <Button variant="warning" onClick={() => editarUsuario(usuario)}>Editar</Button>
                            <Button variant="danger" onClick={() => eliminarUsuario(usuario.id || usuario._id)}>Eliminar</Button>
                            <Button variant="info" onClick={() => toggleStatusUsuario(usuario)}>
                                {usuario.status ? "Deshabilitar" : "Habilitar"}
                            </Button>
                        </li>
                    );
                })}
            </ul>
            <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {usuarioEditando && (
                        <Form onSubmit={actualizarUsuario}>
                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    value={usuarioEditando.nombre}
                                    onChange={manejarCambioEdicion}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={usuarioEditando.email}
                                    onChange={manejarCambioEdicion}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type={mostrarPassword ? "text" : "password"}
                                    name="password"
                                    value={usuarioEditando.password}
                                    onChange={manejarCambioEdicion}
                                />
                                <Form.Check 
                                    type="checkbox" 
                                    label="Mostrar contraseña" 
                                    checked={mostrarPassword}
                                    onChange={toggleMostrarPassword} 
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Rol</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="rol"
                                    value={usuarioEditando.rol}
                                    onChange={manejarCambioEdicion}
                                >
                                    <option value="USER_ROLE">Usuario</option>
                                    <option value="ADMIN_ROLE">Administrador</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Estado</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="status"
                                    value={usuarioEditando.status}
                                    onChange={manejarCambioEdicion}
                                >
                                    <option value={true}>Activo</option>
                                    <option value={false}>Inactivo</option>
                                </Form.Control>
                            </Form.Group>
                            <Button type="submit">Actualizar Usuario</Button>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalIsOpen(false)}>Cancelar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminUsuarios;
