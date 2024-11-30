import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = () => {
  const navigate = useNavigate();

  const productos = [
    {
      title: "Agua Mineral",
      description: "Agua refrescante para mantenerte hidratado durante el juego.",
      image: "https://www.lavanguardia.com/files/og_thumbnail/files/fp/uploads/2020/10/05/5f7b260277fed.r_d.1244-497-0.jpeg",
      price: "$1500",
    },
    {
      title: "Gatorade Naranja",
      description: "Bebida isotónica para recargar energías después del partido.",
      image: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/33da7431854577.5663b0af9e814.jpg",
      price: "$2900",
    },
    {
      title: "Cerveza Sin Alcohol",
      description: "La opción refrescante y sin alcohol para después del partido.",
      image: "https://http2.mlstatic.com/D_NQ_NP_683424-MLA72689521327_112023-O.webp",
      price: "$2200",
    },
    {
      title: "Papas Fritas",
      description: "Snack salado y crujiente para disfrutar mientras descansas.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeOGgsSkYAEiHJWEY917yXrdVK47ze1httUw&s",
      price: "$2400",
    },
    {
      title: "Sándwich de Jamón y Queso",
      description: "Delicioso sándwich para recargar energías entre partidos.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6ul1tbXJVHHq2ydK3qK5HM0-OCkeiVbid-SBw4jrIAN5XN_OXclAS2g62cOBY__Xeo5c&usqp=CAU",
      price: "$1750",
    },
  ];

  const handleAgregarAlCarrito = (producto) => {
    navigate("/carrito", { state: { producto } });
  };

  const handleVerTodosLosProductos = () => {
    navigate("/ecommerce");
  };

  return (
    <div className="product-card-container">
      {productos.map((producto, index) => (
        <div key={index} className="product-card">
          <img src={producto.image} alt={producto.title} className="product-card-image" />
          <div className="product-card-content">
            <h3 className="product-title">{producto.title}</h3>
            <p className="product-description">{producto.description}</p>
            <p className="product-price">{producto.price}</p>
            <div className="button-container">
              <button className="button" onClick={() => handleAgregarAlCarrito(producto)}>
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="view-all-button-container">
        <button className="view-all-button" onClick={handleVerTodosLosProductos}>
          Ver Todos los Productos
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
