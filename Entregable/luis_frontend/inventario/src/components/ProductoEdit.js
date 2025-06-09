import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProductoEdit = () => {
  const [producto, setProducto] = useState({ nombre: '', descripcion: '', precio: '', stock: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/api/productos/${id}`)
      .then(res => setProducto(res.data));
  }, [id]);

  const handleChange = e => setProducto({ ...producto, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:3001/api/productos/${id}`, producto);
    navigate('/productos');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Producto</h2>
      <input name="nombre" value={producto.nombre} onChange={handleChange} />
      <input name="descripcion" value={producto.descripcion} onChange={handleChange} />
      <input name="precio" type="number" value={producto.precio} onChange={handleChange} />
      <input name="stock" type="number" value={producto.stock} onChange={handleChange} />
      <button type="submit">Actualizar</button>
    </form>
  );
};

export default ProductoEdit;
