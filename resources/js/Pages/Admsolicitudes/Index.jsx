import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Solicitud } from "@/Components/Solicitud";
import { format } from "date-fns";
import Modal from "@/Components/Modal";

export default function admsolicitudes({ auth, tipoSolicitudes, msj }) {

    console.log(auth.user)
    console.log(msj)
    //const solicitudes = auth.user.solicitudes;
    const solicitudes = auth.user.solicitudes.filter(solicitud => solicitud.tipo_id > 2);
   
    const [errorMessage, setErrorMessage] = useState('');
    const [dato, setdato] = useState(null);
    const [open, setOpen] = useState(0);
    const [select, setSelet] = useState(0);
    const [datos_f, setDatos_f] = useState(solicitudes);
   
    const [edit, setEdit] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        console.log(dato);
        console.log(datos_f);
        console.log(data);
        setOpen(0);
        setdato(null);
        setData(null);
      
        setShow(msj != null);
    }, [msj]);

    const abrir = (solicitudId) => {
        if (open == solicitudId) {
            setOpen(0);
            setdato(null);
            
        } else {
            setOpen(solicitudId);
            const solicitudSeleccionada = solicitudes.find(
                (solicitud) => solicitud.id === solicitudId
            );
           
            setdato(solicitudSeleccionada);
            setData(solicitudSeleccionada);
        
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();

        const filtered = solicitudes.filter((item) => {
            const serializedItem = JSON.stringify(item).toLowerCase();
           
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

    const submit = (e) => {
        e.preventDefault();
        post(route("solicitud.update"));
    };

     return (
        <AuthenticatedLayout user={auth.user}
              countNotificaciones={auth.countNotificaciones}
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
                                {(data.status_id == 1) &&
                                    <div className="font-bold w-full flex justify-end">
                                        <button onClick={() => setEdit(true)} className="bg-blue-400 px-2 py-1 rounded-lg font-semibold text-white"> Editar </button>
                                    </div>
                                }
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
                                        <span className="font-semibold">Archivos Subidos</span>
                                        {(dato.status_id < 4 && auth.user.rol_id == 2) &&
                                            <label htmlFor="file" className="bg-upload px-2 py-1 rounded-lg font-semibold text-white"> Agregar + </label>
                                        }
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                        {dato.files.filter(
                                    (archivo) => (archivo.user.rol_id === 2)
                                    ).map((archivo) =>
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

                                <div className="flex flex-col w-full border h-92 p-4 gap-6 rounded-md">

                                    <div className="flex justify-between w-full">
                                        <span className="font-semibold">Entregas</span>
                                        {( auth.user.rol_id != 2) &&
                                            <label htmlFor="file" className="bg-upload px-2 py-1 rounded-lg font-semibold text-white"> Agregar + </label>
                                        }
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                        {dato.files.filter(
                                    (archivo) => (archivo.user.rol_id != 2)
                                    ).map((archivo) =>
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



                                <Modal show={edit} onClose={() => {setShow(false), setEdit(false)}} >
                                    <div className="flex justify-end" >
                                        <button onClick={() => setEdit(false)} className="px-2 font-bold hover:bg-gray-300 rounded-lg">
                                            x
                                        </button>
                                    </div>

                                    <form onSubmit={submit} className="flex flex-col w-full gap-4 text-textgray p-4">

                                        <label htmlFor="nombre" className="text-xs flex flex-col ">
                                            Numero de Solicitud
                                            <input
                                                disabled
                                                type="text"
                                                id="nombre"
                                                name="nombre"
                                                value={data.numero}

                                                className="h-9 rounded-md  outline-none px-2"
                                            />
                                        </label>


                                        <div className="flex gap-4 justify-between ">

                                            <label className="text-xs flex flex-col  w-full">
                                                Solicitud
                                                <select
                                                    required
                                                    name="solicitud_id"
                                                    id="solicitud_id"
                                                    value={data.tipo_id}
                                                    onChange={(e) => setData("tipo_id", e.target.value)}
                                                    className="h-9 rounded-md  outline-none px-2"
                                                >
                                                    <option value="">Seleccione servicio</option>
                                                    {tipoSolicitudes.map((tipo) => 
                                                        (<option key={tipo.id} value={tipo.id}>
                                                                    {tipo.nombre}
                                                        </option> )
                                                    )
                                                    }

                                                </select>
                                            </label>



                                            <label htmlFor="date" className="text-xs flex flex-col max-w-[10rem]">
                                                Fecha
                                                <input
                                                    disabled
                                                    type="text"
                                                    id="date"
                                                    name="date"
                                                    value={format(new Date(data.created_at), 'dd/MM/yyyy hh:mm:ss a')}
                                                    className="h-9 rounded-md w-full outline-none px-2"
                                                />
                                            </label>
                                        </div>




                                        <div className="flex flex-col">
                                            <label htmlFor="comentario" className="text-xs">
                                                Comentarios
                                            </label>

                                            <textarea
                                                value={data.comentario}
                                               
                                                onChange={(e) => setData("comentario", e.target.value)}
                                                placeholder="Escribe tu comentario"
                                                name="comentario"
                                                id="comentario"
                                                className="w-full resize-none h-28 p-3 rounded-md outline-none "
                                            ></textarea>
                                        </div>

                                        {errorMessage && (
                                            <div className="alert alert-danger">
                                                {errorMessage}
                                            </div>
                                        )}

                                        <button className="border py-1 w-36 rounded-xl bg-gray-300 hover:bg-gray-200 text-textgray self-center justify-center mr-5 mt-5">
                                            Guardar
                                        </button>
                                    </form>

                                </Modal>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>

            <Modal show={show} maxWidth="sm" onClose={() => {setShow(false), setEdit(false)} }>
                <img
                    className="z-50 w-20 absolute left-1/2 transform -translate-x-1/2 -top-10 bg-white rounded-full p-2  "
                    src="/assets/svg/check.svg"
                    alt=""
                />

                <div className="text-center relative mb-2 ">
                    <h1 className="mt-14 mb-8 font-semibold">{msj?.success}</h1>

                    <div className="hover:scale-110">

                    <button  onClick={() => {setShow(false), setEdit(false)}} className="bg-green-600 rounded-lg px-3 py-1     text-lg font-bold text-white  " >
                        Cerrar
                    </button>
                    
                    </div>
                    
                </div>
            </Modal>                                




        </AuthenticatedLayout>
    ); 
}
