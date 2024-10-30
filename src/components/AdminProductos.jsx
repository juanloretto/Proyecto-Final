import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminProductos = () => {
    const [productos, setProductos] = useState([]);
    const [nuevoProducto, setNuevoProducto] = useState({ nombre: '' });

    useEffect(() => {
        // Cargar productos desde el backend al montar el componente
        axios.get('/api/productos')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setProductos(response.data);
                } else {
                    console.error('La respuesta no es un array:', response.data);
                }
            })
            .catch(error => console.log(error));
    }, []);

    const eliminarProducto = (id) => {
        axios.delete(`/api/productos/${id}`)
            .then(() => setProductos(productos.filter(producto => producto.id !== id)))
            .catch(error => console.log(error));
    };

    const agregarProducto = (evento) => {
        evento.preventDefault();
        const productoConId = { ...nuevoProducto, id: new Date().getTime() };
        axios.post('/api/productos', productoConId)
            .then(response => setProductos([...productos, response.data]))
            .catch(error => console.log(error));
        setNuevoProducto({ nombre: '' });
    };

    const manejarCambio = (evento) => {
        setNuevoProducto({ ...nuevoProducto, [evento.target.name]: evento.target.value });
    };

    return (
        <div>
            <h3>Gestión de Productos</h3>
            <form onSubmit={agregarProducto}>
                <input
                    type="text"
                    name="nombre"
                    value={nuevoProducto.nombre}
                    onChange={manejarCambio}
                    placeholder="Nombre del producto"
                    required
                />
                <button type="submit">Agregar Producto</button>
            </form>
            <ul>
                {Array.isArray(productos) && productos.map((producto, index) => (
                    <li key={index}>
                        {producto.nombre}
                        <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminProductos;
