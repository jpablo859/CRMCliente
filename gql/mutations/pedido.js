import { gql } from '@apollo/client';

export const MUTATION_GUARDAR_PEDIDO = gql`
    mutation guardarPedido($input: PedidoInput) {
        guardarPedido(input: $input) {
            id
        }
    }
`;