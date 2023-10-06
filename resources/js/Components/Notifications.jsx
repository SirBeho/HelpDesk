import { Link } from '@inertiajs/react'
import React from 'react'

export const Notifications = ({
    conf,
    emisor,
    mensaje,
    selectNotification,
    date, }) => {

    return (
        <li onClick={selectNotification} className={`flex w-80 h-24 cursor-pointer  ${conf ? 'bg-orange-100' : 'bg-lime-100'} rounded-md`} >
            <span className={`h-full w-2 ${conf ? 'bg-red-600' : ' bg-blue-500'} rounded-l-lg`}>

            </span>

            <div className="flex flex-col gap-2 p-2 text-textgray">

                <span>
                    {emisor}
                </span>

                <p className="font-medium text-sm">
                    {mensaje}
                </p>

                <span className="text-xs">
                    18/05/23 03:10:28 p.m
                </span>

            </div>

        </li>
    )
}
