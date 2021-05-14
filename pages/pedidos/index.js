import { Layouts }  from '../../components/Layouts';
import Link from 'next/link';

const Index = () => {
    return (
        <Layouts>
            <div className="p-5">
                <h1 className="text-2xl text-gray-800 font-light text-center">Pedidos</h1>

                <Link href="pedidos/formulario">
                    <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 font-bold">
                        Nuevo Pedido
                    </a>
                </Link>
            </div>
        </Layouts>
    )
}

export default Index
