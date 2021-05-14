import React, { useState } from 'react'
import { Layouts } from '../../components/Layouts'
import * as Yup from 'yup'
import { useMutation, useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import Swal from 'sweetalert2';


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

const MUTATION_ACTUALIZAR_CLIENTE = gql`
    mutation actualizarCliente($id: ID!, $input: ClienteInput) {
        actualizarCliente(id: $id, input: $input) {
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

const QUERY_CLIENTE_USUARIO = gql`
    query obtenerCliente($id: ID!) {
        obtenerCliente(id: $id) {
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

    const [ state, setState ] = useState({
        mensaje: null
    });

    const router = useRouter();

    const { query: { id } } = router;
        
    const { data, loading, error } = useQuery(QUERY_CLIENTE_USUARIO, {
        variables: {
            id
        }
    });

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

    const [ actualizarCliente ] = useMutation(MUTATION_ACTUALIZAR_CLIENTE);


    if (loading){
        return 'Cargando...';
    } 

    let initialValues = {
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: '',
    }

    let op = "save";
    let boton = "Registrar cliente";

    if (data) {
        op = "update";
        boton = "Actualizar cliente";

        const { obtenerCliente } = data;

        initialValues = {
            ...obtenerCliente
        }
    }

    const validationSchema = Yup.object({
        nombre: Yup.string().required('El Nombre es obligatorio'),
        apellido: Yup.string().required('El Apellido es obligatorio'),
        empresa: Yup.string().required('La empresa es obligatoria'),
        email: Yup.string().email('El Email no es válido').required('El Email es requerido'),
    })

    const fnGuardarCliente = async valores => {
        try {

            const { nombre, apellido, email, empresa, telefono } = valores;

            const { data } = await guardarCliente({
                variables: {
                    input: {
                        nombre, apellido, email, empresa, telefono
                    }
                }
            })

            Swal.fire(
                'Bien!',
                'El cliente ha sido registrado éxitosamente',
                'success'
            )
    
            router.push('/cliente');
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

    const fnActualizarCliente = async valores => {
        try {

            const { nombre, apellido, email, empresa, telefono } = valores;

            const { data } = await actualizarCliente({
                variables: {
                    id,
                    input: {
                        nombre, apellido, email, empresa, telefono
                    }
                }
            })

            Swal.fire(
                'Bien!',
                'El cliente ha sido actualizado éxitosamente',
                'success'
            )
    
            router.push('/cliente');
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

    return (
        <Layouts>

            <h1 className="text-2xl text-gray-800 font-light text-center">Formulario Cliente</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

                    <Formik
                        validationSchema={validationSchema}
                        enableReinitialize
                        initialValues={initialValues}
                        onSubmit={ valores => {
                            if (op === "save") {
                                fnGuardarCliente(valores);
                            } else {
                                fnActualizarCliente(valores);
                            }
                        }}
                    >

                    {props => {

                        const { nombre, apellido, email, empresa, telefono} = props.values;

                        return (
                            <form
                                className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                                onSubmit={props.handleSubmit}
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
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={nombre}
                                    />
                                </div>
                                {(props.touched.nombre && props.errors.nombre) && (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">{props.errors.nombre}</p>
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
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={apellido}
                                    />
                                </div>
                                {(props.touched.apellido && props.errors.apellido) && (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">{props.errors.apellido}</p>
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
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={empresa}
                                    />
                                </div>
                                {(props.touched.empresa && props.errors.empresa) && (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">{props.errors.empresa}</p>
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
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={email}
                                    />
                                </div>
                                {(props.touched.email && props.errors.email) && (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">{props.errors.email}</p>
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
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={telefono}
                                    />
                                </div>

                                <input 
                                    type="submit"
                                    className="bg-gray-800 w-full mt-5 p-2 text-white font-bold hover:bg-gray-900 rounded"
                                    value={boton}
                                />
                            </form>
                
                        )
                    }}
                        
                    </Formik>

                    </div>
            </div>
        </Layouts>
    )
}

export default NuevoCliente
