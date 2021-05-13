import React from 'react'
import Swal from 'sweetalert2'
import { useMutation, gql } from '@apollo/client'
import Router from 'next/router'

const MUTATION_ELIMINAR_PRODUCTO = gql`
    mutation eliminarProducto($id: ID!) {
        eliminarProducto(id: $id)
    }
`;

const QUERY_PRODUCTOS = gql`
    query obtenerProductos {
        obtenerProductos {
            id
            nombre
            stock
            precio
        }
    } 
`;

export const ListadoProductos = ({ producto}) => {

    const [ eliminarProducto ] = useMutation(MUTATION_ELIMINAR_PRODUCTO, {
        update(cache) {
            const { obtenerProductos } = cache.readQuery({
                query: QUERY_PRODUCTOS
            });

            cache.writeQuery({
                query: QUERY_PRODUCTOS,
                data: {
                    obtenerProductos: obtenerProductos.filter(producto => producto.id !== id)
                }
            })
        }
    })

    const {id, nombre, stock, precio} = producto;

    const fnEliminarProducto = () => {
        Swal.fire({
            title: 'Desea eliminar el producto?',
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
                    const { data } = await eliminarProducto({
                        variables: {
                            id
                        }
                    })

                    Swal.fire(
                        'Deleted!',
                        data.eliminarProducto,
                        'success'
                    )
                } catch (err) {
                    console.log(err)
                }
            }
        })
    }
    const fnActualizarProducto = async () => {
        Router.push({
            pathname: "/productos/formulario",
            query: { id }
        })
    }


    return (
        <tr>
            <td className="border px-4 py-2">{nombre}</td>
            <td className="border px-4 py-2">{stock}</td>
            <td className="border px-4 py-2">{precio}</td>
            <td className="border px-4 py-2 text-center">
                <button 
                    className="bg-red-700 text-white p-2 rounded-full font-bold hover:bg-red-800 focus:outline-none"
                    title="Eliminar Cliente"
                    onClick={() => fnEliminarProducto()}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
                <button 
                    className="ml-2 bg-yellow-600 text-white p-2 rounded-full font-bold hover:bg-yellow-700 focus:outline-none"
                    title="Editar Cliente"
                    onClick={() => fnActualizarProducto()}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>                    
                </button>
            </td>
        </tr>
    )
}
