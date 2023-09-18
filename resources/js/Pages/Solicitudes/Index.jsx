 
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from "@inertiajs/react";

export default function Solicitudes({auth}) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Solicitudes</h2>}
        >
            <Head title="Solicitudes" /> 

            <div className="w-[calc(100%-3rem)] h-[calc(100%-3rem)] bg-[#f2f2f2] m-6 rounded-md flex flex-col gap-10 py-4">

                <ul className="flex gap-10 p-6 w-fit mx-auto">

                    <li className="flex flex-col p-3 w-52 bg-blue-500 rounded-md text-white font-semibold text-lg ">
                        <img src="/assets/svg/export.svg" width={40} height={40} alt="Servicios" className="dark:invert" />
                        Servicios
                    </li>

                    <li className="flex flex-col p-3 w-52 bg-yellow-500 rounded-md text-white font-semibold text-lg ">

                        <img src="/assets/svg/document.svg" width={40} height={40} alt="icon documento" className="dark:invert" />
                        Certificaciones
                    </li>

                    <li className="flex flex-col p-3 w-52 bg-cyan-500 rounded-md text-white font-semibold text-lg filter">
                        <img src="/assets/svg/board.svg" width={40} height={40} alt="Icon board" className="pr" />
                        Estados Financieros
                    </li>

                    <li className="flex flex-col p-3 w-52 bg-blue-800 rounded-md text-white font-semibold text-lg">
                        <img src="/assets/svg/database.svg" width={40} height={40} alt="icon database" className="pr" />
                        Reportes Generales
                    </li>

                </ul>

                <form className="flex flex-col w-2/5 mx-auto gap-4 text-textgray">

                    <select name="services" id="services" className="w-96 p-3 bg-white rounded-md outline-none">
                        <option defaultValue={""}>
                            Seleccione servicio
                        </option>
                    </select>

                    <div className="flex flex-col">

                        <label htmlFor="coment">Comentarios</label>

                        <textarea placeholder="Escribe tu comentario" name="coment" id="coment" className="w-full resize-none h-44 p-3 outline-none "></textarea>
                    </div>


                    <button className="border py-1 w-36 rounded-xl bg-gray-300 hover:bg-gray-200 text-textgray self-end justify-end mr-5 mt-5">
                        Enviar solicitud
                    </button>
                </form>

            </div>
        </AuthenticatedLayout>

    )

}
