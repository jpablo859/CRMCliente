import React, { useEffect, useState } from 'react'
import { Layouts } from '../components/Layouts'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/router'

const MUTATION_LOGIN = gql`
    mutation autenticarUsuario($input: LoginInput) {
        autenticarUsuario(input: $input) {
            token
        }
    }
`;

const Login = () => {

    //login
    const [ autenticarUsuario ] = useMutation(MUTATION_LOGIN);

    const [ state, setState ] = useState({
        mensaje: null,
        boton: 'Iniciar Sesión',
        btnDisabled: false
    });

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('El Email no es válido').required('El Email es requerido'),
            password: Yup.string().required('El Password es obligatorio')
        }),
        onSubmit: async valores => {
            setState({
                ...state,
                boton: 'Autenticando...',
                btnDisabled: true
            });

            try {

                const { data } = await autenticarUsuario({
                    variables: {
                        input: valores
                    }
                })

                console.log('hola')

                const { token } = data.autenticarUsuario;
                localStorage.setItem('token', token);

                setTimeout(() => {
                    router.push('/');
                }, 2000)

            } catch (err) {
                setTimeout(() => {
                    setState({
                        ...state,
                        mensaje: err.message,
                    });
                }, 2000)
                
                setTimeout(() => {
                    setState({
                        boton: 'Iniciar Sesión',
                        mensaje: null,
                        btnDisabled: false
                    });
                }, 5000)
            }
        }
    });

    useEffect(() => {
        console.log(state)
    }, [state])


    const { email, password } = formik.values;

    return (
        <>
            <Layouts>

                {state.mensaje && (
                    <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                        <p>{state.mensaje}</p>
                    </div>
                )}
                <h1 className="text-center text-2xl text-white">
                    Login
                </h1>
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form 
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={formik.handleSubmit}
                        >
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Email"
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
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={password}
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
                                value={state.boton}
                                disabled={state.btnDisabled}
                            />
                        </form>
                    </div>
                </div>
            </Layouts>
        </>
    )
}

export default Login
