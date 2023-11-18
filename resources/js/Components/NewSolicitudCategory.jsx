import React from 'react'
import Modal from './Modal'
import { useForm } from '@inertiajs/inertia-react';


export function NewSolicitudCategory({ submit, hideModal, show }) {
    const categorySolicitud = [
        { id: 1, category: 'Servicios' },
        { id: 2, category: 'Certificacioens' },
        { id: 3, category: 'Estados Financieros' },
        { id: 4, category: 'Reportes Generales' }
    ]
    const { data, setData, post, reset } = useForm({
        id: '',
        name: '',
    });

    function submit(e) {
        e.preventDefault();
        console.log(data);
    }

    return (

        <Modal show={show} >
            <h1 className='w-100% py-4 text-lg text-center'>Nuevo Tipo de Solicitud</h1>'
            
            <form onSubmit={submit} className="flex flex-col gap-4 text-textgray">
                <div className='flex gap-8'>
                    <div className="flex flex-col w-3/5">
                        <label htmlFor="name" className="text-xs">
                            Nombre de la Solicitud
                        </label>
                        <input  type="text" name="name" id="name" required="true" className="h-9 rounded-md w-full outline-none"
                            placeholder='Diseño Web'
                            onChange={(e) => setData('name', e.target.value)}
                        />
                    </div>



                    <div className="flex flex-col w-2/5">
                        <label htmlFor="email" className="text-xs">
                            Categoria de la solicitud
                        </label>

                        <select name="rol_id" id="rol_id" className="w-full p-1 bg-white rounded-md outline-none"
                            required
                            onChange={(e) => setData('id', e.target.value)}
                        >
                             

                            {categorySolicitud.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.category}
                                </option>

                            ))}
                        </select>
                    </div>
                </div>

                <div className='flex justify-end'>
                    <button type='button' className="border py-1 w-36 rounded-xl bg-red-500 hover:bg-red-400 text-offwhite q mr-5 mt-5"
                        onClick={hideModal}
                    >
                        Cancelar
                    </button>

                    <button type='submit' onClick={submit}
                        className="border py-1 w-36 rounded-xl bg-blue-500 hover:bg-blue-600 text-offwhite self-end justify-end mr-5 mt-5">
                        Guardar
                    </button>
                </div>

            </form>

        </Modal>
    )
}
