
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';

export default function subir({auth,file}) {


    const today = new Date();
  const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`; // Formatea la fecha como dd/mm/yyyy


    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };


    console.log(auth)

    return (

        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Formulario subir doumentos
                </h2>}
        >
            <Head title="Form" />


            <div className="w-[calc(100%-3rem)] h-[calc(100%-3rem)] bg-[#f2f2f2] m-6 rounded-md flex flex-col gap-10 p-10">

                <form className="flex flex-col w-2/5 gap-4 text-textgray">

                    <select name="services" id="services" className="w-full p-3 bg-white rounded-md outline-none">
                        <option>
                            Seleccione servicio
                        </option>
                    </select>

                        <div>
                            <label htmlFor="email" className="text-sm text-darkblue font-medium">Correo</label>
                            <input type="email" id="email" name="email" value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="border-2 w-80 h-9 outline-none mb-6 block" />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                    <div className="flex ">
                        <label htmlFor="rnc" className="text-xs flex flex-col ">
                            Número solicitud
                            <input disabled type="text" name="rnc" id="rnc" value="Nueva Solicitud" className="h-9 rounded-md w-3/5 outline-none px-2" />
                        </label>
                        <label htmlFor="rnc" className="text-xs flex flex-col ">
                             Fecha
                            <input disabled type="text" name="rnc" id="rnc" value={formattedDate} className="h-9 rounded-md w-3/5 outline-none px-2" />
                        </label>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-xs">
                            Nombre solicitante
                        </label>
                        <input type="text" name="name" id="name" className="h-9 rounded-md w-4/5 outline-none px-2" />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="phone" className="text-xs">
                            Número contacto
                        </label>
                        <input type="text" name="phone" id="phone" className="h-9 rounded-md w-3/5 outline-none px-2" />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-xs">
                            Correo electrónico
                        </label>
                        <input type="text" name="email" id="email" className="h-9 rounded-md w-4/5 outline-none px-2" />
                    </div>

                    <div className="flex flex-col">

                        <label htmlFor="coment" className="text-xs">
                            Comentarios
                        </label>

                        <textarea placeholder="Escribe tu comentario" name="coment" id="coment" className="w-full resize-none h-44 p-3 outline-none "></textarea>
                    </div>


                    <button className="border py-1 w-36 rounded-xl bg-gray-300 hover:bg-gray-200 text-textgray self-end justify-end mr-5 mt-5">
                        Enviar solicitud
                    </button>
                </form>

            </div>

        </AuthenticatedLayout>
    )

}
