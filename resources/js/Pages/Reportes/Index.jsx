import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useEffect } from 'react';
import { Head } from "@inertiajs/react";
import jsPDF from 'jspdf';
import { format } from "date-fns";
import Reporte_soli from "./reporte_solicitudes"
import Reporte_doc from "./reporte_documentos"
import { createRoot } from 'react-dom/client';

export default function documentos({ auth, tipo_solicitudes,clientes }) {

  const solicitudes = auth.user.solicitudes.filter(solicitud => solicitud.tipo_id > 2);


  const documentos = [];
  solicitudes.forEach((solicitud) => {
    if (solicitud.files && solicitud.files.length > 0) {
      documentos.push(...solicitud.files);
    }
  });
  const [documentos_f, setDocumentos_f] = useState(documentos);
  const [solicitudes_f, setSolicitudes_f] = useState(solicitudes);
  const [reportes, setReportes] = useState(0);
  const [datos, setDatos] = useState({
    inicio: 0,
    fin: 0,
    tipo: 0,
    cliente: 0,

    fecha: new Date().toLocaleDateString(),
    hora: new Date().toLocaleTimeString('en-US', { hour12: true }),
    usuario: auth.user.name,

  });

  useEffect(() => {
    console.log(datos)
    filterDataByDate()
  }, [datos])

  const filterDataByDate = () => {

    const inicio = new Date(datos.inicio + ' 00:00:00');
    const fin = new Date(datos.fin + ' 23:59:59');


    const solicitudes_filtradas = solicitudes.filter((soli) => {
      const fechaCreacion = new Date(soli.created_at);

      if (datos.inicio && fechaCreacion < inicio) {
        return false;
      }

      if (datos.fin && fechaCreacion > fin) {
        return false;
      }
      if (datos.tipo && soli.tipo_id !== datos.tipo) {
        return false;
      }
      if (datos.cliente && soli.user.name !== datos.cliente) {
        return false;
      }

      return true;
    });

    const documentos_filtrados = documentos.filter((documento) => {
      const fechaCreacion = new Date(documento.created_at);
      if (datos.inicio && fechaCreacion < inicio) {
        return false;
      }
      if (datos.fin && fechaCreacion > fin) {
        return false;
      }
      return true;
    });

    if (reportes == 0) {
      setSolicitudes_f(solicitudes_filtradas);
    } else {
      setDocumentos_f(documentos_filtrados);
    }

  };


  const descargarPDF = (reporte) => {

    const pdf = new jsPDF('p', 'pt', 'a4'); // Tamaño de página A4 (595.28 x 841.89 puntos)
    pdf.setFontSize(5);
    const container = document.createElement('div');
    const root = createRoot(container);

    const data = { ...datos, inicio: datos.inicio ? format(new Date(datos.inicio), "dd/MM/yyyy") : "Innicio", fin: datos.fin ? format(new Date(datos.fin), "dd/MM/yyyy") : "Finn" }

    document.body.appendChild(container);
    if (reporte == 0) {
      root.render(<Reporte_soli solicitudes_f={solicitudes_f} datos={data} />);

    } else if (reporte == 1) {
      root.render(<Reporte_doc documentos_f={documentos_f} datos={datos} />);
    }

    const contentWidth = container.offsetWidth;
    const a4Width = 590; // Ancho de una página A4 en puntos
    console.log(contentWidth, a4Width)
    const scale = a4Width / contentWidth;

    pdf.html(container, {
      x: 5,
      y: 5,
      html2canvas: { scale: scale },
      callback: function (pdf) {
        pdf.save('report.pdf');
        root.unmount();
        document.body.removeChild(container);
      }
    });


  };


  const descargarExel = () => {




    const data = {
      datos: { ...datos, inicio: datos.inicio ? format(new Date(datos.inicio), "dd/MM/yyyy") : "Innicio", fin: datos.fin ? format(new Date(datos.fin), "dd/MM/yyyy") : "Finn" },
      solicitudes_f: solicitudes_f,
    }

    console.log(data)
    axios
      .post('/reportes/generar/soli', { data }, { responseType: 'blob' })
      .then((response) => {
        console.log(response)
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'reporte.xlsx');
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error('Error al descargar el archivo:', error);
      });
  };

  return (
    <AuthenticatedLayout
      countNotificaciones={auth.countNotificaciones}
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Reportes</h2>}
    >
      <>
        <Head title="Reportes" />
        <div className='mx-10 mt-3'>
          <div className='flex gap-2'>
            <button
              onClick={() => setReportes(0)}

              className={` cursor-pointer flex items-center gap-3 border-2 h-10 p-2 bg-blue-400 ${reportes == 0 ? "border-black scale-90" : ""
                } rounded-md text-white font-semibold text-base `}

            >
              <img
                src="/assets/svg/export.svg"
                width={30}
                height={30}
                alt="icon documento"
              />
              Solicitudes
            </button>


            <button
              onClick={() => setReportes(1)}

              className={` cursor-pointer flex items-center gap-3 border-2 h-10 p-2 bg-blue-400 ${reportes == 1 ? "border-black scale-90" : ""
                } rounded-md text-white font-semibold text-base `}

            >
              <img
                src="/assets/svg/document2.svg"
                width={40}
                height={40}
                alt="icon documento"
              />
              Documentos
            </button>

          </div>


