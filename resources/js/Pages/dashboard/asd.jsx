import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useEffect, useRef } from 'react';
import { Head } from "@inertiajs/react";
import jsPDF from 'jspdf';
import { format } from "date-fns";
import { createRoot } from 'react-dom/client';
import ApexCharts from 'apexcharts';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default function documentos({ auth, tipo_solicitudes, clientes, estados, solicitud }) {

  const solicitudes = solicitud.filter(solicitud => solicitud.tipo_id > 2);

  console.log(solicitudes)
  const documentos = [];
  solicitudes.forEach((solicitud) => {
    if (solicitud.files && solicitud.files.length > 0) {
      documentos.push(...solicitud.files);
    }
  });
  const [documentos_f, setDocumentos_f] = useState(documentos);
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

  useEffect(() => {

    filterDataByDate()
  }, [datos])

  const chartContainer = useRef(null);
  const [showPercentages, setShowPercentages] = useState(true);
  const chartInstance = useRef(null);
  const chartEstadoRef = useRef(null);
  

  

  useEffect(() => {

    const tipos = {};
    solicitudes_f.forEach((solicitud) => {
      if (tipos[solicitud.tipo.nombre]) {
        tipos[solicitud.tipo.nombre]++;
      } else {
        tipos[solicitud.tipo.nombre] = 1;
      }
    });

    if (chartInstance.current !== null) {
      chartInstance.current.destroy();
    }

    if (chartContainer && chartContainer.current) {
      const ctx = chartContainer.current.getContext('2d');

      const chartData = {
        labels: Object.keys(tipos),
        datasets: [{
          label: 'Solicitudes',
          data: Object.values(tipos),
         
          borderWidth: 3,
          backgroundColor: [
            'rgba(0, 99, 132, 0.6)',
            'rgba(30, 99, 132, 0.6)',
            'rgba(60, 99, 132, 0.6)',
            'rgba(90, 99, 132, 0.6)',
            'rgba(120, 99, 132, 0.6)',
            'rgba(150, 99, 132, 0.6)',
            'rgba(180, 99, 132, 0.6)',
            'rgba(210, 99, 132, 0.6)',
            'rgba(240, 99, 132, 0.6)'
          ],

          
        }],
      };

      const options = {
        onClick: (e) => {
          const canvasPosition = Chart.helpers.getRelativePosition(e, chartInstance.current);

          // Substitute the appropriate scale IDs
          const dataX = chartInstance.current.scales.x.getValueForPixel(canvasPosition.x);
          const dataY = chartInstance.current.scales.y.getValueForPixel(canvasPosition.y);
          console.log(dataX,dataY)
      },
        

        
        animation: {
         

          onComplete: function () {
            var a = document.createElement('a');
            a.href = chartInstance.current.toBase64Image();
            a.download = 'my_file_name.png';
            //a.click();
          },
        },
        plugins: {
          legend: {
            // align:'start',
            position: 'bottom',
            // boxWidth : "200",
            labels: {
              usePointStyle: true,
              textAlign: 'right'
            },
          },
          datalabels: {
            display: showPercentages ? 'auto' : 'value',
            color: 'white',
            anchor: 'end',
            align: 'start',
            formatter: (value, context) => {
              return showPercentages ? ((value / context.dataset.data.reduce((a, b) => a + b, 0)) * 100).toFixed(1) + '%' : value;
            },
          },
        },
           
      };

      chartInstance.current = new Chart(ctx, {
        plugins: [ChartDataLabels],
        type: 'pie',
        data: chartData,
        options: options,
      });
    }
   
}, [documentos_f,showPercentages]);


  useEffect(() => {

    const tipos = {};
    solicitudes_f.forEach((solicitud) => {
      if (tipos[solicitud.tipo.nombre]) {
        tipos[solicitud.tipo.nombre]++;
      } else {
        tipos[solicitud.tipo.nombre] = 1;
      }
    });

    // Generar opciones del gráfico
  /*   const getBarChartOptions = () => {
      return {
        series: [{
          data: Object.values(tipos),

        }],
        chart: {
          type: 'bar',
          height: 420,
          width: '100%',
          toolbar: {
            show: true,
          },
          backgroundColor: ["rgba(255, 99, 132)", "rgba(255, 159, 64)", "rgba(255, 205, 86)", "rgba(75, 192, 192)", "rgba(54, 162, 235)", "rgba(153, 102, 255)", "rgba(201, 203, 207)"],
          colors: ["rgba(255, 99, 132)", "rgba(255, 159, 64)", "rgba(255, 205, 86)", "rgba(75, 192, 192)", "rgba(54, 162, 235)", "rgba(153, 102, 255)", "rgba(201, 203, 207)"],
          borderColor: ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"],
          borderWidth: 1
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '85%',
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: true,
        },
        xaxis: {
          categories: Object.keys(tipos),
        },
        legend: {
          position: 'bottom',
          fontFamily: 'Inter, sans-serif',
        },

      };
    };

    // Renderizar el gráfico de barras usando ApexCharts
    if (chartRef.current === null) {
      chartRef.current = new ApexCharts(document.getElementById('pie-chart'), getBarChartOptions());
      chartRef.current.render();
    } else {
      chartRef.current.updateOptions(getBarChartOptions());
    } */

    const estadosSolicitudes = {};
    solicitudes_f.forEach((solicitud) => {
      if (estadosSolicitudes[solicitud.status.nombre]) {
        estadosSolicitudes[solicitud.status.nombre]++;
      } else {
        estadosSolicitudes[solicitud.status.nombre] = 1;
      }
    });

    const getEstadoChartOptions = () => {
      return {
        series: Object.values(tipos),
        labels: Object.keys(tipos),
        chart: {
          toolbar: {
            show: true,
          },
          type: 'bar',
          height: 420,
          width: '100%',
        },
       /*  plotOptions: {
          pie: {
            donut: {
              size: '75%',
            },
          },
        }, */
        legend: {
          position: "bottom",
          fontFamily: "Inter, sans-serif",
        },
        dataLabels: {
          enabled: true,
        },
      };
    };

    if (chartEstadoRef.current === null) {
      chartEstadoRef.current = new ApexCharts(document.getElementById('pie-chart-estado'), getEstadoChartOptions());
      chartEstadoRef.current.render();
    } else {
      chartEstadoRef.current.updateOptions(getEstadoChartOptions());
    }

    

    const chart = new ApexCharts(document.querySelector(".chart"), options);
    chart.render();







    var option = {
      colors: ["#f44336", "#2196f3"],
      series: [
        {
          name: "Income",

          data: ["1420", "1620", "1820", "1420", "1650", "2120"],
        },

      ],
      chart: {
        sparkline: {
          enabled: false,
        },
        type: "bar",
        width: "100%",
        height: 400,
        toolbar: {
          show: false,
        }
      },
      fill: {
        opacity: 1,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "100%",
          borderRadiusApplication: "end",
          borderRadius: 6,
          dataLabels: {
            position: "top",
          },
        },
      },
      legend: {
        show: true,
        position: "bottom",
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        shared: true,
        intersect: false,
        formatter: function (value) {
          return "$" + value
        }
      },
      xaxis: {
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
          },
          formatter: function (value) {
            return "$" + value
          }
        },
        categories: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
          }
        }
      },
      grid: {
        show: true,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -20
        },
      },
      fill: {
        opacity: 1,
      }
    }

    if (document.getElementById("bar-chart") && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById("bar-chart"), option);
      chart.render();
    } */


    /* new Chart(document.getElementById("chartjs-1"), {
      "type": "doughnut",
      "data": {
          "labels": ["January", "February", "March", "April", "May", "June", "July"],
          "datasets": [{
              "label": "Likes",
              "data": [65, 59, 80, 81, 56, 55, 40],
              "fill": false,
              "backgroundColor": ["rgba(255, 99, 132)", "rgba(255, 159, 64)", "rgba(255, 205, 86)", "rgba(75, 192, 192)", "rgba(54, 162, 235)", "rgba(153, 102, 255)", "rgba(201, 203, 207)"],
              "borderColor": ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"],
              "borderWidth": 1
          }]
      },
      "options": {
          "scales": {
              "yAxes": [{
                  "ticks": {
                      "beginAtZero": true
                  }
              }]
          }
      }
  }); */


  }, [solicitudes_f]);


  /* useEffect(() => {
    console.log("h0la1")
    const getChartOptions = () => {
      console.log("h0la")
        return {
          series: [52.8, 26.8, 20.4],
          colors: ["#1C64F2", "#16BDCA", "#9061F9"],
          chart: {
            height: 420,
            width: "100%",
            type: "pie",
          },
          stroke: {
            colors: ["white"],
            lineCap: "",
          },
          plotOptions: {
            pie: {
              labels: {
                show: true,
              },
              size: "100%",
              dataLabels: {
                offset: -25
              }
            },
          },
          labels: ["Direct", "Organic search", "Referrals"],
          dataLabels: {
            enabled: true,
            style: {
              fontFamily: "Inter, sans-serif",
            },
          },
          legend: {
            position: "bottom",
            fontFamily: "Inter, sans-serif",
          },
          yaxis: {
            labels: {
              formatter: function (value) {
                return value + "%"
              },
            },
          },
          xaxis: {
            labels: {
              formatter: function (value) {
                return value  + "%"
              },
            },
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
          },
        }
      }

        const chart = new ApexCharts(document.getElementById("pie-chart"), getChartOptions());
        chart.render();
      

   
  }, []) */




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

  return (
    <AuthenticatedLayout
      countNotificaciones={auth.countNotificaciones}
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
      <>
        <Head title="Dashboard" />
        <div className='mx-10 mt-3'>

          {/* filtros */}
          <div className='mb-4 bg-white p-4 rounded-lg shadow-md'>


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
            {/* Grafico solicitues por tipo */}
           {/*  <div id='dasshboard' className='mb-4  w-[49%] bg-white p-4 rounded-lg shadow-md'>

              <div className=" w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
                <div className="flex justify-between items-start w-full ">
                  <div className="flex-col items-center">
                    <div className="flex items-center mb-1">
                      <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">
                        Solicitudes por tipo
                      </h5>
                    </div>

                    <button
                      id="dateRangeButton"
                      data-dropdown-toggle="dateRangeDropdown"
                      data-dropdown-ignore-click-outside-class="datepicker"
                      type="button"
                      className="inline-flex items-center text-blue-700 dark:text-blue-600 font-medium hover:underline"
                    >
                      {
                        (datos?.inicio || datos?.fin) ?
                          `${datos?.inicio ? format(new Date(datos?.inicio + ' 00:00:00'), "dd/MM/yyyy") : "Inicio"} - ${datos?.fin ? format(new Date(datos?.fin + ' 23:59:59'), "dd/MM/yyyy") : "Actual"}`
                          : null
                      }

                    </button>
                    <div
                      id="dateRangeDropdown"
                      className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-80 lg:w-96 dark:bg-gray-700 dark:divide-gray-600"
                    >
                      <div className="p-3" aria-labelledby="dateRangeButton">
                        <div
                          date-rangepicker=""
                          datepicker-autohide=""
                          className="flex items-center"
                        >
                          <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                              <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                              </svg>
                            </div>
                            <input
                              name="start"
                              type="text"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Start date"
                            />
                          </div>
                          <span className="mx-2 text-gray-500 dark:text-gray-400">to</span>
                          <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                              <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                              </svg>
                            </div>
                            <input
                              name="end"
                              type="text"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="End date"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
               
                <div className="" id="pie-chart" />
                <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">

                  <div className="flex justify-between items-center pt-5">
                    
                    <button
                      id="dropdownDefaultButton"
                      data-dropdown-toggle="lastDaysdropdown"
                      data-dropdown-placement="bottom"
                      className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
                      type="button"
                    >
                      Last 7 days
                      <svg
                        className="w-2.5 m-2.5 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>
                    <div
                      id="lastDaysdropdown"
                      className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                    >
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDefaultButton"
                      >
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Yesterday
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Today
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Last 7 days
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Last 30 days
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Last 90 days
                          </a>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>
              </div>

            </div> */}

            {/* Grafio por estados */}
            <div className="  w-[49%] bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">

              <div className="w-full p-6">
                {/*Graph Card*/}
                <div className="bg-white border-transparent rounded-lg shadow-xl">
               
                  <div className="p-5">
                  <div className="flex items-center mb-1">
                      <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">
                        Solicitudes por tipo
                      </h5>
                    </div>
                    <canvas
                      ref={chartContainer}
                      id="chartjs-1"
                      className="chartjs"
                      width="undefined"
                      height="undefined"
                    />
                    <button onClick={()=> setShowPercentages(!showPercentages)}>
                    Mostrar {showPercentages ? 'Valores Numéricos' : 'Porcentajes'}
                  </button>
                  </div>
                </div>
                {/*/Graph Card*/}
              </div>
            </div>

            {/* Grafio por estados */}
            <div id='dasshboard' className='mb-4 w-[49%] bg-white p-4 rounded-lg shadow-md'>

              <div className=" w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
                <div className="flex justify-between items-start w-full ">
                  <div className="flex-col items-center">
                    <div className="flex items-center mb-1">
                      <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">
                        Solicitudes por tipo
                      </h5>
                    </div>

                    <button
                      id="dateRangeButton"
                      data-dropdown-toggle="dateRangeDropdown"
                      data-dropdown-ignore-click-outside-class="datepicker"
                      type="button"
                      className="inline-flex items-center text-blue-700 dark:text-blue-600 font-medium hover:underline"
                    >
                      {
                        (datos?.inicio || datos?.fin) ?
                          `${datos?.inicio ? format(new Date(datos?.inicio + ' 00:00:00'), "dd/MM/yyyy") : "Inicio"} - ${datos?.fin ? format(new Date(datos?.fin + ' 23:59:59'), "dd/MM/yyyy") : "Actual"}`
                          : null
                      }

                    </button>
                    <div
                      id="dateRangeDropdown"
                      className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-80 lg:w-96 dark:bg-gray-700 dark:divide-gray-600"
                    >
                      <div className="p-3" aria-labelledby="dateRangeButton">
                        <div
                          date-rangepicker=""
                          datepicker-autohide=""
                          className="flex items-center"
                        >
                          <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                              <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                              </svg>
                            </div>
                            <input
                              name="start"
                              type="text"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Start date"
                            />
                          </div>
                          <span className="mx-2 text-gray-500 dark:text-gray-400">to</span>
                          <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                              <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                              </svg>
                            </div>
                            <input
                              name="end"
                              type="text"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="End date"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                {/* Line Chart */}
                <div className="" id="pie-chart-estado" />
                <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">

                  <div className="flex justify-between items-center pt-5">
                    {/* Button */}
                    <button
                      id="dropdownDefaultButton"
                      data-dropdown-toggle="lastDaysdropdown"
                      data-dropdown-placement="bottom"
                      className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
                      type="button"
                    >
                      Last 7 days
                      <svg
                        className="w-2.5 m-2.5 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>
                    <div
                      id="lastDaysdropdown"
                      className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                    >
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDefaultButton"
                      >
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Yesterday
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Today
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Last 7 days
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Last 30 days
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Last 90 days
                          </a>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>
              </div>




            </div>

            {/* Grafio por estados */}
            <div id='chart' className='chart mb-4 w-[49%]  bg-white p-4 rounded-lg shadow-md'>
            </div>





          </div>

        </div>
      </>
    </AuthenticatedLayout>
  );
}


