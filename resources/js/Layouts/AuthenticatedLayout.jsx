import React, { useEffect, useState } from "react";
import NavBar from '@/Components/NavBar';
import SideNav from '@/Components/SideNav';


export default function Authenticated({ user, header, children ,solicitud_id,countNotificaciones}) {
    // const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);


    return (
        <div className="min-h-screen bg-white">


            <NavBar user={user} solicitud_id={solicitud_id} countNotificaciones={countNotificaciones} />

            <SideNav user={user} />


            <div className='absolute w-[calc(100%-7rem)] right-0 min-h-[calc(100vh-61px)] top-[61px]'>
                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )}

                <main>{children}</main>
            </div>

        </div>
    );
}
