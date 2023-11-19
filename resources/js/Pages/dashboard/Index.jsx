import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useEffect, useRef } from 'react';
import { Head } from "@inertiajs/react";
import jsPDF from 'jspdf';
import { format } from "date-fns";
import { createRoot } from 'react-dom/client';
import ApexCharts from 'apexcharts';
import { closePath } from 'pdf-lib';





export default function documentos({ auth, tipo_solicitudes, clientes, estados, solicitud }) {

  const solicitudes = solicitud.filter(solicitud => solicitud.tipo_id > 2);


  const documentos = [];
  solicitudes.forEach((solicitud) => {
    if (solicitud.files && solicitud.files.length > 0) {
      documentos.push(...solicitud.files);
    }
  });
  const [solicitudes_f, setSolicitudes_f] = useState(solicitudes);
  const [reportes, setDashboard] = useState(0);
  const [datos, setDatos] = useState({
    inicio: 0,
    fin: 0,
    tipo: 0,
    cliente: 0,
    estado: 0,

    fecha: new Date().toLocaleDateString(),
    hora: new Date().toLocaleTimeString('en-US', { hour12: true }),
    usuario: auth.user.name,

  });
  const [renderizado, setRenderizado] = useState(false);
  const [showPercentages, setShowPercentages] = useState(false);
  const [filtro, setFiltro] = useState(false);

  const tipoChartRef = useRef(null);
  const estatusChartRef = useRef(null);
  const clienteChartRef = useRef(null);

  const solicitudes_tipo = (tipos, totalSolicitudes) => {

    const options = {
      series: [{
        name: 'Solicitudes',
        data: Object.values(tipos),
      }],
      chart: {
        height: 450,
        type: 'bar',
        animations: {
          enabled: true,
          easing: "easeinout",
          dynamicAnimation: {
            enabled: true,
            speed: 350
          },

          animateGradually: {
            enabled: true,
            delay: 1500
          },

        }


      },
      plotOptions: {
        bar: {
          columnWidth: '75%',
          distributed: true,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
      dataLabels: {
        enabled: true,
        formatter: (value, context) => {
          return showPercentages ? (value / totalSolicitudes * 100).toFixed(0) + '%' : value;
        },
        style: {
          fontSize: '12px'
        }
      },
      legend: {
        show: true,
      },
      xaxis: {
        categories: Object.keys(tipos),
        labels: {
          style: {

            fontSize: '10px'
          }
        },

      },
      yaxis: {
        show: true,
        min: 0,
        forceNiceScale: true,
        crosshairs: {
          show: true,
          position: 'back',
          stroke: {
            color: '#b6b6b6',
            width: 1,
            dashArray: 0,
          },
        },
        tooltip: {
          enabled: true,
          offsetX: 0,
        },

      },
      title: {
        text: 'Solicitudes por tipo',
        floating: false,

        align: 'center',
        style: {
          color: '#444',
          fontSize: '20px'
        }
      }
    };

    if (!tipoChartRef.current) {
      const chart = new ApexCharts(document.getElementById("chart_tipo"), options);
      chart.render();
      tipoChartRef.current = chart;
    } else {
      tipoChartRef.current.updateOptions(options);
    }

  }

  const solicitudes_estatus = (tipos, totalSolicitudes) => {

    const options = {
      series: Object.values(tipos),
      chart: {
        height: 450,
        type: 'pie',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        },
        toolbar: {
          show: true,
        },



      },
      plotOptions: {
        pie: {
          columnWidth: '75%',
          distributed: true,
          dataLabels: {
            position: 'center', // top, center, bottom
          },
        }
      },
      dataLabels: {
        enabled: true,
        formatter: (value, context) => {
          return showPercentages ? value.toFixed(1) + "%" : Math.round(totalSolicitudes * value / 100).toString();
        },
        style: {
          fontSize: '12px'
        }
      },
      legend: {
        show: true,

        position: 'right',
        horizontalAlign: 'center',



        itemMargin: {
          horizontal: 5,
          vertical: 2
        },
        onItemClick: {
          toggleDataSeries: true
        },
        onItemHover: {
          highlightDataSeries: true
        },
      },
      labels: Object.keys(tipos),

      title: {
        text: 'Solicitudes por estado',
        floating: false,

        align: 'center',
        style: {
          color: '#444',
          fontSize: '20px'
        }
      },
      tooltip: {
        enabled: true,


        fillSeriesColor: false,

        onDatasetHover: {
          highlightDataSeries: true,
        },

      }
    };

    if (!estatusChartRef.current) {
      const chart = new ApexCharts(document.getElementById("chart_status"), options);
      chart.render();
      estatusChartRef.current = chart;
    } else {
      estatusChartRef.current.updateOptions(options);
    }

  }


  const solicitudes_clientes = (tipos, totalSolicitudes) => {

    const options = {
      series: [{
        name: 'Solicitudes',
        data: Object.values(tipos),
      }],
      chart: {
        height: 450,
        type: 'bar',
        animations: {
          enabled: true,
          easing: "easeinout",
          dynamicAnimation: {
            enabled: true,
            speed: 350
          },

          animateGradually: {
            enabled: true,
            delay: 1500
          },

        }


      },
      plotOptions: {
        bar: {
          columnWidth: '75%',
          distributed: true,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
      dataLabels: {
        enabled: true,
        formatter: (value, context) => {
          return showPercentages ? (value / totalSolicitudes * 100).toFixed(0) + '%' : value;
        },
        style: {
          fontSize: '12px'
        }
      },
      legend: {
        show: true,
      },
      xaxis: {
        categories: Object.keys(tipos),
        labels: {
          style: {

            fontSize: '10px'
          }
        },

      },
      yaxis: {
        show: true,
        min: 0,
        forceNiceScale: true,
        crosshairs: {
          show: true,
          position: 'back',
          stroke: {
            color: '#b6b6b6',
            width: 1,
            dashArray: 0,
          },
        },
        tooltip: {
          enabled: true,
          offsetX: 0,
        },

      },
      title: {
        text: 'Solicitudes por Clientes',
        floating: false,

        align: 'center',
        style: {
          color: '#444',
          fontSize: '20px'
        }
      }
    };

    if (!clienteChartRef.current) {
      const chart = new ApexCharts(document.getElementById("chart_cliente"), options);
      chart.render();
      clienteChartRef.current = chart;
    } else {
      clienteChartRef.current.updateOptions(options);
    }


  }



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

      if (datos.estado && soli.status_id !== datos.estado) {
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
      if (datos.cliente && documento.user.name !== datos.cliente) {
        return false;
      }


      return true;
    });

    if (reportes == 0) {
      setSolicitudes_f(solicitudes_filtradas);
    } else {
      setDocumentos_f(documentos_filtrados);
      console.log(documentos_filtrados)
    }

  };

  useEffect(() => {

    filterDataByDate()
  }, [datos])

  useEffect(() => {


    if (renderizado) {

      const tipoSolicitudes = {};
      let totalSolicitudes = 0;

      solicitudes_f.forEach((solicitud) => {
        totalSolicitudes++;
        if (tipoSolicitudes[solicitud.tipo.nombre]) {
          tipoSolicitudes[solicitud.tipo.nombre]++;
        } else {
          tipoSolicitudes[solicitud.tipo.nombre] = 1;
        }
      });
      solicitudes_tipo(tipoSolicitudes, totalSolicitudes);


      const estadosSolicitudes = {};
      solicitudes_f.forEach((solicitud) => {
        if (estadosSolicitudes[solicitud.status.nombre]) {
          estadosSolicitudes[solicitud.status.nombre]++;
        } else {
          estadosSolicitudes[solicitud.status.nombre] = 1;
        }
      });
      solicitudes_estatus(estadosSolicitudes, totalSolicitudes);


      const clientesSolicitudes = {};
      solicitudes_f.forEach((solicitud) => {
        if (clientesSolicitudes[solicitud.user.name]) {
          clientesSolicitudes[solicitud.user.name]++;
        } else {
          clientesSolicitudes[solicitud.user.name] = 1;
        }
      });
      solicitudes_clientes(clientesSolicitudes, totalSolicitudes);



    }



  }, [solicitudes_f, showPercentages]);

  useEffect(() => {
    setRenderizado(true)
  }, [])

  return (
    <AuthenticatedLayout
      countNotificaciones={auth.countNotificaciones}
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
      <>
        <Head title="Dashboard" />
        <div className='mx-10 mt-3'>


          <div className="flex flex-wrap bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="w-full md:w-1/2 xl:w-1/3 p-4 px-8">
              {/*Metric Card*/}
              <div className="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-2">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-2 bg-green-600">
                      <i className="fa fa-wallet fa-2x fa-inverse" />
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h2 className="font-bold uppercase text-gray-600">Solicitudes</h2>
                    <p className="font-bold text-xl">
                      $3249{" "}
                      <span className="text-green-500">
                        <i className="fas fa-caret-up" />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              {/*/Metric Card*/}
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-4 px-8">
              {/*Metric Card*/}
              <div className="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-2">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-2 bg-pink-600">
                      <i className="fas fa-users fa-2x fa-inverse" />
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h2 className="font-bold uppercase text-gray-600">Total Clientes</h2>
                    <p className="font-bold text-3xl">
                      249{" "}
                      <span className="text-pink-500">
                        <i className="fas fa-exchange-alt" />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              {/*/Metric Card*/}
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-4 px-8">
              {/*Metric Card*/}
              <div className="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-2">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-2 bg-yellow-600">
                      <i className="fas fa-user-plus fa-2x fa-inverse" />
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h2 className="font-bold uppercase text-gray-600">Nuevos Cliente - ultimo mes</h2>
                    <p className="font-bold text-3xl">
                      2{" "}
                      <span className="text-yellow-600">
                        <i className="fas fa-caret-up" />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              {/*/Metric Card*/}
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-4 px-8">
              {/*Metric Card*/}
              <div className="bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-2">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-2 bg-blue-600">
                      <i className="fas fa-server fa-2x fa-inverse" />
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h2 className="font-bold uppercase text-gray-600">Solicitudes por trabajar</h2>
                    <p className="font-bold text-3xl">152 days</p>
                  </div>
                </div>
              </div>
              {/*/Metric Card*/}
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-4 px-8">
              {/*Metric Card*/}
              <div className="bg-gradient-to-b from-indigo-200 to-indigo-100 border-b-4 border-indigo-500 rounded-lg shadow-xl p-2">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-2 bg-indigo-600">
                      <i className="fas fa-tasks fa-2x fa-inverse" />
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h2 className="font-bold uppercase text-gray-600">To Do List</h2>
                    <p className="font-bold text-3xl">7 tasks</p>
                  </div>
                </div>
              </div>
              {/*/Metric Card*/}
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-4 px-8">
              {/*Metric Card*/}
              <div className="bg-gradient-to-b from-red-200 to-red-100 border-b-4 border-red-500 rounded-lg shadow-xl p-2">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-2 bg-red-600">
                      <i className="fas fa-inbox fa-2x fa-inverse" />
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h2 className="font-bold uppercase text-gray-600">Issues</h2>
                    <p className="font-bold text-3xl">
                      3{" "}
                      <span className="text-red-500">
                        <i className="fas fa-caret-up" />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              {/*/Metric Card*/}
            </div>
          </div>



          {/* filtros */}
          <div className={` ${filtro ? "h-52" : "h-12 overflow-hidden"} transition-all duration-500 mb-4 bg-white p-4 rounded-lg shadow-md`}>

            <button className='border-b-2 w-full text-left text-lg font-medium ' onClick={() => setFiltro(!filtro)}>Filtros</button>

            <div className='flex gap-8 my-3'>

              <label className=" flex flex-col " >
                <span className='font-semibold'>Fecha de inicio</span>
                <input max={datos.fin} className='p-0 px-2 rounded-md w-52 h-8' type="date" value={datos.inicio} onChange={(e) => setDatos({ ...datos, inicio: e.target.value })} />
              </label>

              <label className="flex flex-col " >
                <span className='font-semibold'>Fecha de fin</span>

                <input min={datos.inicio} className='p-0 px-2 rounded-md w-52 h-8' type="date" value={datos.fin} onChange={(e) => setDatos({ ...datos, fin: e.target.value })} />
              </label>

              <label className="flex  flex-col"  >

                <span className='font-semibold'>Cliente:</span>

                <select
                  required
                  value={datos.cliente}
                  onChange={(e) => setDatos({ ...datos, cliente: e.target.value })}
                  name="cliente"
                  id="cliente"
                  className="p-0 px-2 pe-6 w-fit min-w-[13rem] rounded-md  h-8"
                >
                  <option value={''} select>Todos</option>
                  {clientes.map((cliente) => (
                    <option key={cliente.id} value={cliente.name}>
                      {cliente.name}
                    </option>
                  ))}
                </select>
              </label>


            </div>

            {reportes == 0 && (
              <div className='flex gap-8'>
                <label className="flex  flex-col "  >
                  <span className='font-semibold'> Tipo Solicitudes:</span>

                  <select
                    required
                    value={datos.tipo}
                    onChange={(e) => setDatos({ ...datos, tipo: parseInt(e.target.value) })}
                    name="tipo_id"
                    id="tipo_id"
                    className="p-0 px-2 w-fit rounded-md h-8"
                  >
                    <option value={0} select>Todas</option>
                    {tipo_solicitudes.map((solicitud) => (
                      <option key={solicitud.id} value={solicitud.id}>
                        {solicitud.nombre}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex  flex-col"  >

                  <span className='font-semibold'>Estados:</span>

                  <select
                    required
                    value={datos.estado}
                    onChange={(e) => setDatos({ ...datos, estado: parseInt(e.target.value) })}
                    name="estado"
                    id="estado"
                    className="p-0 px-2 pe-6 w-fit min-w-[13rem] rounded-md  h-8"
                  >
                    <option value={''} select>Todos</option>
                    {estados.map((estado) => (
                      <option key={estado.id} value={estado.id}>
                        {estado.nombre}
                      </option>
                    ))}
                  </select>
                </label>


              </div>

            )}

          </div>

          <div className='flex flex-wrap w-full gap-4'>

            {/* Grafio por tipo */}
            <div className=' mb-4 w-[49%] p-4 rounded-lg shadow-md bg-white'>

              <div id='chart_tipo' className=' w-full border-b-2 border-gray-300 '>
              </div>
              <div className='flex'>


                <button className='mt-1 whitespace-nowrap' onClick={() => setShowPercentages(!showPercentages)}>
                  Mostrar {showPercentages ? 'Valores Numéricos' : 'Porcentajes'}
                </button>

              </div>

            </div>

            {/* Grafio por status */}
            <div className=' mb-4 w-[49%] p-4 rounded-lg shadow-md bg-white'>

              <div id='chart_status' className='w-full border-b-2 border-gray-300 '>
              </div>

              <button className='mt-1' onClick={() => setShowPercentages(!showPercentages)}>
                Mostrar {showPercentages ? 'Valores Numéricos' : 'Porcentajes'}
              </button>
            </div>

            {/* Grafio por cliente */}
            <div className=' mb-4 w-[49%] p-4 rounded-lg shadow-md bg-white'>

              <div id='chart_cliente' className='w-full border-b-2 border-gray-300 '>
              </div>

              <button className='mt-1' onClick={() => setShowPercentages(!showPercentages)}>
                Mostrar {showPercentages ? 'Valores Numéricos' : 'Porcentajes'}
              </button>
            </div>


          </div>

        </div>
      </>
    </AuthenticatedLayout>
  );
}
