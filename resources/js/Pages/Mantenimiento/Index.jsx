
import { DataTable } from '@/Components/DataTable';
import { NewSolicitudCategory } from '@/Components/NewSolicitudCategory';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from "@inertiajs/react";
import { useState } from 'react';



export default function Mantenimiento({ auth, tipoSolicitudes }) {
  const [show, setShow] = useState(false)
  const tbStructure = {
    'Tipo de Solicitud': 'nombre',
    'Categoria': 'categoria',
    'Status': 'status'
  }
  const dataList = tipoSolicitudes.map(tipoSolicitud => {
    delete tipoSolicitud.created_at;
    delete tipoSolicitud.updated_at;


    if (tipoSolicitud.tipo === 1) {
      tipoSolicitud['categoria'] = 'Servicios';

      return tipoSolicitud;
    }
    if (tipoSolicitud.tipo === 2) {
      tipoSolicitud['categoria'] = 'Certificacioens';

      return tipoSolicitud;
    }
    if (tipoSolicitud.tipo === 3) {
      tipoSolicitud['categoria'] = 'Estados Financieros';

      return tipoSolicitud;
    }
    if (tipoSolicitud.tipo === 4) {
      tipoSolicitud['categoria'] = 'Reportes Generales';

      return tipoSolicitud;
    }

  })



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

            <li className="me-2">
              <a href="#" className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Empresa</a>
            </li>

          </ul>

          <DataTable
            data={dataList}
            action={true}
            tbStructure={tbStructure}
            onNew={()=>setShow(true)}
          />

          <NewSolicitudCategory
            show={show}
            hideModal={()=>setShow(false)}
          />
        </div>
      </div>

    </AuthenticatedLayout>
  )

}
