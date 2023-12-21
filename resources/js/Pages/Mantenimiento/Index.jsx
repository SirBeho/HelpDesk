
import { DataTable } from '@/Components/DataTable';
import DeleteUser from '@/Components/DeleteUser';
import { EditTipotask } from '@/Components/EditTipotask';
import Empresa from '@/Components/Empresa';
import Loading from '@/Components/Loading';
import Modal from '@/Components/Modal';
import { NewTipotask } from '@/Components/NewTipotask';
import { SuccessAlert } from '@/Components/SuccessAlert';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from 'react';



export default function Mantenimiento({ auth, tipotaskes, msj, empresa }) {
  const [currentData, setCurrentData] = useState(tipotaskes);
  const [modalDestroy, setModalDestroy] = useState(false)
  const [newTipoSilicitud, setNewTipoSilicitud] = useState(false)
  const [editTipoSilicitud, setEditTipoSilicitud] = useState(false)
  const [tipotaskData, setTipotaskData] = useState();
  const [succesAlert, setSuccesAlert] = useState(msj?.success);
  const [loading, setLoading] = useState(false)

  const { post } = useForm({});

  useEffect(() => {

    setSuccesAlert(msj?.success != undefined);

  }, [msj]);

  useEffect(() => {
    if (tipotaskes) {
      const dataList = tipotaskes.map(tipotask => {

        delete tipotask.created_at;
        delete tipotask.updated_at;


        if (tipotask.tipo === 1) {
          tipotask['categoria'] = 'Servicios';

          return tipotask;
        }
        if (tipotask.tipo === 2) {
          tipotask['categoria'] = 'Certificaciones';

          return tipotask;
        }
        if (tipotask.tipo === 3) {
          tipotask['categoria'] = 'Estados Financieros';

          return tipotask;
        }
        if (tipotask.tipo === 4) {
          tipotask['categoria'] = 'Reportes Generales';

          return tipotask;
        }

      })
      setCurrentData(dataList);
    }
  }, [tipotaskes]);

  const tbStructure = {
    'Tipo de task': 'nombre',
    'Categoria': 'categoria',
    'Status': 'status'
  }

  function getTipotaskData(id) {
    const data = tipotaskes.filter(tipotask => tipotask.id === id);
    setTipotaskData(data[0]);
  }

  const deleteModal = (id) => {
    getTipotaskData(id)
    setModalDestroy(true)

  }

  const editModal = (id) => {
    getTipotaskData(id)
    setEditTipoSilicitud(true)
  }

  function destroy(e) {
    e.preventDefault();
    setModalDestroy(false)
    setLoading(true);

    post(route('tipotask.delete', tipotaskData.id), {
      onSuccess: () => {
        setLoading(false);
      }
    });
  }

  return (

    <AuthenticatedLayout
      countNotificaciones={auth.countNotificaciones}
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Mantenimiento</h2>}
    >
      <Head title="Mantenimiento" />


      <div className="container mx-auto px-4 sm:px-8">
       <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500   mt-8 ">
             <li className="me-2">
              <Link href={route('empresa.index')}className={`inline-block p-4 rounded-t-lg ${empresa ? 'activeTab': 'NoactiveTab'}`}>Empresa</Link>
            </li>
            <li className="me-2">
              <Link href={route('tipotask.index')} aria-current="page" className={` inline-block p-4 rounded-t-lg    ${tipotaskes ? 'activeTab' : 'NoactiveTab'}`}>taskes</Link>
            </li>

            
          </ul>
        <div className="mb-8 bg-gray-300 rounded-xl rounded-tl-none  p-2">

          {currentData &&
            <DataTable
              data={currentData}
              action={true}
              tbStructure={tbStructure}
              onNew={() => setNewTipoSilicitud(true)}
              onUpdate={editModal}
              onDelete={deleteModal}

            />
          }

          {newTipoSilicitud &&
            <NewTipotask
              show={newTipoSilicitud}
              hideModal={() => setNewTipoSilicitud(false)}
              setLoading={setLoading}
            />
          }

          {editTipoSilicitud &&
            <EditTipotask
              show={editTipoSilicitud}
              tipotaskData={tipotaskData}
              hideModal={() => setEditTipoSilicitud(false)}
              setLoading={setLoading}
            />
          }

          <SuccessAlert
            hideModal={() => setSuccesAlert(false)}
            show={succesAlert}
            msj={msj}
          />
          {loading &&
            <Modal maxWidth='sm' show={loading}>
              <Loading />
            </Modal>
          }

          <Modal show={modalDestroy}>
            <DeleteUser
              hideModal={() => setModalDestroy(false)}
              destroy={destroy}
              selectedUser={tipotaskData}
            />

          </Modal>
          
          {empresa && 
            <Empresa
              empresa={empresa}
              setLoading={setLoading}
            />

          }

        </div>

      </div>

    </AuthenticatedLayout>
  )

}
