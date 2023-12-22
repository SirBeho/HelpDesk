import React from 'react';
import { Link } from '@inertiajs/react';
const navItems = [

    {
        id: 1,
        icon: "/assets/svg/home.svg",
        title: "HOME",
        route: route('home'),
        rol: [1,2,3]
    },

    {
        id: 2,
        icon: "/assets/svg/soli.svg",
        title: "TASK ADMIN",
        route: route('AdmTasks'),
        rol: [1,2,3]
      
    },
    {
        id: 3,
        icon: "/assets/svg/user.svg",
        title: "USER",
        route:  route('usuarios.index') ,
        rol: [1]
 
    },




    
    {
        id: 5,
        icon: "/assets/svg/file.svg",
        title: "TASK",
        route: route('Tasks'),
        rol:  [1,2,3]
    },

    
/* 
    {
        id: 4,
        icon: "/assets/svg/doc.svg",
        title: "Panel De Documentos",
        route:  route('panel'),
        rol: [1,2,3]
    },

   
    

    {
        id: 7,
        icon: "/assets/svg/database2.svg",
        title: "REPORTES",
        route:  route('reportes'),

        rol:  [1,2,3]
    },
    {
        id: 8,
        icon: "/assets/svg/board2.svg",
        title: "DASHBOARD",
        route:  route('dashboard'),
        rol:  [1,2,3]

    }, */
    {
        id: 9,
        icon: "/assets/svg/tools.svg",
        title: "CONFIG",
        route:  route('empresa.index'),
        rol:  [1,2,3]

    }
];

export default function SideNav({user}) {

    return (
        <nav className='flex min-h-full bg-indigo-800 lef-0 w-30 top-[60px] fixed'>

            <ul className='flex flex-col items-center '>

                {navItems.map(item => (
                  item.rol.includes(user.rol_id) ?(
                    <li key={item.id} className={` ${user.rol_id == 1 ? ' h-[15vh]' : ' h-[13vh]'}  `}>
                        <Link href={item.route} className='w-28 h-full flex flex-col items-center justify-center text-gray-200 hover:bg-nav cursor-pointer text-xs gap-2'>
                            <img src={item.icon} className='w-[6vh] h-[6vh]'   alt='icon' />

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
