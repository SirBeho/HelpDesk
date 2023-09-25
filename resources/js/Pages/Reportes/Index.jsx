
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import axios from 'axios';
import { Head } from "@inertiajs/react";


export default function archivos({ auth }) {


   

  return (

    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Reportes</h2>}
    >
      <Head title="Reportes" />


    </AuthenticatedLayout>
  )

}
