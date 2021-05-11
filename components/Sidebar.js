import React from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'

export const Sidebar = () => {

    const router = useRouter();

    return (
        <aside className="bg-gray-800 sm:w-1/5 xl:w-1/6 sm:min-h-screen p-5">
            <div>
                <p className="text-white text-2xl font-black text-center">CRM - Clientes</p>
            </div>

            <nav className="mt-5 list-none">
                <li className={router.pathname === "/cliente" ? "bg-blue-800 p-2 rounded" : "p-2"}>
                    <Link href="/cliente">
                        <a className="text-white mb-2 block">
                            Clientes
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/Pedidos" ? "bg-blue-800 p-2 rounded" : "p-2"}>
                    <Link href="/Pedidos">
                        <a className="text-white mb-2 block">
                            Pedidos
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/Productos" ? "bg-blue-800 p-2 rounded" : "p-2"}>
                    <Link href="/Productos">
                        <a className="text-white mb-2 block">
                            Productos
                        </a>
                    </Link>
                </li>
            </nav>
        </aside>
    )
}
