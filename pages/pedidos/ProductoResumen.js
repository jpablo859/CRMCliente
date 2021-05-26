import React, { useContext, useEffect, useState } from 'react'
import PedidoContext from '../../context/pedidos/PedidoContext';
import { formatNumber } from '../../globales';

const ProductoResumen = ({producto}) => {

    const { cantidadProducto, actualizarTotal } = useContext(PedidoContext);

    const [ cantidad, setCantidad ] = useState(1);

    useEffect(() => {
        actualizarCantidad();
        actualizarTotal();
    }, [ cantidad ]);

    const actualizarCantidad = () => {
        const nuevoProducto = { ...producto, cantidad: Number(cantidad) };
        cantidadProducto(nuevoProducto);
    }

    const { nombre, precio } = producto;

    return (
        <div className="md:flex md:justify-between md:items-center mt-5">
            <div className="md:w-2/4 mb-2 md:mb-0">
                <p className="text-sm">{ nombre }</p>
                <p>$ { formatNumber(precio) }</p>
            </div>
            <input
                type="number"
                placeholder="Cantidad"
                className="shadow appearance-none border rounded w-full py-2 px-3 mx-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
                onChange={ e => setCantidad(e.target.value) }
                value={ cantidad }
            />   
            <div className="md:w-2/4 mb-2 md:mb-0 text-right">
                <p className="text-sm">Subtotal</p>
                <p>$ { formatNumber(cantidad*precio) }</p>
            </div>
        </div>
    )
}

export default ProductoResumen
