import React from 'react';
import { Link } from '@inertiajs/react';
const navItems = [

    {
        id: 1,
        icon: "/assets/svg/home.svg",
        title: "INICIO",
        route: route('home'),
        rol: [1,2,3]
    },

    {
        id: 2,
        icon: "/assets/svg/soli.svg",
        title: "Administración de solicitudes",
        route: route('admsolicitudes'),
        rol: [1,2,3]
      
    },

    {
        id: 3,
        icon: "/assets/svg/doc.svg",
        title: "Panel De Documentos",
        route:  route('panel'),
        rol: [1,2,3]
    },

    {
        id: 5,
        icon: "/assets/svg/file.svg",
        title: "SOLICITUDES",
        route: route('solicitudes'),
        rol: [2]
    },

    {
        id: 6,
        icon: "/assets/svg/user.svg",
        title: "USUARIOS",
        route:  route('usuarios.index') ,
        rol: [1]
 
    },

    {
        id: 7,
        icon: "/assets/svg/database2.svg",
        title: "REPORTES",
        route:  route('reportes'),

        rol: [1,3,4]
    },
    {
        id: 8,
        icon: "/assets/svg/board2.svg",
        title: "DASHBOARD",
        route:  route('dashboard'),
        rol: [1]

    },
    {
        id: 9,
        icon: "/assets/svg/tools.svg",
        title: "MANTENIMIENTO",
        route:  route('tipoSolicitud.index'),
        rol: [1]

    }
];

export default function SideNav({user}) {
    return (
        <nav className='flex min-h-full bg-darkgray lef-0 w-28 top-[60px] fixed'>

            <ul className='flex flex-col '>

                {navItems.map(item => (
                  item.rol.includes(user.rol_id) ?(
                    <li key={item.id} className='h-[12.5%]'>
                        <Link href={item.route} className='w-28 h-full flex flex-col items-center justify-center text-gray-200 hover:bg-nav cursor-pointer text-xs gap-2'>
                            <img src={item.icon} width={40} height={40} alt='prueba' />

                            <span className='fit text-center'>
                                {item.title}
                            </span>
                        </Link>
                    </li>
                   ) :(null)
                ))}

            </ul>
        </nav>
    )
}
