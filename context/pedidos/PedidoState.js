import { useReducer } from 'react';
import PedidoContext from './PedidoContext';
import PedidoReducer from './PedidoReducer';

import { 
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTOS,
    ACTUALIZAR_TOTAL
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

    const seleccionarProducto = productos => {

        let nuevoState;

        if (state.productos.length > 0) {
            nuevoState = productos.map( producto => {
                const nuevoObjeto = state.productos.find(({ id }) => id === producto.id );

                return {
                    ...producto,
                    ...nuevoObjeto
                }
            } )
        } else {
            nuevoState = productos;
        }

        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: nuevoState
        })
    }

    const cantidadProducto = nuevoProducto => {
        dispatch({
            type: CANTIDAD_PRODUCTOS,
            payload: nuevoProducto
        })
    }

    const actualizarTotal = () => {
        dispatch({
            type: ACTUALIZAR_TOTAL
        })
    }

    return (
        <PedidoContext.Provider
            value={{
                cliente: state.cliente,
                productos: state.productos,
                total: state.total,
                seleccionarCliente,
                seleccionarProducto,
                cantidadProducto,
                actualizarTotal
            }}
        >
            {children}
        </PedidoContext.Provider>
    )
}

export default PedidoState;