import { format } from "date-fns";

export default function Reporte({ documentos_f, rangoFecha }) {


  return (
    <div className="mx-10 bg-white p-5 rounded shadow-lg">
      <div className="text-center mb-5">
        <img src="./assets/colorfullLogo.png" alt="Logo" className="w-28" />
        <h1 className="text-2xl font-semibold mt-3">
          Reporte de documentos por rango de fecha
        </h1>
        <div className="flex justify-center mt-2 text-sm text-gray-600">
          <span>Desde: {rangoFecha?.inicio || "Inicio"}</span>
          <span className="mx-2">-</span>
          <span>Hasta: {rangoFecha?.fin || "Actual"}</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>

              <th className="px-5 py-3 border-b-2 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-5 py-3 border-b-2 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-5 py-3 border-b-2 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Tipo Documento
              </th>
              <th className="px-5 py-3 border-b-2 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Usuario
              </th>

              <th className="px-5 py-3 border-b-2 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Fecha
              </th>
            </tr>
          </thead>
          <tbody>
            {documentos_f &&
              documentos_f.map((documento, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-gray-100" : ""}>
                  <td className="px-6 py-4 whitespace-no-wrap">{documento.id}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{documento.nombre}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{documento.extencion}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{documento.user.name}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                  {documento.created_at && format(new Date(documento.created_at), "dd/MM/yyyy hh:mm:ss a")}
                  </td>
                </tr>
              ))
            }

            <tr className="bg-gray-200">
              <td colSpan="6" className="px-6 py-4 font-semibold text-gray-800">
                Total de documentos: {documentos_f?.length || 0}
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
}
