import Select from 'react-select';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import {
    QUERY_PRODUCTOS
} from '../../gql/querys/productos';
import { useContext, useEffect, useState } from 'react';
import PedidoContext from '../../context/pedidos/PedidoContext';

const AsignarProductos = () => {

    const router = useRouter();

    const [ producto, setProducto ] = useState([]);

    const { seleccionarProducto, actualizarTotal } = useContext(PedidoContext);

    const { data, loading, error } = useQuery(QUERY_PRODUCTOS);

    useEffect(() => {
        seleccionarProducto(producto);
        actualizarTotal();
    }, [producto]);

    if (loading) return "Cargando...";

    if (!data.obtenerProductos) {
        router.push('/');
        return "Cargando...";
    } 

    const { obtenerProductos } = data;


    const fnSeleccionarProducto = productos => {
        setProducto(productos);
    }

    return (
        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
                1- Seleccione los productos 
            </p>
            <Select 
                className="mt-3 "
                options={ obtenerProductos }
                isMulti={ true }
                onChange={ option => fnSeleccionarProducto(option) }
                getOptionValue={ options => options.id }
                getOptionLabel={ options => `${ options.nombre } - ${ options.stock } Disponibles` }
                placeholder="Seleccione los productos"
                noOptionsMessage={ () => "No hay resultados" }
            />
        </>
    )
}

export default AsignarProductos
