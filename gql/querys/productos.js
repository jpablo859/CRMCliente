import { gql } from '@apollo/client';

export const QUERY_PRODUCTOS = gql`
    query obtenerProductos {
        obtenerProductos {
            id
            nombre
            stock
            precio
        }
    } 
`;