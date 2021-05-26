import { useMutation } from '@apollo/client';
import { useContext } from 'react';
import { Layouts }  from '../../components/Layouts';
import PedidoContext from '../../context/pedidos/PedidoContext';
import { MUTATION_GUARDAR_PEDIDO } from '../../gql/mutations/pedido';
import AsignarCliente from './AsignarCliente'
import AsignarProductos from './AsignarProductos';
import ResumenPedido from './ResumenPedido';
import TotalPedido from './TotalPedido';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

const Formulario = () => {

    const router = useRouter();

    const { cliente, productos, total } = useContext(PedidoContext);

    const [ guardarPedido ] = useMutation(MUTATION_GUARDAR_PEDIDO);

    const validarPedido = () => {
        return ! productos.every( producto => producto.cantidad > 0 ) || total === 0 || cliente.length === 0 ? "opacity-50 cursor-not-allowed" : "";
    }

    const fnGuardarPedido = async () => {

        const pedido = productos.map( ({__typename, nombre, stock, ...producto}) => producto);

        try {
            const { data } = await guardarPedido({
                variables: {
                    input: {
                        cliente: cliente.id,
                        total,
                        pedido
                    }
                }
            });

            Swal.fire(
                'Bien!',
                'El pedido ha sido registrado éxitosamente',
                'success'
            )

            router.push('pedidos/');

        } catch (err) {
            Swal.fire(
                'Información!',
                err.message,
                'info'
            )
        }
        }

    return (
        <Layouts>
            <div className="p-5">
                <h1 className="text-gray-800 text-2xl font-light text-center">Nuevo Pedido</h1>

                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg">
                        <AsignarCliente/>
                        <AsignarProductos/>
                        <ResumenPedido/>
                        <TotalPedido/>

                        <button 
                            type="button"
                            className={ `bg-gray-800 w-full mt-5 p-2 text-white font-bold hover:bg-gray-900 ${ validarPedido() }` }
                            onClick={ () => fnGuardarPedido() }
                        >
                            Registrar Pedido
                        </button>
                    </div>
                </div>

            </div>
        </Layouts>
    )
}

export default Formulario;