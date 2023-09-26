import React, { useEffect, useState } from "react";
// import Image from 'next/image'
import logo from "/public/assets/whiteLogo.png"
import Dropdown from './Dropdown'
import { Head, Link, useForm } from '@inertiajs/react';
import Modal from "@/Components/Modal";




export default function NavBar({ user, solicitud_id }) {

  const [show, setShow] = useState(false);
   const { data, setData, post, processing, errors, reset } = useForm({
    file: null,
    nombre: '',
    solicitud_id: solicitud_id
  });
  

  useEffect(() => {
    setData("solicitud_id", solicitud_id)
}, [solicitud_id]);

  
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const submit = async (e) => {
    e.preventDefault();

    // Realiza la solicitud POST
    const response = await post(route('upload'));

    // Verifica si hay errores en la respuesta
    if (response.error) {
      // Puedes manejar errores de validación u otros errores aquí
      console.error(response.error);
    } else {
      // La solicitud se realizó con éxito
      console.log('Solicitud exitosa');
      // Puedes realizar acciones adicionales aquí si es necesario
    }
  };


  const today = new Date();
  const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`; // Formatea la fecha como dd/mm/yyyy

  return (
    <header className='flex items-center w-full bg-nav fixed z-10 h-16'>

      <div className='flex items-center w-3/4'>
        <img className='p-4' src={logo} width={120} height={120} alt='logo' />

        <label htmlFor="file" onClick={() => setShow(true)} className='flex h-9 px-2 gap-2 bg-upload items-center rounded-lg text-white cursor-pointer'>
          Cargar documento
          <input required className="hidden" type="file" id="file" name="file" onChange={(e) => setData('file', e.target.files[0])} />
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </span>
        </label>



        {/*  <div className='flex bg-darkgray mx-5 px-2 gap-2 rounded-3xl text-white items-center'>
          <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          </span>

          <input type="text" name="search" id="search" placeholder='Buscar documento' className='outline-transparent border-none bg bg-transparent placeholder:text-gray-400 focus:ring-0' />

        </div> */}



      </div>

      <div className='flex justify-end px-10 text-gray-300 '>
        <Link href={route('notificaciones')} className='relative cursor-pointer'>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          <span className='absolute bg-red-600 rounded-full w-5 h-5 text-center text-xs font-semibold text-gray-50 flex items-center justify-center top-[15px] right-[-10px]'>
            1
          </span>
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
                <option value="">Seleccione servicio</option>
                {user.solicitudes.map((solicitud) => {
                    if (solicitud.status_id < 4) {
                      return (
                        <option key={solicitud.id} value={solicitud.id}>
                          {solicitud.numero} - {solicitud.tipo.nombre}
                        </option>
                      );
                    } else {
                      return null; 
                    }
                  })
                }

              </select>
            </label>



            <label htmlFor="date" className="text-xs flex flex-col ">
              Fecha
              <input
                disabled
                type="text"
                id="date"
                name="date"
                value={formattedDate}
                className="h-9 rounded-md  outline-none px-2"
              />
            </label>
          </div>

          <label htmlFor="nombre" className="text-xs flex flex-col ">
            Nombre del Archivo
            <input
              required
              type="text"
              id="nombre"
              name="nombre"
              value={data.nombre}
              onChange={(e) => setData("nombre", e.target.value)}
              className="h-9 rounded-md  outline-none px-2"
            />
          </label>

          <label htmlFor="file" className="cursor-pointer ">
            Seleccione un archivo:
            <div className="flex gap-2">
              {/*               <input required className="hidden" type="file" id="file" name="file" onChange={(e) => setData('file', e.target.files[0])} />
 */}              <img src="assets/svg/file2.svg" className="w-5" alt=" " />
              {data.file ? <p>{data.file.name}</p> : <p>Ningun archivo seleccionado</p>}
            </div>

          </label>

          <div className="flex flex-col">
            <label htmlFor="comentario" className="text-xs">
              Comentarios
            </label>

            <textarea
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
            Enviar archivo
          </button>
        </form>

      </Modal>




    </header>
  )
}
