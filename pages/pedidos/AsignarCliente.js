import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { QUERY_CLIENTES_USUARIO } from '../../gql/querys/clientes';
import PedidoContext from '../../context/pedidos/PedidoContext';

const AsignarCliente = () => {

    const router = useRouter();

    const [ cliente, setCliente ] = useState([]);

    const { seleccionarCliente } = useContext(PedidoContext);
    
    const { data, loading, error} = useQuery(QUERY_CLIENTES_USUARIO);
    
    useEffect(() => {
        seleccionarCliente(cliente);
    }, [cliente]);

    const fnSeleccionarCliente = cliente => {
        setCliente(cliente);
    }

    if (loading) return "Cargando...";

    if (!data.obtenerClientesVendedor) router.push('/');

    const { obtenerClientesVendedor } = data;

    return (

        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
                1- Seleccione un cliente
            </p>
            <Select 
                className="mt-3 "
                options={ obtenerClientesVendedor }
                onChange={ option => fnSeleccionarCliente(option) }
                getOptionValue={ options => options.id }
                getOptionLabel={ options => `${ options.nombre } ${ options.apellido }` }
                placeholder="Seleccione el cliente"
                noOptionsMessage={ () => "No hay resultados" }
            />
        </>
    )
}

export default AsignarCliente
