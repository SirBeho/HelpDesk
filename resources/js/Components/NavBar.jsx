import React, { useEffect, useState } from "react";
// import Image from 'next/image'
import logo from "/public/assets/whiteLogo.png"
import Dropdown from './Dropdown'
import { Head, Link, useForm } from '@inertiajs/react';
import Modal from "@/Components/Modal";
import Loading from "./Loading";

export default function NavBar({user, solicitud_id, countNotificaciones, msj }) {
    
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    file: [],
    nombre: [],
    extencion: [],
    solicitud_id: solicitud_id
  });

  useEffect(() => {
    setData("solicitud_id", solicitud_id)
  }, [solicitud_id]);


  const [errorMessage, setErrorMessage] = useState(null);
  const [duplicados, setDuplicados] = useState([]);

  
  useEffect(() => {
    setLoading(false);
    if (!(msj?.error == null || msj?.error == [])) {


      if (msj?.error.duplicados?.length > 0) {

        setDuplicados(msj.error.duplicados);

        setErrorMessage([...msj?.error.error, "Algunos nombres están duplicados"])
      } else {
        setErrorMessage(msj?.error.error);
      }
    } else if (msj?.success) {
      setDuplicados([]);
      setErrorMessage([]);
      limpiar();
    }
 
  }, [msj]);



  const submit = async (e) => {
    setLoading(true);
    e.preventDefault();

    post( route('upload'), {
      onSuccess: (e) => {
        console.log(e.msj)
        console.log(e.props.msj)
      },
      onError: (e)=>{
       // console.log(e)
        //console.log("erroresss")
      }
    });

   
  };

  const limpiar = (e) => {
         
        setData({
        file: [],
        nombre: [],
        extencion: [],
        solicitud_id: solicitud_id
      });  
   
  };


  const today = new Date();
  const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`; // Formatea la fecha como dd/mm/yyyy

  return (
    <header className='flex items-center w-full bg-nav fixed z-10 h-16'>

      <div className='flex items-center w-3/4'>
        <img className='p-4' src={logo} width={120} height={120} alt='logo' />

        <label htmlFor="file" onClick={() => setShow(true)} className='flex h-9 px-2 gap-2 bg-upload items-center rounded-lg text-white cursor-pointer'>
          Cargar documento

          <input
            required
            multiple
            className="hidden"
            type="file"
            id="file"
            name="file"
            onChange={(e) => {
              const newFiles = Array.from(e.target.files);
              const newNombres = newFiles.map((file) => file.name.split('.')[0]);
              const newExtensiones = newFiles.map((file) => file.name.split('.').pop());

              setData({
                ...data,
                file: [...data.file, ...newFiles],
                nombre: [...data.nombre, ...newNombres],
                extencion: [...data.extencion, ...newExtensiones],
              });
            }}
          />

          <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </span>
        </label>



       

      </div>

      <div className='flex justify-end px-10 text-gray-300 '>
        <Link href={route('notificaciones')} className='relative cursor-pointer'>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>

          {countNotificaciones > 0 &&
            <span className='absolute bg-red-600 rounded-full w-5 h-5 text-center text-xs font-semibold text-gray-50 flex items-center justify-center top-[15px] right-[-10px]'>
              {countNotificaciones}
            </span>
          }
        </Link>
      </div>

      <div className="hidden sm:flex sm:items-center sm:ml-6">
        <div className="ml-3 relative">
          <Dropdown>
            <Dropdown.Trigger>
              <span className="inline-flex rounded-md">
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-200   hover:text-gray-400 focus:outline-none transition ease-in-out duration-150"
                >
                  {user.name}

                  <svg
                    className="ml-2 -mr-0.5 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </span>
            </Dropdown.Trigger>

            <Dropdown.Content>
              <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
              <Dropdown.Link href={route('logout')} method="post" as="button">
                Log Out
              </Dropdown.Link>
            </Dropdown.Content>
          </Dropdown>
        </div>



      </div>


      <Modal show={show} onClose={() => setShow(false)} >

        {loading ?
          <Loading /> : (
        <>
        <div className="flex justify-end" >
          <button onClick={() => setShow(false)} className="px-2 font-bold hover:bg-gray-300 rounded-lg">
            x
          </button>
        </div>

        <form onSubmit={submit} className="flex flex-col w-full gap-4 text-textgray p-4">
          <div className="flex gap-4 justify-between ">
            <label className="text-xs flex flex-col  w-full">
              Solicitud
              <select
                required
                name="solicitud_id"
                id="solicitud_id"
                value={data.solicitud_id}
                onChange={(e) => setData("solicitud_id", e.target.value)}
                className="h-9 rounded-md  outline-none px-2"
              >
                <option value="">Seleccione Solicitud</option>



                {user.solicitudes.sort((a, b) => {
                  return new Date(a.created_at) - new Date(b.created_at);
                }).map((solicitud) => {
                  if (solicitud.status_id < 4) {
                    if (solicitud.tipo_id < 3) {
                      return (
                        <option key={solicitud.id} value={solicitud.id}>
                          Facturas {solicitud.comentario}{solicitud.tipo_id == 1 ? " - Compras" : " - ventas"}
                        </option>
                      );
                    } else {
                      return (
                        <option key={solicitud.id} value={solicitud.id}>
                          {solicitud.numero} - {solicitud.tipo.nombre}
                        </option>
                      );
                    }

                  } else {
                    return null;
                  }
                })
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
                value={formattedDate}
                className="h-9 rounded-md w-full outline-none px-2"
              />
            </label>
          </div>

          <label htmlFor="file" className="cursor-pointer ">

            <div className="flex gap-2 ">
              {data.extencion && data.extencion.length > 0 ? (
                <div className="relative flex flex-col w-full ">
                  <p>Archivos seleccionados:</p>
                  <ul className="grid grid-cols-2 gap-2 rounded-md p-1 hover:bg-green-100">
                    {data.file.map((file, index) => (

                      <li className="flex gap-3 " key={index}>
                        <img src={`assets/svg/${data.extencion[index]}.svg`} className="w-8" alt=" " />
                        <input type="text"
                          className={`rounded-md py-0 ${duplicados.includes(data.nombre[index]) ? 'bg-red-300 text-black' : ''}`}
                          value={data.nombre[index]}
                          onChange={(e) => {
                            const newNombres = [...data.nombre];
                            newNombres[index] = e.target.value;
                            setData({ ...data, nombre: newNombres });
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                  <button className="border py-1 w-36 rounded-xl bg-gray-300 hover:bg-gray-200 text-textgray self-center justify-center mr-5 mt-5">
                    Enviar Archivos

                   

                  </button>
                  <button className="absolute right-0 bottom-0 flex  p-1 rounded-md text-black" onClick={()=> limpiar()}>

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 hover:stroke-red-600 "><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg>
                    </button>
                </div>

              ) : (
                <div className="flex justify-center w-full ">
                  <p className='flex h-9 px-2 gap-2 bg-upload items-center rounded-lg text-white cursor-pointer '>
                    Subir archivos
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                  </p>
                </div>
              )}
            </div>


          </label>
          {errorMessage && (
            errorMessage.map((msj, index) => (<h1 key={"msj" + index} className="text-red-400 text-center">{msj}</h1>))
          )}


        </form>
        </>)}
      </Modal>



    </header>
  )
}
