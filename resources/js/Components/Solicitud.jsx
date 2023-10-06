import React from 'react'
import { format } from 'date-fns';


export const Solicitud = ({data,click,open}) => {
   
    

    const formattedDate = format(new Date(data.created_at),'dd/MM/yyyy hh:mm:ss a')
    const tipo = ["bg-blue-500","bg-yellow-500","bg-cyan-500","bg-blue-800"];
    const status = ["bg-lime-100","bg-orange-100","bg-orange-100","bg-green-100","bg-red-100","bg-red-100"]

    return (
        
        <li onClick={click} className={`flex w-80 min-h-24  ${status[data.status_id-1]} ${open == data.id ? "border-2 scale-90": "" } duration-300 rounded-md cursor-pointer`}>
            {/* <span className={`h-full w-2 ${conf? 'bg-red-600': ' bg-blue-500'} rounded-l-lg`}> */}
            <span className={`h-full w-2 ${tipo[data.tipo.tipo-1]} rounded-l-lg`}>

            </span>

            <div className="flex flex-col gap-2 p-2 text-textgray w-full">

                <span>
                    Solicitud: {data.numero}
                </span>

                <p className="font-medium text-sm">
                {data.tipo.nombre}
                {data.tipo_id == 1 ? " "+data.comentario : ""}
                </p>
                    
                <div className='flex justify-between pe-5 '>
                    <span className="text-xs">
                        {formattedDate}
                    </span>
                    <span className="text-xs">
                        {data.status.nombre}
                    </span>
                </div>
                
            </div>
        </li>
    )
}
