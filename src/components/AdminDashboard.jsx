import React from 'react'
import Canchas from './Canchas'
import Productos from './Productos'
import Usuarios from './Usuarios'


const AdminDashboard = () => {
  return (
    <div>
        <h2>Panel de Administración</h2>
        <Canchas/>
        <Productos/>
        <Usuarios/>
    </div>
  )
}

export default AdminDashboard