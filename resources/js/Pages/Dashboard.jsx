import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import dashimg from "/public/assets/dashImg.jpg";

export default function Dashboard({ auth  }) {
      
    return (
        <AuthenticatedLayout
            countNotificaciones={auth.countNotificaciones}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className=" grid grid-cols-2 text-[#767171]  mt-10 h-full">

                <div className="px-16">

                    <h1 className="text-6xl font-bold py-24">
                        Bienvenidos
                        <span className="bg-gradient-to-b from-[#14a3be] to-[#fcbe0a] text-transparent bg-clip-text">!</span>
                    </h1>

                    <p className="font-bold text-2xl w-80">
                        Descubre el máximo potencial de tu negocio con Tesoria!
                    </p>

                    <p className="font-medium text-lg w-96 py-6">
                        Siempre comprometidos con brindar la mejor experiencia
                    </p>

                </div>
                <div className="self-end py-4 opacity-80">
                    <img src={dashimg} alt="imagen del dashboard" className='w-3/4 h-full' />
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
