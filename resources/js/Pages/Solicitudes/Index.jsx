import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import React from "react";

export default function Solicitudes({ auth, datos, msj }) {
    const [solicitudes, setSolicitudes] = useState(datos);

    const [show, setShow] = useState(msj != null);

    useEffect(() => {

        setShow(msj != null);
    }, [msj]);

    const [esTipo, setEsTipo] = useState(0);
    const { data, setData, post, processing, errors, reset } = useForm({
        tipo_id: "",
        comentario: "",
    });

    const filtrarPorTipo = (tipo) => {
        if (esTipo == tipo) {
            setEsTipo(0);
            setSolicitudes(datos);
        } else {
            setEsTipo(tipo);
            const solicitudesFiltradas = datos.filter(
                (item) => item.tipo === tipo
            );
            setSolicitudes(solicitudesFiltradas);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("solicitud.create"));
    };

    const rediret = () => {
        window.location.reload();

    };


    return (
        <AuthenticatedLayout
            countNotificaciones={auth.countNotificaciones}
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Solicitudes
                </h2>
            }
        >
            <Head title="Solicitudes" />

            <Modal show={show} maxWidth="sm" onClose={rediret}>
                <img
                    className="z-50 w-20 absolute left-1/2 transform -translate-x-1/2 -top-10 bg-white rounded-full p-2  "
                    src="/assets/svg/check.svg"
                    alt=""
                />

                <div className="text-center relative mb-2 ">
                    <h1 className="mt-14 mb-8 font-semibold">{msj}</h1>

                    <div className="hover:scale-110">
                        <Link href={route("admsolicitudes", { id: 1 })} className="bg-green-600 rounded-lg px-3 py-1     text-lg font-bold text-white  " >
                            Ver
                        </Link>

                    </div>

                </div>
            </Modal>

            <div className="w-[calc(100%-3rem)] h-[calc(100%-3rem)] bg-[#f2f2f2] m-6 rounded-md flex flex-col gap-10 py-4">
                <ul className="flex gap-10 p-6 w-fit mx-auto">
                    <li
                        onClick={() => filtrarPorTipo(1)}
                        className={`cursor-pointer flex flex-col p-3 w-52 border-2 bg-blue-500 ${esTipo == 1 ? "border-black" : ""
                            } rounded-md text-white font-semibold text-lg `}
                    >
                        <img
                            src="/assets/svg/export.svg"
                            width={40}
                            height={40}
                            alt="Servicios"
                            className="dark:invert"
                        />
                        Servicios
                    </li>

                    <li
                        onClick={() => filtrarPorTipo(2)}
                        className={` cursor-pointer flex flex-col p-3 w-52 border-2 bg-yellow-500 ${esTipo == 2 ? "border-black" : ""
                            } rounded-md text-white font-semibold text-lg `}
                    >
                        <img
                            src="/assets/svg/document.svg"
                            width={40}
                            height={40}
                            alt="icon documento"
                            className="dark:invert"
                        />
                        Certificaciones
                    </li>

                    <li
                        onClick={() => filtrarPorTipo(3)}
                        className={`cursor-pointer flex flex-col p-3 w-52 border-2 bg-cyan-500 ${esTipo == 3 ? "border-black" : ""
                            } rounded-md text-white font-semibold text-lg filter`}
                    >
                        <img
                            src="/assets/svg/board.svg"
                            width={40}
                            height={40}
                            alt="Icon board"
                            className="pr"
                        />
                        Estados Financieros
                    </li>

                    <li
                        onClick={() => filtrarPorTipo(4)}
                        className={`cursor-pointer flex flex-col p-3 w-52 border-2 bg-blue-800 ${esTipo == 4 ? "border-black" : ""
                            } rounded-md text-white font-semibold text-lg`}
                    >
                        <img
                            src="/assets/svg/database.svg"
                            width={40}
                            height={40}
                            alt="icon database"
                            className="pr"
                        />
                        Reportes Generales
                    </li>
                </ul>

                <form
                    onSubmit={submit}
                    className="flex flex-col w-2/5 mx-auto gap-4 text-textgray"
                >
                    <select
                        required
                        value={data.tipo_id}
                        onChange={(e) => setData("tipo_id", e.target.value)}
                        name="tipo_id"
                        id="tipo_id"
                        className="w-96 p-3 bg-white rounded-md outline-none"
                    >
                        <option defaultValue={""}>Seleccione servicio</option>
                        {solicitudes.map((solicitud) => (
                            <option key={solicitud.id} value={solicitud.id}>
                                {solicitud.nombre}
                            </option>
                        ))}
                    </select>

                    <div className="flex flex-col">
                        <label htmlFor="comentario">Comentarios</label>

                        <textarea
                            placeholder="Escribe tu comentario"
                            name="comentario"
                            id="comentario"
                            value={data.comentario}
                            onChange={(e) =>
                                setData("comentario", e.target.value)
                            }
                            className="w-full resize-none h-44 p-3 outline-none "
                        ></textarea>
                    </div>

                    <button className="border py-1 w-36 rounded-xl bg-gray-300 hover:bg-gray-200 text-textgray self-end justify-end mr-5 mt-5">
                        Enviar solicitud
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
