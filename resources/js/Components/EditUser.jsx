import React, { useState } from 'react'

export default function EditUser({ roles, changeRol, hideModal, update, selectedUser, setData }) {

    return (
        <>
            <form className="flex flex-col gap-4 text-textgray">
                <div className='flex gap-8'>

                    <h2>Nombre de Usuario</h2>

                </div>

                <div className='flex gap-8'>
                    <div className="flex flex-col w-2/4">
                        <label htmlFor="rol_id" className="text-xs">
                            Asignar Rol
                        </label>

                        <select name="rol_id" id="rol_id" className="w-full p-1 bg-white rounded-md outline-none"
                            defaultValue={selectedUser.rol_id}
                            onChange={changeRol}
                        >
                            <option value="">
                                Seleccione Rol
                            </option>
                            {roles.map(rol => (
                                <option value={rol.id} key={rol.id}>
                                    {rol.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col w-2/4">
                        <label htmlFor="status" className="text-xs">
                            Seleccionar Status
                        </label>

                        <select name="status" id="status" className="w-full p-1 bg-white rounded-md outline-none"
                            defaultValue={selectedUser.status}
                            onChange={(e) => setData('status', e.target.value)}
                        >
                            <option value="">
                                Selecionar Estado
                            </option>
                            <option value={1}>
                                Activo
                            </option>

                            <option value={0}>
                                Inactivo
                            </option>
                        </select>
                    </div>
                </div>
            </form>

            <div className='flex justify-end'>
                <button className="border py-1 w-36 rounded-xl bg-red-500 hover:bg-red-400 text-offwhite q mr-5 mt-5"
                    onClick={hideModal}
                >
                    Cancelar
                </button>

                <button onClick={update} className="border py-1 w-36 rounded-xl bg-blue-500 hover:bg-blue-600 text-offwhite self-end justify-end mr-5 mt-5">
                    Registrar
                </button>
            </div>
        </>
    )
}
