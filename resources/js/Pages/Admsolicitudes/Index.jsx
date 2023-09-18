import React from "react";
import { Fragment } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Notifications } from "@/Components/Notifications";
import { Head } from "@inertiajs/react";
export default function admsolicitudes({ auth }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Administración de solicitudes</h2>}
        >
            <Head title="Solicitudes" />



            <div className="w-[calc(100%-3rem)] h-[calc(100%-3rem)] bg-[#f2f2f2] m-6 rounded-md gap-10 p-10 grid grid-cols-2">

                <ul className="flex flex-col gap-4 overflow-hidden hover:overflow-y-scroll w-full h-full max-h-[740px]">

                    <Notifications />
                    <Notifications />
                    <Notifications />
                    <Notifications />
                    <Notifications />
                    <Notifications />

                </ul>

                <div className="flex flex-col gap-3 w-[520px] p-4 bg-white">

                    <table>
                        <thead>

                        </thead>
                        <tbody>
                            <tr className="w-fit p-6">
                                <td className="font-bold w-44 py-2">Número solicitud</td>
                                <td>22222</td>
                            </tr>
                            <tr className="w-fit">
                                <td className="font-bold w-44 py-2">Fecha</td>
                                <td>2023/08/03</td>
                            </tr>
                            <tr className="w-fit">
                                <td className="font-bold w-44 py-2">Servicios</td>
                                <td>Facturas</td>
                            </tr>
                            <tr className="w-fit">
                                <td className="font-bold w-44 py-2">Nombre empresa</td>
                                <td>Read mod</td>
                            </tr>
                            <tr className="w-fit">
                                <td className="font-bold w-44 py-2">RNC</td>
                                <td>1233527</td>
                            </tr>
                            <tr className="w-fit">
                                <td className="font-bold w-44 py-2">Nombre solicitante</td>
                                <td>Ramon Orlando</td>
                            </tr>
                            <tr className="w-fit">
                                <td className="font-bold w-44 py-2">Télefono</td>
                                <td>75572143</td>
                            </tr>
                            <tr className="w-fit">
                                <td className="font-bold w-44 py-2">Correo</td>
                                <td>rodrigo@email.com</td>
                            </tr>
                            <tr className="w-fit">
                                <td className="font-bold w-44 py-2">Estatus</td>
                                <td>en proceso</td>
                            </tr>
                        </tbody>
                    </table>



                    <div className="flex flex-col w-full border h-92 p-4 gap-6 rounded-md">

                        <h3 className="font-semibold">Comentarios</h3>

                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic autem laboriosam nobis alias accusantium incidunt explicabo, non voluptatem assumenda error blanditiis perferendis libero eius voluptate molestias expedita obcaecati maiores asperiores.
                        </p>
                    </div>

                </div>

            </div>


        </AuthenticatedLayout>
    )

}
