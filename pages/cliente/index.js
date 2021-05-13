import { Layouts } from '../../components/Layouts'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ListadoClientes } from './listadoClientes'

const QUERY_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      empresa
      email
      telefono
    }
  }
`;

 const Index = () => {

  const { data, loading } = useQuery(QUERY_CLIENTES_USUARIO);

  const router = useRouter();

  if (loading){
    return 'Cargando...';
  } 

  if (!data) {
    router.push('/Login')
    return 'Cargando...';
  }

  return (
      <Layouts>

        <div className="p-5">
          <h1 className="text-2xl text-gray-800 font-light text-center">Clientes</h1>

          <Link href="/cliente/formulario">
            <a className="bg-blue-800 py-2 px-5 text-white rounded text-sm hover:bg-gray-800 font-bold">
              Nuevo Cliente
            </a>
          </Link>

          <table
            className="table-auto shadow-md mt-10 w-full"
          >
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="w-1/5 py-2">Nombre</th>
                <th className="w-1/5 py-2">Empresa</th>
                <th className="w-1/5 py-2">Email</th>
                <th className="w-1/5 py-2">Telefono</th>
                <th className="w-1/12 py-2">Opciones</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.obtenerClientesVendedor.map(cliente => (
                <ListadoClientes 
                  key={cliente.id}
                  cliente={cliente}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Layouts>
  )
}

export default Index;
