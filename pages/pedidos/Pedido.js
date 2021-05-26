import React, { useEffect, useState } from 'react'

const Pedido = ({pedido}) => {

    const { id, total, cliente, estado } = pedido;

    const [ estadoPedido, setEstadoPedido ] = useState(estado);

    useEffect(() => {
        if (estadoPedido) {
            setEstadoPedido(setEstadoPedido)
        }
    }, [estadoPedido])

    console.log(cliente)
    return (
        <tr>
            <td className="border px-4 py-2">{ cliente.nombre } { cliente.apellido }</td>
            <td className="border px-4 py-2">
                <select
                    className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 py-2 text-center rounded leading-tigth focus:outline-none focus:bg-blue-600 focus:border-blue-500 text-xs font-bold"
                    value={ estadoPedido }
                >
                    <option value="COMPLETADO">COMPLETADO</option>
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="CANCELADO">CANCELADO</option>
                </select>
            </td>
            <td className="border px-4 py-2">{ cliente.nombre } { cliente.apellido }</td>
        </tr>
    )
}

export default Pedido
