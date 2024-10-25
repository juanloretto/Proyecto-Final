import React, { useState } from 'react'

const Productos = () => {
    const [productos, setProductos] = useState([])
    const [nuevoProducto, setNuevoProducto] = useState('')

    const agregarProducto = ()=>{
        //logica para agregar productos
    }

  return (
    <div>
        <h3>Productos</h3>
        <input
         type="text" 
         value={nuevoProducto} 
         onChange={(e)=> setNuevoProducto(e.target.value)} 
         placeholder='Agregar nuevo producto'
         />
         <button onClick={agregarProducto}>Agregar producto</button>
         <ul>
            {productos.map((producto,index)=>(
                <li key={index}>{producto}</li>
            ))}
         </ul>
    </div>
  )
}

export default Productos