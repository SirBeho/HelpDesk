
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import axios from 'axios';
import { Head } from "@inertiajs/react";


export default function archivos({ auth }) {


  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:8000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      //console.log('Archivo subido con éxito', response.data);
    } catch (error) {
      console.error('Error al subir el archivo', error);
    }
  };

  return (

    <AuthenticatedLayout
      countNotificaciones={auth.countNotificaciones}
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Archivos</h2>}
    >
      <Head title="Archivos" />

      <div className="w-[calc(100%-3rem)] h-[calc(100%-3rem)] bg-white m-6 rounded-md flex flex-col gap-10">

        <div className="flex flex-col w-2/5 mx-auto gap-4 text-textgray">
          <input type="file" onChange={handleFileChange} />
          <button className=" bg-blue-600 rounded-lg p-2 text-white" onClick={handleUpload}>Subir Archivo</button>
        </div>

      </div>

    </AuthenticatedLayout>
  )

}
