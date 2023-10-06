import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from "@inertiajs/react";
export default function Notificaciones({ auth }) {

    return (
        <AuthenticatedLayout
            countNotificaciones={auth.countNotificaciones}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Panel de documentos</h2>}
        >
            <Head title="Panel" />

            <div className="w-[calc(100%-3rem)] h-[calc(100%-3rem)] bg-[#f2f2f2] m-6 rounded-md  grid grid-cols-2 gap-2">

                <div className="h-full">
                    <h3 className="w-full bg-[#1ec0e6] p-2 font-bold text-white rounded-t-md text-xl">Upload</h3>

                    <div className="flex flex-col h-5/6 overflow-hidden hover:overflow-y-scroll">


                        <table className="w-full text-left text-textgray">
                            <thead>
                                <tr className="border-2 text-xs h-8">

                                    <th className="p-2">
                                        Descripción
                                    </th>

                                    <th className="w-1/5 text-center">
                                        Confidencial
                                    </th>

                                </tr>
                            </thead>
                            <tbody className="h-3/4">
                                <tr>

                                    <td className="p-2 h-10">
                                        FactraCompraAbril749
                                    </td>

                                    <td className="flex justify-center items-center h-10">

                                        <input type="checkbox" name="" id="" />

                                    </td>

                                </tr>
                            </tbody>

                        </table>

                    </div>

                    <div className="flex items-center w-full justify-center gap-4  ">

                        <input type="text" name="" id="" className="h-8 px-3" placeholder="Ingresa Referencia" />

                        <div className="flex flex-col gap-2">

                            <button className="border py-1 w-32 rounded-xl bg-gray-300 hover:bg-gray-200 text-textgray">
                                Enviar archivo
                            </button>

                            <button className="border py-1 w-32 rounded-xl bg-gray-300 hover:bg-gray-200 text-textgray">
                                Borrar
                            </button>
                        </div>
                    </div>


                </div>


                <div className="h-full flex flex-col">

                    <h3 className="w-full bg-blue-500 p-2 font-bold text-white rounded-t-md text-xl">Download</h3>

                    <div className="flex flex-col h-5/6 overflow-hidden hover:overflow-y-scroll">
                        <table className="w-full text-left text-textgray">
                            <thead>
                                <tr className="border-2 text-xs h-8 text-left">

                                    <th className="p-2">
                                        Tipo
                                    </th>
                                    <th className="p-2">
                                        Descripción
                                    </th>
                                    <th className="p-2">
                                        Fecha
                                    </th>

                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td className="p-2">
                                        FactraCompraAbril749
                                    </td>

                                    <td className="p-2">
                                        FactraCompraAbril749
                                    </td>
                                    <td className="p-2">
                                        FactraCompraAbril749
                                    </td>

                                </tr>

                            </tbody>



                        </table>
                    </div>

                    <button className="border py-1 w-36 rounded-xl bg-gray-300 hover:bg-gray-200 text-textgray self-end justify-end mr-5 mt-5">
                        Descargar Todo
                    </button>

                </div>

            </div>
        </AuthenticatedLayout>
    )

}
