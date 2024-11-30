import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import { getAuthToken } from '../auth'; // Importar la función getAuthToken

const AdminProductos = () => {
    const [productos, setProductos] = useState([]);
    const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', precio: '', imagen: '', categoria: '' });
    const [productoEditando, setProductoEditando] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        obtenerProductos();
    }, []);

    const obtenerProductos = async () => {
        try {
            const token = getAuthToken(); // Usar la función getAuthToken para obtener el token
            if (!token) {
                console.error('Token no disponible');
                return;
            }
            console.log('Haciendo solicitud para obtener productos con token:', token);
            const response = await axios.get('https://backend-proyecto-final-xuul.onrender.com/api/productos', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Respuesta de productos:', response.data.productos);
            setProductos(response.data.productos);
        } catch (error) {
            console.error('Error al obtener productos:', error);
            if (error.response) {
                console.error('Detalles del error:', error.response.data);
            }
        }
    };

    // Resto del código permanece igual


    const agregarProducto = async (evento) => {
        evento.preventDefault();
        console.log("Datos del nuevo producto antes de enviar:", nuevoProducto);

        const { nombre, precio, imagen, categoria } = nuevoProducto;
        if (!nombre || !precio || !categoria) {
            console.error("El nombre, el precio y la categoría son obligatorios");
            return;
        }

        try {
            const response = await axiosInstance.post('/api/productos', nuevoProducto, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("Respuesta del servidor al agregar producto:", response.data);
            setProductos([...productos, response.data.producto]);
            setNuevoProducto({ nombre: '', precio: '', imagen: '', categoria: '' });
        } catch (error) {
            console.error('Error al agregar producto:', error);
            if (error.response) {
                console.error('Datos de error del servidor:', error.response.data);
            }
        }
    };

    const eliminarProducto = async (id) => {
        console.log("Intentando eliminar producto con ID:", id);
        try {
            const response = await axiosInstance.delete(`/api/productos/${id}`);
            console.log("Respuesta del servidor al eliminar producto:", response.data);
            setProductos(prevProductos => prevProductos.filter(producto => producto.id !== id && producto._id !== id));
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            if (error.response) {
                console.error('Datos de error del servidor:', error.response.data);
            }
        }
    };
    const actualizarProducto = async (evento) => {
        evento.preventDefault();
        console.log("Datos del producto editado antes de enviar:", productoEditando);

        const id = productoEditando.id || productoEditando._id;
        if (!id) {
            console.error('Error: ID del producto es indefinido');
            return;
        }

        // Validar datos
        const { nombre, precio, imagen, categoria } = productoEditando;
        if (!nombre || !precio || !categoria) {
            console.error("El nombre, el precio y la categoría son obligatorios");
            alert("El nombre, el precio y la categoría son obligatorios");
            return;
        }

        try {
            const response = await axiosInstance.put(`/api/productos/${id}`, {
                nombre,
                precio,
                imagen,
                categoria
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("Respuesta del servidor al actualizar producto:", response.data);
            setProductos(prevProductos => prevProductos.map(producto =>
                producto._id === id ? response.data.producto : producto
            ));
            setModalIsOpen(false);
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            if (error.response) {
                console.error('Datos de error del servidor:', error.response.data);
            }
        }
    };

    const manejarCambioEdicion = (evento) => {
        setProductoEditando({ ...productoEditando, [evento.target.name]: evento.target.value });
    };

    const editarProducto = (producto) => {
        setProductoEditando(producto);
        setModalIsOpen(true);
    };

    const manejarCambio = (evento) => {
        setNuevoProducto({ ...nuevoProducto, [evento.target.name]: evento.target.value });
    };

    const manejarCambioImagen = (evento) => {
        const file = evento.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setNuevoProducto({ ...nuevoProducto, imagen: reader.result });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const manejarCambioImagenEdicion = (evento) => {
        const file = evento.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProductoEditando({ ...productoEditando, imagen: reader.result });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };
    return (
        <div>
            <h3>Gestión de Productos</h3>
            <Form onSubmit={agregarProducto}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        name="nombre"
                        value={nuevoProducto.nombre}
                        onChange={manejarCambio}
                        placeholder="Nombre del producto"
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="number"
                        name="precio"
                        value={nuevoProducto.precio}
                        onChange={manejarCambio}
                        placeholder="Precio del producto"
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="text"
                        name="categoria"
                        value={nuevoProducto.categoria}
                        onChange={manejarCambio}
                        placeholder="Categoría del producto"
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.File
                        name="imagen"
                        label="Imagen del producto"
                        onChange={manejarCambioImagen}
                    />
                </Form.Group>
                <Button type="submit">Agregar Producto</Button>
            </Form>
            <ul>
                {productos.map((producto) => {
                    const key = producto.id || producto._id || `producto-${Math.random()}`;
                    return (
                        <li key={key}>
                            <img src={producto.imagen} alt={producto.nombre} width="50" height="50"/>
                            {producto.nombre} - ${producto.precio} - {producto.categoria}
                            <Button variant="warning" onClick={() => editarProducto(producto)}>Editar</Button>
                            <Button variant="danger" onClick={() => eliminarProducto(producto.id || producto._id)}>Eliminar</Button>
                        </li>
                    );
                })}
            </ul>
            <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productoEditando && (
                        <Form onSubmit={actualizarProducto}>
                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    value={productoEditando.nombre}
                                    onChange={manejarCambioEdicion}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Precio</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="precio"
                                    value={productoEditando.precio}
                                    onChange={manejarCambioEdicion}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Categoría</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="categoria"
                                    value={productoEditando.categoria}
                                    onChange={manejarCambioEdicion}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Imagen</Form.Label>
                                <Form.File
                                    name="imagen"
                                    label="Imagen del producto"
                                    onChange={manejarCambioImagenEdicion}
                                />
                            </Form.Group>
                            <Button type="submit">Actualizar Producto</Button>
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

export default AdminProductos;