<div className='mb-5'>


          <div className=' gap-2 flex'>

            <label className="flex gap-2 my-3" >Fecha de inicio:
              <input max={datos.fin} className='p-0 px-2 rounded-md' type="date" value={datos.inicio} onChange={(e) => setDatos({ ...datos, inicio: e.target.value })} />
            </label>

            <label className="flex gap-2 my-3" >Fecha de fin:
              <input min={datos.inicio} className='p-0 px-2 rounded-md' type="date" value={datos.fin} onChange={(e) => setDatos({ ...datos, fin: e.target.value })} />
            </label>
          </div>


          <div  className=' gap-2 flex'>

            {reportes == 0 && (

              <label className="flex items-center gap-3"  >
                Tipo Solicitudes:
                <select
                  required
                  value={datos.tipo}
                  onChange={(e) => setDatos({ ...datos, tipo: parseInt(e.target.value) })}
                  name="tipo_id"
                  id="tipo_id"
                  className="p-0 px-2 w-fit rounded-md "
                >
                  <option value={0} select>Todas</option>
                  {tipo_solicitudes.map((solicitud) => (
                    <option key={solicitud.id} value={solicitud.id}>
                      {solicitud.nombre}
                    </option>
                  ))}
                </select>
              </label>


            )}

            <label className="flex items-center gap-3 "  >
              Cliente:
              <select
                required
                value={datos.cliente}
                onChange={(e) => setDatos({ ...datos, cliente: e.target.value})}
                name="cliente"
                id="cliente"
                className="p-0 px-2 pe-6 w-fit rounded-md "
              >
                <option value={''}  select>Todos</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.name}>
                    {cliente.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          </div>


          <div className=' flex items-center gap-3'>
            <span>Exportar</span>
            <button onClick={() => descargarPDF(reportes)}>
              <img src="/assets/svg/pdf.svg" width={30} height={30} alt="icon documento" />
            </button>

            <button onClick={() => descargarExel()}>
              <img src="/assets/svg/xlsx.svg" width={30} height={30} alt="icon documento" />
            </button>
          </div>


          {reportes == 0 ? (<div >


            <div id='contenido' className=''>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal overflow-hidden">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          # Solicitud
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Tipo
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Cliente
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Fecha
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {solicitudes_f && (
                        solicitudes_f.map((user, i) => (
                          <tr key={i}>

                            <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">{user.numero}</p>
                            </td>
                            <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">{user.tipo.nombre}</p>
                            </td>
                            <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">{user.user.name}</p>
                            </td>
                            <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">{format(new Date(user.created_at), "dd/MM/yyyy hh:mm:ss a")}</p>
                            </td>
                            <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">{user.status.nombre}</p>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>) : (<div >


            <div id='contenido' className=''>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal overflow-hidden">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Nombre
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Tipo Documento
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Usuario
                        </th>

                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Fecha
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {documentos_f && (
                        documentos_f.map((user, i) => (
                          <tr key={i}>
                            <td className="px-5 py-3 border-b border-gray-200 bg-white text-base font-medium">
                              {user.id}
                            </td>
                            <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">{user.nombre}</p>
                            </td>
                            <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">{user.extencion}</p>
                            </td>
                            <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">{user.user.name}</p>
                            </td>
                            <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">{user.created_at && format(new Date(user.created_at), "dd/MM/yyyy hh:mm:ss a")}</p>
                            </td>

                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>)}



        </div>
      </>
    </AuthenticatedLayout>
  );
}
