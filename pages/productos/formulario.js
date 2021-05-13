import React, { useState } from 'react'
import { Layouts } from '../../components/Layouts'
import * as Yup from 'yup'
import { useMutation, useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import Swal from 'sweetalert2';


const MUTATION_GUARDAR_PRODUCTO = gql`
    mutation guardarProducto ($input: ProductoInput!) {
        guardarProducto(input: $input) {
            id
            nombre
            precio
            stock
        }
    } 
`;

const MUTATION_ACTUALIZAR_PRODUCTO = gql`
    mutation actualizarProducto($id: ID!, $input: ProductoInput!) {
        actualizarProducto(id: $id, input: $input) {
            id
            nombre
            precio
            stock
        }
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

const QUERY_PRODUCTO = gql`
    query obtenerProducto($id: ID!) {
        obtenerProducto(id: $id) {
            id
            nombre
            stock
            precio
        }
    } 
`;

const FormularioProducto = () => {    

    const [ state, setState ] = useState({
        mensaje: null
    });

    const router = useRouter();

    const { query: { id } } = router;
        
    const { data, loading, error } = useQuery(QUERY_PRODUCTO, {
        variables: {
            id
        }
    });

    const [ guardarProducto ] = useMutation(MUTATION_GUARDAR_PRODUCTO, {
        update(cache, { data: { guardarProducto } }) {
            const { obtenerProductos } = cache.readQuery({
                query: QUERY_PRODUCTOS
            })

            cache.writeQuery({
                query: QUERY_PRODUCTOS,
                data: {
                    obtenerProductos: [...obtenerProductos, guardarProducto]
                }
            })
        }
    });

    const [ actualizarProducto ] = useMutation(MUTATION_ACTUALIZAR_PRODUCTO);


    if (loading){
        return 'Cargando...';
    } 

    let initialValues = {
        nombre: '',
        stock: '',
        precio: '',
    }

    let op = "save";
    let boton = "Registrar Producto";

    if (data) {
        op = "update";
        boton = "Actualizar Producto";

        const { obtenerProducto } = data;

        initialValues = {
            ...obtenerProducto
        }
    }
    

    const validationSchema = Yup.object({
        nombre: Yup.string().required('El Nombre es obligatorio'),
        stock: Yup.number().required('El Stock es obligatorio').positive("No se aceptan valores negativos"),
        precio: Yup.number().required('El Precio es obligatorio').positive("No se aceptan valores negativos"),
    })

    const fnGuardarProducto = async valores => {
        try {

            console.log(valores)

            const { nombre, stock, precio } = valores;

            const { data } = await guardarProducto({
                variables: {
                    input: {
                        nombre, stock, precio
                    }
                }
            })
    
            Swal.fire(
                'Bien!',
                'El Producto ha sido almacenado éxitosamente',
                'success'
            )
    
            router.push('/productos');
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

    const fnActualizarProducto = async valores => {
        try {

            const { nombre, stock, precio } = valores;

            const { data } = await actualizarProducto({
                variables: {
                    id,
                    input: {
                        nombre, stock, precio
                    }
                }
            })

            Swal.fire(
                'Bien!',
                'El Producto ha sido actualizado éxitosamente',
                'success'
            )
    
            router.push('/productos');
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

            <h1 className="text-2xl text-gray-800 font-light text-center">Formulario Producto</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

                    <Formik
                        validationSchema={validationSchema}
                        enableReinitialize
                        initialValues={initialValues}
                        onSubmit={ valores => {
                            if (op === "save") {
                                fnGuardarProducto(valores);
                            } else {
                                fnActualizarProducto(valores);
                            }
                        }}
                    >

                    {props => {

                        const { nombre, stock, precio } = props.values;

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
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                                        Stock
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="stock"
                                        type="number"
                                        placeholder="Stock del producto"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={stock}
                                    />
                                </div>
                                {(props.touched.stock && props.errors.stock) && (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">{props.errors.stock}</p>
                                    </div>
                                )}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
                                        Precio
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="precio"
                                        type="number"
                                        placeholder="Precio del Producto"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={precio}
                                    />
                                </div>
                                {(props.touched.precio && props.errors.precio) && (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">{props.errors.precio}</p>
                                    </div>
                                )}

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

export default FormularioProducto
