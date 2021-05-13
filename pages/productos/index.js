import { Layouts } from '../../components/Layouts'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ListadoProductos } from './listadoProductos';

const QUERY_PRODUCTOS = gql`
    query obtenerProductos {
        obtenerProductos {
            id
            nombre
            stock
            precio
        }
    } 
`;

const Index = () => {

    const router = useRouter();

    const { data, loading, error } = useQuery(QUERY_PRODUCTOS);

    if (loading) return "Cargando...";

    return (
        <Layouts>

            <div className="p-5">
            <h1 className="text-2xl text-gray-800 font-light text-center">Productos</h1>

            <Link href="/productos/formulario">
                <a className="bg-blue-800 py-2 px-5 text-white rounded text-sm hover:bg-gray-800 font-bold">
                Nuevo Producto
                </a>
            </Link>

            <table
                className="table-auto shadow-md mt-10 w-full"
            >
                <thead className="bg-gray-800">
                <tr className="text-white">
                    <th className="w-1/5 py-2">Nombre</th>
                    <th className="w-1/5 py-2">Stock</th>
                    <th className="w-1/5 py-2">Precio</th>
                    <th className="w-1/12 py-2">Opciones</th>
                </tr>
                </thead>
                <tbody className="bg-white">
                {data.obtenerProductos.map(producto => (
                    <ListadoProductos 
                        key={producto.id}
                        producto={producto}
                    />
                ))}
                </tbody>
            </table>
            </div>
        </Layouts>
  
    )
}

export default Index
