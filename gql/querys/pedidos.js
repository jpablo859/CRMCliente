import { gql } from '@apollo/client';

export const QUERY_OBTENER_PEDIDOS = gql`
    query obtenerPedidosVendedor {
        obtenerPedidosVendedor {
            id
            pedido {
                id
                cantidad
                precio
            }
            total
            cliente {
                id
                nombre
                apellido
            }
            creado
            estado
        }
    }
`;