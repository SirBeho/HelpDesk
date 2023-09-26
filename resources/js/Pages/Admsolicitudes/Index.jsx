import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from '@inertiajs/react';
import { Solicitud } from "@/Components/Solicitud";
import { format } from "date-fns";

export default function admsolicitudes({ auth, archivos }) {

    const solicitudes = auth.user.solicitudes;
    const [dato, setdato] = useState(null);
    const [open, setOpen] = useState(0);
    const [select, setSelet] = useState(0);
    const [datos_f, setDatos_f] = useState(solicitudes);
    const [archivos_f, setArchivos_f] = useState(null);

    function getSeleccion() {
        console.log("actuando");
        return  select;
    }

    const abrir = (solicitudId) => {
        if (open == solicitudId) {
            setOpen(0);
            setdato(null);
            setArchivos_f(null);
        } else {
            setOpen(solicitudId);
            const solicitudSeleccionada = solicitudes.find(
                (solicitud) => solicitud.id === solicitudId
            );
            if (solicitudSeleccionada) {
                setdato(solicitudSeleccionada);
              
            }

            const archivos_por_solicitud = archivos.filter(
                (archivo) => archivo.solicitud_id === solicitudId
            );
            if (archivos_por_solicitud) {
                setArchivos_f(archivos_por_solicitud);
                
            }

        }
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();

        const filtered = solicitudes.filter((item) => {
            const serializedItem = JSON.stringify(item).toLowerCase();
            console.log(serializedItem);
            return serializedItem.includes(term);
        });

        setDatos_f(filtered);
    };

    const put = (id) => {
        if (select == id) {
            setSelet(0)
        } else {
            setSelet(id)
        }
    };

    const handleDownload = (archivo) => {
        const id = archivo.id;
        const filename = archivo.nombre + '.' + archivo.extencion;

        axios
            .post('/download', { id }, { responseType: 'blob' })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => {
                console.error('Error al descargar el archivo:', error);
            });
    };



    return (
        <AuthenticatedLayout user={auth.user}
            solicitud_id={open}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Administración de solicitudes</h2>}
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
                        {dato ? (
                            <>
                                <table>
                                    <thead></thead>
                                    <tbody>
                                        <tr className="w-fit p-6">
                                            <td className="font-bold w-44 py-2">
                                                Número solicitud
                                            </td>
                                            <td>{dato.numero}</td>
                                        </tr>
                                        <tr className="w-fit">
                                            <td className="font-bold w-44 py-2">
                                                Fecha
                                            </td>
                                            <td>
                                                {format(
                                                    new Date(dato.created_at),
                                                    "dd/MM/yyyy hh:mm:ss a"
                                                )}
                                            </td>
                                        </tr>
                                        <tr className="w-fit">
                                            <td className="font-bold w-44 py-2">
                                                Tramite
                                            </td>
                                            <td>{dato.tipo.nombre}</td>
                                        </tr>
                                        <tr className="w-fit">
                                            <td className="font-bold w-44 py-2">
                                                Nombre empresa
                                            </td>
                                            <td>{dato.user.empresa}</td>
                                        </tr>
                                        <tr className="w-fit">
                                            <td className="font-bold w-44 py-2">
                                                RNC
                                            </td>
                                            <td>{dato.user.rnc}</td>
                                        </tr>
                                        <tr className="w-fit">
                                            <td className="font-bold w-44 py-2">
                                                Nombre solicitante
                                            </td>
                                            <td>{dato.user.name}</td>
                                        </tr>
                                        <tr className="w-fit">
                                            <td className="font-bold w-44 py-2">
                                                Télefono
                                            </td>
                                            <td>{dato.user.telefono}</td>
                                        </tr>
                                        <tr className="w-fit">
                                            <td className="font-bold w-44 py-2">
                                                Correo
                                            </td>
                                            <td>{dato.user.email}</td>
                                        </tr>
                                        <tr className="w-fit">
                                            <td className="font-bold w-44 py-2">
                                                Estatus
                                            </td>
                                            <td>{dato.status.nombre}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="flex flex-col w-full border h-92 p-4 gap-6 rounded-md">
                                    <h3 className="font-semibold">
                                        Descripcion
                                    </h3>
                                    <p>{dato.comentario}</p>
                                </div>

                                <div className="flex flex-col w-full border h-92 p-4 gap-6 rounded-md">
                                    <div className="flex justify-between w-full">
                                        <span className="font-semibold">Archivos</span>
                                        <label htmlFor="file" className="bg-upload px-2 py-1 rounded-lg font-semibold text-white"> Agregar + </label>
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-1">
                                        {archivos_f.map((archivo) =>
                                        (
                                            <div key={archivo.id} onClick={() => put(archivo.id)} className="text-center w-16 group relative cursor-pointer">
                                                <div className="w-16 relative">
                                                    <img className="w-full" src={`/assets/svg/${archivo.extencion}.svg`} alt="" onError={(e) => (e.target.src = "/assets/svg/file3.svg")} />

                                                    {select == archivo.id ? (
                                                        <img onClick={() => handleDownload(archivo)} src="/assets/svg/descargar.svg" alt="" className="z-20 top-10 left-14 w-8 absolute transform -translate-x-1/2 hover:scale-125 " />
                                                    ) : null}
                                                </div>
                                                <span className=" left-1/2 transform -translate-x-1/2  relative overflow-hidden text-ellipsis whitespace-nowrap rounded-md block w-16 group-hover:bg-gray-200 group-hover:px-1 group-hover:overflow-visible group-hover:w-fit group-hover:z-10">
                                                    {archivo.nombre}
                                                </span>
                                            </div>
                                        ))}


                                    </div>
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}
