import { Layouts }  from '../../components/Layouts';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { QUERY_OBTENER_PEDIDOS } from '../../gql/querys/pedidos';
import Pedido from './Pedido';

const Index = () => {

    const { data, loading } = useQuery(QUERY_OBTENER_PEDIDOS);

    if (loading) return '...Cargando';

    if (!data.obtenerPedidosVendedor) {
        router.push('/Login')
        return 'Cargando...';
    }

    const { obtenerPedidosVendedor } = data;

    return (
        <Layouts>
            <div className="p-5">
                <h1 className="text-2xl text-gray-800 font-light text-center">Pedidos</h1>

                <Link href="pedidos/formulario">
                    <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 font-bold">
                        Nuevo Pedido
                    </a>
                </Link>

                <table
                    className="table-auto shadow-md mt-10 w-full"
                >
                    <thead className="bg-gray-800">
                    <tr className="text-white">
                        <th className="w-3/12 py-1">Cliente</th>
                        <th className="w-1/12 py-1">Estado</th>
                        <th className="w-2/12 py-1">Opciones</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white">
                        {obtenerPedidosVendedor.map(pedido => (
                            <Pedido
                                key={ pedido.id }
                                pedido={ pedido }
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </Layouts>
    )
}

export default Index
