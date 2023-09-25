import React from 'react';
import { Link } from '@inertiajs/react';
const navItems = [

    {
        id: 1,
        icon: "/assets/svg/home.svg",
        title: "INICIO",
        route: route('dashboard')
    },

    {
        id: 2,
        icon: "/assets/svg/board.svg",
        title: "Administración de solicitudes",
        route: route('admsolicitudes')
    },

    {
        id: 3,
        icon: "/assets/svg/doc.svg",
        title: "Panel De Documentos",
        route:  route('panel')
    },

    {
        id: 5,
        icon: "/assets/svg/file.svg",
        title: "SOLICITUDES",
        route: route('solicitudes')
    },

    {
        id: 6,
        icon: "/assets/svg/user.svg",
        title: "USUARIOS",
        route:  route('usuarios.index')
    },

    {
        id: 7,
        icon: "/assets/svg/database.svg",
        title: "REPORTES",
        route:  route('reportes')
    }
];

export default function SideNav() {
    return (
        <nav className='flex min-h-full bg-darkgray lef-0 w-28 top-[60px] fixed'>

            <ul className='flex flex-col '>

                {navItems.map(item => (

                    <li key={item.id} >
                        <Link href={item.route} className='w-28 h-24 flex flex-col items-center justify-center text-gray-200 hover:bg-nav cursor-pointer text-xs gap-2'>
                            <img src={item.icon} width={40} height={40} alt='prueba' />

                            <span className='fit text-center'>
                                {item.title}
                            </span>
                        </Link>
                    </li>
                ))}

            </ul>
        </nav>
    )
}
