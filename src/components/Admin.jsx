import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import AdminUsuarios from './AdminUsuarios';
import AdminProductos from './AdminProductos';
import AdminReservas from './AdminReservas';
import '../styles/AdminScreen.css';

const Admin = () => {
    return (
        <div className='panelAdmin'>
            <h1>Panel de Administración</h1>
            <nav>
                <ul>
                    <li><button><Link to="usuarios">Usuarios</Link></button></li>
                    <li><button><Link to="productos">Productos</Link></button></li>
                    <li><button><Link to="reservas">Reservas</Link></button></li>
                </ul>
            </nav>
            <div>
                <Routes>
                    <Route path="usuarios" element={<AdminUsuarios />} />
                    <Route path="productos" element={<AdminProductos />} />
                    <Route path="reservas" element={<AdminReservas />} />
                </Routes>
            </div>
        </div>
    );
};

export default Admin;
