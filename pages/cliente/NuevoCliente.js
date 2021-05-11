import React, { useState } from 'react'
import { Layouts } from '../../components/Layouts'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/router'

const MUTATION_GUARDAR_CLIENTE = gql`
    mutation guardarCliente ($input: ClienteInput!) {
        guardarCliente(input: $input) {
            id
            nombre
            apellido
            empresa
            email
            telefono
        }
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

const NuevoCliente = () => {

    const [ guardarCliente ] = useMutation(MUTATION_GUARDAR_CLIENTE, {
        update(cache, { data: { guardarCliente } }) {
            const { obtenerClientesVendedor } = cache.readQuery({
                query: QUERY_CLIENTES_USUARIO
            })

            cache.writeQuery({
                query: QUERY_CLIENTES_USUARIO,
                data: {
                    obtenerClientesVendedor: [...obtenerClientesVendedor, guardarCliente]
                }
            })

        }
    });

    const router = useRouter();

    const [ state, setState ] = useState({
        mensaje: null
    })

    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            empresa: '',
            email: '',
            telefono: '',
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El Nombre es obligatorio'),
            apellido: Yup.string().required('El Apellido es obligatorio'),
            empresa: Yup.string().required('La empresa es obligatoria'),
            email: Yup.string().email('El Email no es válido').required('El Email es requerido'),
        }),
        onSubmit: async valores => {
            try {
                const { data } = await guardarCliente({
                    variables: {
                        input: valores
                    }
                })

                setState({
                    ...state,
                    mensaje: 'El cliente ha sido registrado éxitosamente'
                })

                setTimeout(() => {
                    router.push('/cliente');
                }, 2000)

            } catch (err) {
                setState({
                    ...state,
                    mensaje: err.message
                })

                setTimeout(() => {
                    setState({
                        ...state,
                        mensaje: null
                    })
                }, 3000)
            }
        }
    })

    const { nombre, apellido, empresa, email, telefono } = formik.values;

    return (
        <Layouts>

            {state.mensaje && (
                <div className="bg-teal-lightest border-t-4 border-teal rounded-b text-teal-darkest px-4 py-3 shadow-md my-2" role="alert">
                    <div className="flex">
                    <svg className="h-6 w-6 text-teal mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg>
                    <div>
                        <p>{state.mensaje}</p>
                    </div>
                    </div>
                </div>
                // <div className="bg-red-600 text-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                //     <p>{state.mensaje}</p>
                // </div>
            )}

            <h1 className="text-2xl text-gray-800 font-light text-center">Nuevo Cliente</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                Nombre
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="nombre"
                                type="text"
                                placeholder="Nombre cliente"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={nombre}
                            />
                        </div>
                        {(formik.touched.nombre && formik.errors.nombre) && (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">{formik.errors.nombre}</p>
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                                Apellido
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="apellido"
                                type="text"
                                placeholder="Apellido cliente"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={apellido}
                            />
                        </div>
                        {(formik.touched.apellido && formik.errors.apellido) && (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">{formik.errors.apellido}</p>
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="empresa">
                                Empresa
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="empresa"
                                type="text"
                                placeholder="Empresa cliente"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={empresa}
                            />
                        </div>
                        {(formik.touched.empresa && formik.errors.empresa) && (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">{formik.errors.empresa}</p>
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Email cliente"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={email}
                            />
                        </div>
                        {(formik.touched.email && formik.errors.email) && (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">{formik.errors.email}</p>
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                                Telefono
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="telefono"
                                type="tel"
                                placeholder="Telefono cliente"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={telefono}
                            />
                        </div>

                        <input 
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white font-bold hover:bg-gray-900 rounded"
                            value="Registrar cliente"
                        />
                    </form>
                </div>
            </div>
        </Layouts>
    )
}

export default NuevoCliente
