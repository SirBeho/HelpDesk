
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { Head } from "@inertiajs/react";





export default function Mantenimiento({ auth, users, roles }) {


  return (

    <AuthenticatedLayout
      countNotificaciones={auth.countNotificaciones}
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Mantenimiento</h2>}
    >
      <Head title="Mantenimiento" />


      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">



          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200   mb-8">
            <li className="me-2">
              <a href="#" aria-current="page" className="inline-block p-4 text-blue-600  bg-nav rounded-t-lg  dark:text-blue-500">Solicitudes</a>
            </li>
            <li className="me-2">
              <a href="#" className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Bloques de Factura</a>
            </li>
         
             
          </ul>


          <div className="my-2 flex sm:flex-row flex-col gap-4 items-center">

            <div className="block relative">
              <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                  <path
                    d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                  </path>
                </svg>
              </span>
              <input placeholder="Buscar usuario"
                className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                value={'searchValue'}
                onChange={(e) => console.log('first')}
              />
            </div>

            <div>
              <button className='bg-blue-600 rounded-sm h-9 px-2 hover:bg-blue-700 hover:shadow-md  text-gray-950 hover:text-gray-100'
                onClick={'create'}
              >
                Nuevo usuario
              </button>
            </div>
          </div>


          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal overflow-hidden">
                <thead>
                  <tr>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Rol
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody >
                  {/* {sortingData && (
                    sortingData.map((user, i) => (
                      <tr key={i}>
                        <td className="px-5 py-3 border-b border-gray-200 bg-white text-base font-medium">
                          {user.name}
                        </td>

                        <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{user.rol.nombre}</p>
                        </td>

                        <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                          {user.status == 0 ?
                            <span className='bg-red-300 px-2 rounded-lg'>Inactivo</span>
                            : <span className='bg-blue-300 px-2 rounded-lg'>Activo</span>}

                        </td>

                        <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                          <div className='flex gap-4'>
                            <span className='cursor-pointer' onClick={() => { editUser(user.id) }}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:stroke-blue-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                              </svg>
                            </span>

                            <span className='cursor-pointer' onClick={() => { destroyUser(user.id) }}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:stroke-red-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                              </svg>
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))

                  )} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  )

}
