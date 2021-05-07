import React from 'react'
import Head from 'next/head'
import {Sidebar} from '../components/Sidebar';
import {useRouter} from 'next/router'


import 'normalize.css'
import 'tailwindcss/tailwind.css'


export const Layouts = ({children}) => {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>CRM - Administración de clientes</title>
            </Head>

            {router.pathname === "/Login" || router.pathname === "/NuevaCuenta"? (
                <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
                    {children}
                </div>
            ) : (
                <div className="bg-gray-200 min-h-screen">
                    <div className="flex min-h-screen">
                        <Sidebar/>
                        <main className="sm:w-2/3 xl:w-5/6 sm:min-h-screen p-5">
                            {children}
                        </main>
                    </div>
                </div>
            )}

        </>
    )
}
