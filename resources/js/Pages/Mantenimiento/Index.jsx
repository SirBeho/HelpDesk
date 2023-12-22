
import { DataTable } from '@/Components/DataTable';
import DeleteUser from '@/Components/DeleteUser';
import { EditTaskType } from '@/Components/EditTaskType';
import Empresa from '@/Components/Empresa';
import Loading from '@/Components/Loading';
import Modal from '@/Components/Modal';
import { NewTaskType } from '@/Components/NewTaskType';
import { SuccessAlert } from '@/Components/SuccessAlert';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from 'react';



export default function Mantenimiento({ auth, Tasktypes, msj, empresa }) {
  const [currentData, setCurrentData] = useState(Tasktypes);
  const [modalDestroy, setModalDestroy] = useState(false)
  const [newTipoSilicitud, setNewTipoSilicitud] = useState(false)
  const [editTipoSilicitud, setEditTipoSilicitud] = useState(false)
  const [TaskTypeData, setTaskTypeData] = useState();
  const [succesAlert, setSuccesAlert] = useState(msj?.success);
  const [loading, setLoading] = useState(false)

  const { post } = useForm({});

  useEffect(() => {

    setSuccesAlert(msj?.success != undefined);

  }, [msj]);

  useEffect(() => {
    if (Tasktypes) {
      const dataList = Tasktypes.map(TaskType => {

        delete TaskType.created_at;
        delete TaskType.updated_at;


        if (TaskType.tipo === 1) {
          TaskType['categoria'] = 'Servicios';

          return TaskType;
        }
        if (TaskType.tipo === 2) {
          TaskType['categoria'] = 'Certificaciones';

          return TaskType;
        }
        if (TaskType.tipo === 3) {
          TaskType['categoria'] = 'Estados Financieros';

          return TaskType;
        }
        if (TaskType.tipo === 4) {
          TaskType['categoria'] = 'Reportes Generales';

          return TaskType;
        }

      })
      setCurrentData(dataList);
    }
  }, [Tasktypes]);

  const tbStructure = {
    'Tipo de Task': 'name',
    'Categoria': 'categoria',
    'Status': 'status'
  }

  function getTaskTypeData(id) {
    const data = Tasktypes.filter(TaskType => TaskType.id === id);
    setTaskTypeData(data[0]);
  }

  const deleteModal = (id) => {
    getTaskTypeData(id)
    setModalDestroy(true)

  }

  const editModal = (id) => {
    getTaskTypeData(id)
    setEditTipoSilicitud(true)
  }

  function destroy(e) {
    e.preventDefault();
    setModalDestroy(false)
    setLoading(true);

    post(route('TaskType.delete', TaskTypeData.id), {
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
              <Link href={route('TaskType.index')} aria-current="page" className={` inline-block p-4 rounded-t-lg    ${Tasktypes ? 'activeTab' : 'NoactiveTab'}`}>Tasks</Link>
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
            <NewTaskType
              show={newTipoSilicitud}
              hideModal={() => setNewTipoSilicitud(false)}
              setLoading={setLoading}
            />
          }

          {editTipoSilicitud &&
            <EditTaskType
              show={editTipoSilicitud}
              TaskTypeData={TaskTypeData}
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
              selectedUser={TaskTypeData}
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
