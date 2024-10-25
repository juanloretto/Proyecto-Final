import React, {useState} from 'react'

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]) //lista de usuarios simulada

    const eliminarUsuario = (id)=>{
        //logica para eliminar o inactivar usuario
    }

  return (
    <div>
        <h3>Usuarios</h3>
        <ul>
            {usuarios.map((usuario,index)=>(
                <li key={index}>
                    {usuario.nombre}
                    <button onClick={()=>eliminarUsuario(usuario.id)}>Eliminar</button>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Usuarios