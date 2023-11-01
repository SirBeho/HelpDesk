import { format } from "date-fns";

export default function Reporte({ solicitudes_f, rangoFecha }) {
  return (
    <div className="mx-10 bg-white p-5 rounded shadow-lg">
      <div className="text-center mb-5">
        <img src="./assets/colorfullLogo.png" alt="Logo" className="w-28" />
        <h1 className="text-3xl font-semibold mt-3">
          Reporte de Solicitudes por rango de Fecha
        </h1>
        <div className="flex justify-center mt-2 text-lg text-gray-600">
          <span>Desde: {rangoFecha?.inicio || "Inicio"}</span>
          <span className="mx-2">-</span>
          <span>Hasta: {rangoFecha?.fin || "Actual"}</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        {rangoFecha?.tipo ? (<span className="block mb-3">Tipo de solicitud: {solicitudes_f[0].tipo.nombre}</span>) : null }
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-200 text-left text-base font-semibold text-gray-600 uppercase tracking-wider">
                # Solicitud
              </th>
              <th className="px-6 py-3 bg-gray-200 text-left text-base font-semibold text-gray-600 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 bg-gray-200 text-left text-base font-semibold text-gray-600 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 bg-gray-200 text-left text-base font-semibold text-gray-600 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 bg-gray-200 text-left text-base font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {solicitudes_f &&
              solicitudes_f.map((user, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-gray-100" : ""}>
                  <td className="px-6 py-4 whitespace-no-wrap">{user.numero}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{user.tipo.nombre}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{user.user.name}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {format(new Date(user.created_at), "dd/MM/yyyy hh:mm:ss a")}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">{user.status.nombre}</td>
                </tr>
              ))
              }

           <tr className="bg-gray-200">
              <td colSpan="6" className="px-6 py-4 font-semibold text-gray-800">
                Total de Solicitudes: {solicitudes_f?.length || 0}
              </td>
            </tr>
              
          </tbody>
        </table>
      </div>
    </div>
  );
}
