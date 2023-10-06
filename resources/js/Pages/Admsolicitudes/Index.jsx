import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Solicitud } from "@/Components/Solicitud";
import { format } from "date-fns";
export default function admsolicitudes({ auth, datos }) {

    const [data, setData] = useState(null);
    const [open, setOpen] = useState(0);
    const [datos_f, setDatos_f] = useState(datos);

    const abrir = (solicitudId) => {
        if (open == solicitudId) {
            setOpen(0);
            setData(null);
        } else {
            setOpen(solicitudId);
            const solicitudSeleccionada = datos.find(
                (solicitud) => solicitud.id === solicitudId
            );
            if (solicitudSeleccionada) {
                setData(solicitudSeleccionada);
                console.log(solicitudSeleccionada);
            }
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();

        const filtered = datos.filter((item) => {
            const serializedItem = JSON.stringify(item).toLowerCase();
            console.log(serializedItem)
            return serializedItem.includes(term);
        });

        setDatos_f(filtered);
    };


    // useEffect(() => {
    //     if (id) {
    //         abrir(id);
    //         changeStatus(n_id);
    //     }
    // }, [])



    return (
        <AuthenticatedLayout
            countNotificaciones={auth.countNotificaciones}
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Administración de solicitudes
                </h2>
            }
        >
            <Head title="Solicitudes" />

            <div className="w-[calc(100%-3rem)] h-[calc(100%-3rem)] bg-[#f2f2f2]  m-6 rounded-md gap-10 p-10 pt-4">
                <label className=" flex items-center border-2 border-black w-80 h-9 text-sm bg-white rounded-lg overflow-hidden p-2 font-medium mb-5">
                    Buscar
                    <input onChange={handleSearch} className="border-none h-full w-full outline-none focus:ring-0" />
                </label>

                <div className="grid grid-cols-2">

                    <ul className="flex flex-col gap-4 overflow-hidden hover:overflow-y-scroll w-full h-full max-h-[740px]">
                        {datos_f.map((solicitud) => (
                            <Solicitud
                                key={solicitud.id}
                                data={solicitud}
                                click={() => abrir(solicitud.id)}
                                open={open}
                            />
                        ))}
                    </ul>

                    <div className="flex flex-col gap-3 w-[520px] p-4 bg-white">
                        {data ? (
                            <>
                                <table>
                                    <thead></thead>
                                    <tbody>
                                        <tr className="w-fit p-6">
                                            <td className="font-bold w-44 py-2">
                                                Número solicitud
                                            </td>
                                            <td>{data.numero}</td>
                                        </tr>
                                        <tr className="w-fit">
                                            <td className="font-bold w-44 py-2">
                                                Fecha
                                            </td>
                                            <td>
                                                {format(
                                                    new Date(data.created_at),
                                                    "dd/MM/yyyy hh:mm:ss a"
                                                )}
                                            </td>
                                        </tr>
                                        <tr className="w-fit">
                                            <td className="font-bold w-44 py-2">
                                                Tramite
                                            </td>
                                            <td>{data.tipo.nombre}</td>
                                        </tr>
                                        <tr className="w-fit">
                                            <td className="font-bold w-44 py-2">
                                                Nombre empresa
                                            </td>
                                            <td>{data.user.empresa}</td>
                                        </tr>
                                        <tr className="w-fit">
                                            <td className="font-bold w-44 py-2">
                                                RNC
                                            </td>
                                            <td>{data.user.rnc}</td>
                                        </tr>
                                        <tr className="w-fit">
                                            <td className="font-bold w-44 py-2">
                                                Nombre solicitante
                                            </td>
                                            <td>{data.user.name}</td>
                                        </tr>
                                        <tr className="w-fit">
                                            <td className="font-bold w-44 py-2">
                                                Télefono
                                            </td>
                                            <td>{data.user.telefono}</td>
                                        </tr>
                                        <tr className="w-fit">
                                            <td className="font-bold w-44 py-2">
                                                Correo
                                            </td>
                                            <td>{data.user.email}</td>
                                        </tr>
                                        <tr className="w-fit">
                                            <td className="font-bold w-44 py-2">
                                                Estatus
                                            </td>
                                            <td>{data.status.nombre}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="flex flex-col w-full border h-92 p-4 gap-6 rounded-md">
                                    <h3 className="font-semibold">Descripcion</h3>

                                    <p>{data.comentario}</p>
                                </div>

                                <div className="flex flex-col w-full border h-92 p-4 gap-6 rounded-md">
                                    <h3 className="font-semibold">Archivos</h3>

                                    <p>{data.comentario}</p>
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
