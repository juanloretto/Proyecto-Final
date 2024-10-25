import React, {useState} from 'react'

const Canchas = () => {
const [canchas, setCanchas] = useState([])
const [nuevoHorario, setNuevoHorario] = useState('')

const agregarCancha = () =>{
    //logica para agregar canchas
}

const reservarCancha = () =>{
    //logica para reservar canchas y verificar si el horario esta ocupado
}

  return (
    <div>
        <div>Canchas</div>
        /*secciones para agregar y listar canchas */
        <input 
            type="text"
            value={nuevoHorario}
            onChange={(e)=> setNuevoHorario(e.target.value)}
            placeholder='Agregar nuevo horario'     
         />
         <button onClick={agregarCancha}>Agregar Cancha</button>
         <ul>
            {canchas.map((cancha,index) =>(
                <li key={index}>
                    {cancha.horario}
                    <button onClick={()=>reservarCancha(cancha.horario)}>Reservar</button>

                </li>
            ))}
         </ul>
    </div>
  )
}

export default Canchas