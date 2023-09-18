import { Notifications } from "@/components/notifications";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from "@inertiajs/react";
export default function Notificaciones({ auth }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Notificaciones</h2>}
        >
            <Head title="Notificaciones" />

            <div className="w-[calc(100%-3rem)] h-[calc(100%-3rem)] bg-[#f2f2f2] m-6 rounded-md overflow-y-auto">

                <ul className="flex flex-col gap-3 p-6">

                    <Notifications
                        text={'confidencia'}
                        conf={false}
                    />
                    <Notifications
                        text={'confidencia'}
                        conf={false}
                    />
                    <Notifications
                        text={'confidencia'}
                        conf={true}
                    />
                    <Notifications
                        text={'confidencia'}
                        conf={false}
                    />

                </ul>

            </div>


        </AuthenticatedLayout>
    )

}
