import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';

const AdminReservas = () => {
    const [reservas, setReservas] = useState([]);
    const [nuevaReserva, setNuevaReserva] = useState({ cancha: '', fecha: '', horaInicio: '', horaFin: '' });

    useEffect(() => {
        obtenerReservas();
    }, []);

    const obtenerReservas = async () => {
        try {
            console.log('Haciendo solicitud para obtener reservas...');
            const response = await axiosInstance.get('/api/reservas');
            if (Array.isArray(response.data.reservas)) {
                setReservas(response.data.reservas);
            } else {
                console.error('La respuesta no es un array:', response.data);
            }
        } catch (error) {
            console.error('Error al obtener reservas:', error);
        }
    };

    const eliminarReserva = async (id) => {
        try {
            await axiosInstance.delete(`/api/reservas/${id}`);
            setReservas(reservas.filter(reserva => reserva.id !== id));
        } catch (error) {
            console.error('Error al eliminar reserva:', error);
        }
    };

    const agregarReserva = async (evento) => {
        evento.preventDefault();
        try {
            const response = await axiosInstance.post('/api/reservas', nuevaReserva);
            setReservas([...reservas, response.data]);
            setNuevaReserva({ cancha: '', fecha: '', horaInicio: '', horaFin: '' });
        } catch (error) {
            console.error('Error al agregar reserva:', error);
        }
    };

    const manejarCambio = (evento) => {
        setNuevaReserva({ ...nuevaReserva, [evento.target.name]: evento.target.value });
    };

    return (
        <div>
            <h3>Gestión de Reservas</h3>
            <form onSubmit={agregarReserva}>
                <input
                    type="text"
                    name="cancha"
                    value={nuevaReserva.cancha}
                    onChange={manejarCambio}
                    placeholder="Cancha"
                    required
                />
                <input
                    type="date"
                    name="fecha"
                    value={nuevaReserva.fecha}
                    onChange={manejarCambio}
                    required
                />
                <input
                    type="time"
                    name="horaInicio"
                    value={nuevaReserva.horaInicio}
                    onChange={manejarCambio}
                    required
                />
                <input
                    type="time"
                    name="horaFin"
                    value={nuevaReserva.horaFin}
                    onChange={manejarCambio}
                    required
                />
                <button type="submit">Agregar Reserva</button>
            </form>
            <ul>
                {reservas.map((reserva) => (
                    <li key={reserva.id}>
                        Cancha: {reserva.cancha}, Fecha: {reserva.fecha}, Hora: {reserva.horaInicio} - {reserva.horaFin}
                        <button onClick={() => eliminarReserva(reserva.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminReservas;
