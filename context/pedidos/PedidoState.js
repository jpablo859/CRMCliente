import { useReducer } from 'react';
import PedidoContext from './PedidoContext';
import PedidoReducer from './PedidoReducer';

import { 
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTOS
} from '../../types';

const PedidoState = ({children}) => {

    const initialState = {
        cliente: {},
        productos: [],
        total: 0
    };

    const [ state, dispatch ] = useReducer(PedidoReducer, initialState);

    const seleccionarCliente = cliente => {
        dispatch({
            type: SELECCIONAR_CLIENTE,
            payload: cliente
        })
    }

    const seleccionarProducto = producto => {
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: producto
        })
    }

    return (
        <PedidoContext.Provider
            value={{
                productos: state.productos,
                seleccionarCliente,
                seleccionarProducto
            }}
        >
            {children}
        </PedidoContext.Provider>
    )
}

export default PedidoState;