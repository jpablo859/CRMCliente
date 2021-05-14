import { Layouts }  from '../../components/Layouts';
import AsignarCliente from './AsignarCliente'
import AsignarProductos from './AsignarProductos';
import ResumenPedido from './ResumenPedido';
import TotalPedido from './TotalPedido';

const Formulario = () => {

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
                            className={ `bg-gray-800 w-full mt-5 p-2 text-white font-bold hover:bg-gray-900` }
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