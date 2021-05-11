import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router'

const QUERY_USUARIO = gql`
    query obtenerUsuario {
        obtenerUsuario {
            id
            nombre
            apellido
        }
    }
`;

export const Header = () => {

    const { data, loading, refetch } = useQuery(QUERY_USUARIO);
    const router = useRouter();

    if (loading) {
        refetch();
        return null;
    }

    if (!data.obtenerUsuario) {
        return router.push('/Login');
    }

    const { nombre, apellido } = data.obtenerUsuario;

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        router.push('/Login');
    }

    return (
        
        <nav className="flex justify-end bg-gray-800 p-3">
            {data && (
                <>
                    <p className="text-white p-1">{ nombre } { apellido }</p>
                    <button 
                        onClick={() => cerrarSesion()}
                        className="bg-white rounded ml-2 p-1"
                    >
                        Cerrar Sesión
                    </button>
                </>
            )}
        </nav>
    )
}
