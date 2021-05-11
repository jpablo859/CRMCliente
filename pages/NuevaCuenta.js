import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Layouts } from '../components/Layouts'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { useMutation, gql } from '@apollo/client'

const MUTATION_GUARDAR_USUARIO = gql`
    mutation guardarUsuario($input: UsuarioInput) {
        guardarUsuario(input: $input) {
            id
        }
    } 
`;

const NuevaCuenta = () => {

    //state para el mensaje 
    const [mensaje, setMensaje] = useState(null);

    const [ guardarUsuario ] = useMutation(MUTATION_GUARDAR_USUARIO);

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El Nombre es obligatorio'),
            apellido: Yup.string().required('El Apellido es obligatorio'),
            email: Yup.string().email('El Email no es válido').required('El Email es obligatorio'),
            password: Yup.string().required('El password debe contener mínimo 5 caracteres').min(5)
        }),
        onSubmit: async valores => {
            try {
                const { data } = await guardarUsuario({
                    variables: {
                        input: valores
                    }
                });

                setMensaje('El usuario ha sido creado exitosamente!');

                setTimeout(() => {
                    router.push('/Login');
                }, 3000)

            } catch (err) {
                console.log(err)
                setMensaje(err.message)

                setTimeout(() => {
                    setMensaje(null);
                }, 3000)
            }
        }
    })

    const { nombre, apellido, email, password } = formik.values;

    return (
        <>
            <Layouts>

                {mensaje && (
                    <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                        <p>{mensaje}</p>
                    </div>
                )}

                <h1 className="text-center text-2xl text-white">
                    Nueva Cuenta
                </h1>
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form 
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={formik.handleSubmit}    
                        >
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                    Nombre
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="nombre"
                                    type="nombre"
                                    placeholder="Nombre"
                                    value={nombre}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
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
                                    type="apellido"
                                    placeholder="Apellido"
                                    value={apellido}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {(formik.touched.apellido && formik.errors.apellido) && (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">{formik.errors.apellido}</p>
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
                                    placeholder="Email"
                                    value={email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {(formik.touched.email && formik.errors.email) && (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">{formik.errors.email}</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {(formik.touched.password && formik.errors.password) && (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">{formik.errors.password}</p>
                                </div>
                            )}
                            <input 
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-900 focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50 rounded"
                                value="Crear Cuenta"
                            />
                        </form>
                    </div>
                </div>
            </Layouts>
        </>
    )
}

export default NuevaCuenta
