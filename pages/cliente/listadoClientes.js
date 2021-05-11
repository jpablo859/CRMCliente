import React from 'react'
import Swal from 'sweetalert2'
import { useMutation, gql } from '@apollo/client'
import Router from 'next/router'

const MUTATION_ELIMINAR_CLIENTE = gql`
    mutation eliminarCliente($id: ID!) {
        eliminarCliente(id: $id)
    }
`;

const QUERY_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      empresa
      email
      telefono
    }
  }
`;

export const ListadoClientes = ({ cliente}) => {

    const [ eliminarCliente ] = useMutation(MUTATION_ELIMINAR_CLIENTE, {
        update(cache) {
            const { obtenerClientesVendedor } = cache.readQuery({
                query: QUERY_CLIENTES_USUARIO
            });

            cache.writeQuery({
                query: QUERY_CLIENTES_USUARIO,
                data: {
                    obtenerClientesVendedor: obtenerClientesVendedor.filter(cliente => cliente.id !== id)
                }
            })
        }
    })

    const {id, nombre, apellido, empresa, email} = cliente;

    const fnEliminarCliente = () => {
        Swal.fire({
            title: 'Desea eliminar el cliente?',
            text: "Esta acción no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await eliminarCliente({
                        variables: {
                            id
                        }
                    })

                    Swal.fire(
                        'Deleted!',
                        data.eliminarCliente,
                        'success'
                    )
                } catch (err) {
                    console.log(err)
                }
            }
        })
    }
    const fnEditarCliente = async () => {
        Router.push({
            pathname: "/cliente/NuevoCliente",
            query: { id }
        })
    }


    return (
        <tr>
            <td className="border px-4 py-2">{nombre} {apellido}</td>
            <td className="border px-4 py-2">{empresa}</td>
            <td className="border px-4 py-2">{email}</td>
            <td className="border px-4 py-2 text-center">
                <button 
                    className="bg-red-700 text-white p-2 rounded-full font-bold hover:bg-red-800 focus:outline-none"
                    title="Eliminar Cliente"
                    onClick={() => fnEliminarCliente()}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
                <button 
                    className="ml-2 bg-yellow-600 text-white p-2 rounded-full font-bold hover:bg-yellow-700 focus:outline-none"
                    title="Editar Cliente"
                    onClick={() => fnEditarCliente()}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>                    
                </button>
            </td>
        </tr>
    )
}
