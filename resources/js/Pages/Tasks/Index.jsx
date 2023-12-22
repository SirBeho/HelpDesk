import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import React from "react";

export default function Tasks({ auth, tipos, prioridades, msj }) {

   
    const [show, setShow] = useState(msj != null);
    useEffect(() => {
        console.log(msj)
        setShow(msj?.success != undefined);

    }, [msj]);


    const { data, setData, post, processing, errors, reset } = useForm({
        name_tarea: '',
        descripcion_detallada: '',
        priority: '',
        task_type_id: '',
    });



    const submit = (e) => {
        e.preventDefault();

        post(route("Task.create"));

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
                    Tasks
                </h2>
            }
        >
            <Head title="Tasks" />

            <Modal show={show} maxWidth="sm" onClose={rediret}>
                <img
                    className="z-50 w-20 absolute left-1/2 transform -translate-x-1/2 -top-10 bg-white rounded-full p-2  "
                    src="/assets/svg/check.svg"
                    alt=""
                />

                <div className="text-center relative mb-2 ">
                    <h1 className="mt-14 mb-8 font-semibold">{msj?.success || msj?.error}</h1>
                    {msj?.success && (
                        <div className="hover:scale-110">
                            <Link href={route("AdmTasks", { id: msj.id })} className="bg-green-600 rounded-lg px-3 py-1     text-lg font-bold text-white  " >
                                Ver
                            </Link>
                        </div>)}


                </div>
            </Modal>
            <div className=" pb-1  ">
                <div className="w-[calc(100%-3rem)] h-[calc(100%-3rem)] bg-[#f2f2f2] m-6 rounded-md flex flex-col gap-10 py-4">
               
               
               
              

                    <form
                        onSubmit={submit}
                        className="flex flex-col mx-24 w-[60rem]  gap-4 text-textgray"
                    >
                        <label className="flex items-center gap-3">
                            <span className="text-xl w-60">Cliente</span>
                            <input
                                required
                                value={data.name_tarea}
                                onChange={(e) => setData("name_tarea", e.target.value)}
                                name="name_tarea"
                                id="name_tarea"
                                className="p-3 w-full bg-white rounded-md outline-none"
                            />
                        </label>

                        <div className="flex gap-8 w-full ">
                        <label className="flex items-center gap-3">
                            <div >
                            <span className=" flex  text-xl w-[190px] ">Seleccione servicio</span>

                            </div>
                            <select
                                required
                                value={data.task_type_id}
                                onChange={(e) => setData("task_type_id", e.target.value)}
                                name="task_type_id"
                                id="task_type_id"
                                className="p-3 w-[22rem] bg-white rounded-md outline-none"
                            >
                                <option defaultValue={""}>Ningun sercicio seleccionado</option>
                                {tipos.map((Task) => (
                                    <option key={Task.id} value={Task.id}>
                                        {Task.name}
                                    </option>
                                ))}
                            </select>
                        </label>

                           
                            <label className="flex items-center gap-3">
                            <span className="text-xl w-20">Prioridad</span>
                            <select
                                required
                                value={data.priority}
                                onChange={(e) => setData("priority", e.target.value)}
                                name="priority"
                                id="priority"
                                className="p-3 w-full bg-white rounded-md outline-none"
                            >
                                <option defaultValue={""}>Ninguna prioridad seleccionado</option>
                                {prioridades.map((Task) => (
                                    <option key={Task.id} value={Task.id}>
                                        {Task.id}-{Task.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        </div>

                       

                        <label htmlFor="descripcion" className="flex items-center gap-3 text-xl" >
                            <span className="text-xl w-60">Detalles:</span>
                            <textarea
                                
                                placeholder="Escribe una descripcion (Opcional)"
                                name="descripcion"
                                id="descripcion"
                                value={data.descripcion}
                                onChange={(e) =>
                                    setData("descripcion", e.target.value)
                                }
                                className="w-full resize-none h-20 p-3 outline-none mt-2 rounded-md"
                            ></textarea>

                        </label>

                        <div className="text-red-500">
                            {msj?.error ?? (<div >{msj?.error}</div>)}

                        </div>

                        <button className="border py-1 w-36 rounded-xl bg-gray-300 hover:bg-gray-200 text-textgray self-end justify-end mr-5 mt-5">
                            Asignar Tarea
                        </button>
                    </form> 
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
