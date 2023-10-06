import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useEffect, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";
export default function Panel({ auth, msj, archivos }) {


    // const solicitudes = auth.user.solicitudes;
    const solicitudes = auth.user.solicitudes.filter(solicitud => solicitud.tipo_id < 3);


    solicitudes.sort((a, b) => {
        return new Date(a.created_at) - new Date(b.created_at);
    });




    const datos_f = solicitudes.reduce((solicitudesPorTipo, solicitud) => {
        const year = new Date(solicitud.created_at).getFullYear();

        if (solicitud.tipo_id === 1) {

            solicitudesPorTipo.tipo1[year] = solicitudesPorTipo.tipo1[year] || [];
            solicitudesPorTipo.tipo1[year].push(solicitud);
        } else if (solicitud.tipo_id === 2) {

            solicitudesPorTipo.tipo2[year] = solicitudesPorTipo.tipo2[year] || [];
            solicitudesPorTipo.tipo2[year].push(solicitud);
        }

        return solicitudesPorTipo;
    }, { tipo1: {}, tipo2: {} });


    const [Message, setMessage] = useState(null);
    const [show, setShow] = useState(false);
    const [showmsj, setShowmsj] = useState(msj != null);
    const [select, setSelet] = useState(0);
    const [openyear, setOpenyear] = useState(0);
    const [openmonth, setOpenmonth] = useState(0);


    const { data, setData, post, processing, errors, reset } = useForm({
        tipo_id: 0,
        comentario: "",
        created_at: "",
        year: new Date().getFullYear().toString(),
        month: "",
    });

  
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
    

    useEffect(() => {
      
        if (msj && msj.errord) {
            setMessage("Ya existe un bloque para este mes del " + data.year);
        } else if (msj && !msj.error) {
           
            setMessage(msj.success);
            setShowmsj(true);
            setData("month", "")
        }
    }, [msj]);


    const submit = (e) => {
        e.preventDefault();
        post(route("solicitud.create"));
    };

    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];


    useEffect(() => {
        setData({
            ...data,
            comentario: monthNames[data.month - 1] + " " + data.year,
            created_at: data.year + "-" + data.month + "-02",
        });
    }, [data.month]);


    const abrir = (year) => {
        if (openyear == year) {
            setOpenyear(0);

        } else {
            setOpenyear(year);
        }
        setOpenmonth(0);
    };

    let h;

    return (
        <AuthenticatedLayout
            solicitud_id={openmonth}
            msj={msj}
            countNotificaciones={auth.countNotificaciones}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Panel de documentos</h2>}
        >
            <Head title="Panel" />


            <div className="w-[calc(100%-3rem)] h-[calc(100%-3rem)] flex gap-4  m-6 rounded-md ">

                <div className="h-full w-full bg-[#f2f2f2]">
                    <h3 className="w-full bg-[#1ec0e6] p-2 font-bold text-white rounded-t-md text-xl flex justify-between">Facturas de Compras
                        <button htmlFor="file" onClick={() => { setShow(true); setData("tipo_id", 1) }} className='flex h-9 px-2 gap-2 bg-upload items-center rounded-lg text-base text-white cursor-pointer'>
                            Crear Bloque +
                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg> */}

                        </button>
                    </h3>

                    <div className="flex flex-col h-5/6 overflow-hidden ">
                        {Object.keys(datos_f.tipo1).sort((a, b) => {
                            return new Date(b) - new Date(a);
                        }).map((year, index) => (
                            <table key={"t1" + index} className="w-full text-left text-textgray">
                                <thead onClick={() => abrir("1" + year)}>
                                    <tr className="border-2 text-sm h-8 bg-gray-300">
                                        <th className="p-2">Facturas {year} </th>
                                    </tr>
                                </thead>

                                {/* <tbody className={`block overflow-auto duration-500  transition-all ${openyear == year ? 'h-['+parseInt(datos_f.tipo1[year].length,10) * 40+'px]' : "h-0"}  `}> */}
                                <div key={"t1" + year} className={`block overflow-auto duration-500  transition-all ${openyear == "1" + year ? 'h-['+12*40+'px]' : "h-0"}  `}>
                                    {datos_f.tipo1[year].map((solicitud, index) => (
                                        <div key={solicitud.id}>
                                            <div onClick={() => setOpenmonth(solicitud.id)} className='cursor-pointer flex justify-between'>
                                                <div className="p-2 h-10">{solicitud.comentario} ({archivos.filter((archivo) => archivo.solicitud_id === solicitud.id).length})</div>
                                                <div className="p-2 h-10"><label htmlFor="file" className="bg-upload px-2 py-1 rounded-lg font-semibold text-white"> + </label></div>
                                            </div>
                                            <div className={` bg-white ms-5 rounded-sm p-1 flex duration-1000 transition-all ${openmonth == solicitud.id ? `` : "hidden "}`}>
                                                {archivos.some((archivo) => archivo.solicitud_id === solicitud.id) ? (
                                                    archivos.filter((archivo) => archivo.solicitud_id === solicitud.id)
                                                        .map((archivo) => (
                                                            <div key={archivo.id} onClick={() => put(archivo.id)} className="text-center w-16 group relative cursor-pointer">
                                                                <div className="w-12 relative">
                                                                    <img className="w-full" src={`/assets/svg/${archivo.extencion}.svg`} alt="" onError={(e) => (e.target.src = "/assets/svg/file3.svg")} />
                                                                    {select == archivo.id ? (
                                                                        <img onClick={() => handleDownload(archivo)} src="/assets/svg/descargar.svg" alt="" className="z-20 top-10 left-14 w-8 absolute transform -translate-x-1/2 hover:scale-125 " />
                                                                    ) : null}
                                                                </div>
                                                                <span className="text-sm left-1/2 transform -translate-x-1/2  relative overflow-hidden text-ellipsis whitespace-nowrap rounded-md block w-16 group-hover:bg-gray-200 group-hover:px-1 group-hover:overflow-visible group-hover:w-fit group-hover:z-10">
                                                                    {archivo.nombre}
                                                                </span>
                                                            </div>
                                                        ))
                                                ) : <div>No hay facturas subidas</div>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </table>
                        )

                        )}

                    </div>
                </div>

                <div className="h-full w-full bg-[#f2f2f2]">
                    <h3 className="w-full bg-[#1e85e6] p-2 font-bold text-white rounded-t-md text-xl flex justify-between">Facturas de Ventas
                        <button htmlFor="file" onClick={() => { setShow(true); setData("tipo_id", 2) }} className='flex h-9 px-2 gap-2 bg-upload items-center rounded-lg text-base text-white cursor-pointer'>
                            Crear Bloque +
                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg> */}

                        </button>
                    </h3>

                    <div className="flex flex-col h-5/6 overflow-hidden ">
                        {Object.keys(datos_f.tipo2).sort((a, b) => {
                            return new Date(b) - new Date(a);
                        }).map((year, index) => {
                           
                            return(
                            <table key={"t2" + index} className="w-full text-left text-textgray">
                                <thead onClick={() => abrir("2" + year)}>
                                    <tr className="border-2 text-sm h-8 bg-gray-300">
                                        <th className="p-2">Facturas {year} </th>
                                    </tr>
                                </thead>

                                {/* <tbody className={`block overflow-hidden duration-500  transition-all ${openyear == year ? 'max-h-['+datos_f.tipo2[year].length * 40+'px]' : "h-0"}  `}> */}
                                <div key={"tb2" + year} className={`block overflow-auto duration-500  transition-all ${openyear == "2" + year ? 'h-[400px]' : "h-0"}  `}>
                                    {datos_f.tipo2[year].map((solicitud) => (
                                        <div key={solicitud.id} >
                                            <div onClick={() => setOpenmonth(solicitud.id)} className='cursor-pointer flex justify-between'>

                                                <div className="p-2 h-10">{solicitud.comentario} ({archivos.filter((archivo) => archivo.solicitud_id === solicitud.id).length})</div>
                                                <div className="p-2 h-10">                                            <label htmlFor="file" className="bg-upload px-2 py-1 rounded-lg font-semibold text-white"> + </label>
                                                </div>
                                            </div>
                                            <div className={` bg-white ms-5 rounded-sm p-1 flex duration-1000 transition-all ${openmonth == solicitud.id ? `` : "hidden "}`}>
                                                {archivos.some((archivo) => archivo.solicitud_id === solicitud.id) ? (
                                                    archivos.filter((archivo) => archivo.solicitud_id === solicitud.id)
                                                        .map((archivo) => (
                                                            <div key={archivo.id} onClick={() => put(archivo.id)} className="text-center w-16 group relative cursor-pointer">
                                                                <div className="w-12 relative">
                                                                    <img className="w-full" src={`/assets/svg/${archivo.extencion}.svg`} alt="" onError={(e) => (e.target.src = "/assets/svg/file3.svg")} />
                                                                    {select == archivo.id ? (
                                                                        <img onClick={() => handleDownload(archivo)} src="/assets/svg/descargar.svg" alt="" className="z-20 top-10 left-14 w-8 absolute transform -translate-x-1/2 hover:scale-125 " />
                                                                    ) : null}
                                                                </div>
                                                                <span className="text-sm left-1/2 transform -translate-x-1/2  relative overflow-hidden text-ellipsis whitespace-nowrap rounded-md block w-16 group-hover:bg-gray-200 group-hover:px-1 group-hover:overflow-visible group-hover:w-fit group-hover:z-10">
                                                                    {archivo.nombre}
                                                                </span>
                                                            </div>
                                                        ))
                                                ) : <div>No hay facturas subidas</div>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </table>)}
                        

                        )}

                    </div>
                </div>

            </div>

            <Modal show={show} onClose={() => { setShow(false); setMessage(null) }} maxWidth={"md"} >
                <div className="flex justify-end" >
                    <button onClick={() => { setShow(false); setMessage(null) }} className="px-2 font-bold hover:bg-gray-300 rounded-lg">
                        x
                    </button>
                </div>

                <form onSubmit={submit} className="flex flex-col w-full  text-textgray ">
                    <h1 className='text-xl text-center font-bold'>Bloque Para facturas</h1>
                    <h1 className='text-xl text-center font-bold mb-5'>{data.tipo_id == 1 ? "Compras" : "ventas"}</h1>
                    <div className='flex gap-4'>

                        <label className="text-base flex flex-col w-2/3">
                            Seleccione el mes
                            <select
                                required
                                name="month"
                                id="month"
                                value={data.month}
                                onChange={(e) => setData("month", e.target.value)}
                                className="h-9 rounded-md outline-none px-2"
                            >
                                <option value="">Seleccione servicio</option>
                                <option value="01">Enero</option>
                                <option value="02">Febrero</option>
                                <option value="03">Marzo</option>
                                <option value="04">Abril</option>
                                <option value="05">Mayo</option>
                                <option value="06">Junio</option>
                                <option value="07">Julio</option>
                                <option value="08">Agosto</option>
                                <option value="09">Septiembre</option>
                                <option value="10">Octubre</option>
                                <option value="11">Noviembre</option>
                                <option value="12">Diciembre</option>
                            </select>
                        </label>

                        <label className="text-base flex flex-col w-1/3">
                            Seleccione el Año
                            <select
                                required
                                name="year"
                                id="year"
                                value={data.year}
                                onChange={(e) => setData("year", e.target.value)}
                                className="h-9 rounded-md outline-none px-2"
                            >
                                <option value="">Seleccione servicio</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                            </select>
                        </label>
                    </div>


                    {Message && (
                        <div className="alert alert-danger">
                            {Message}
                        </div>
                    )}

                    <button className={`border py-1 w-36 rounded-xl ${data.tipo_id == 1 ? "bg-[#1ec0e6]" : "bg-[#1e85e6]"}  hover:bg-gray-200 text-white self-center justify-center mr-5 mt-8`}>
                        Crear
                    </button>
                </form>

            </Modal>

            <Modal show={showmsj} maxWidth="sm" onClose={() => { setShowmsj(false); setMessage(null) }} >
                <img
                    className="z-50 w-20 absolute left-1/2 transform -translate-x-1/2 -top-10 bg-white rounded-full p-2  "
                    src="/assets/svg/check.svg"
                    alt=""
                />

                <div className="text-center relative mb-2 ">
                    <h1 className="mt-14 mb-8 font-semibold">{Message}</h1>

                    <div className="hover:scale-110">
                        <button onClick={() => { setShowmsj(false); setMessage(null) }} className="bg-green-600 rounded-lg px-3 py-1     text-lg font-bold text-white  " >
                            Cerrar
                        </button>

                    </div>

                </div>
            </Modal>

        </AuthenticatedLayout>
    )

}