import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminReservas = () => {
    const [reservas, setReservas] = useState([]);
    const [nuevaReserva, setNuevaReserva] = useState({ cancha: '', fecha: '', horaInicio: '', horaFin: '' });

    useEffect(() => {
        // Cargar reservas desde el backend al montar el componente
        axios.get('/api/reservas')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setReservas(response.data);
                } else {
                    console.error('La respuesta no es un array:', response.data);
                }
            })
            .catch(error => console.log(error));
    }, []);

    const eliminarReserva = (id) => {
        axios.delete(`/api/reservas/${id}`)
            .then(() => setReservas(reservas.filter(reserva => reserva.id !== id)))
            .catch(error => console.log(error));
    };

    const agregarReserva = (evento) => {
        evento.preventDefault();
        const reservaConId = { ...nuevaReserva, id: new Date().getTime() };
        axios.post('/api/reservas', reservaConId)
            .then(response => setReservas([...reservas, response.data]))
            .catch(error => console.log(error));
        setNuevaReserva({ cancha: '', fecha: '', horaInicio: '', horaFin: '' });
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
                {Array.isArray(reservas) && reservas.map((reserva, index) => (
                    <li key={index}>
                        Cancha: {reserva.cancha}, Fecha: {reserva.fecha}, Hora: {reserva.horaInicio} - {reserva.horaFin}
                        <button onClick={() => eliminarReserva(reserva.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminReservas;
