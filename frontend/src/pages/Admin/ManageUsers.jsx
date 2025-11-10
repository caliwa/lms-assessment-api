// frontend/src/pages/Admin/ManageUsers.jsx
import { useState, useEffect } from 'react';
import Card, { CardBody } from '../../components/Card';
import { Table, Thead, Tbody, Tr, Th, Td, TdAction } from '../../components/Table';
import apiClient from '../../api';
import UserFormModal from '../../components/UserFormModal';
import Spinner from '../../components/Spinner';
import PageHeader from '../../components/PageHeader';
import { BsPencil, BsTrash, BsPersonCircle } from 'react-icons/bs';
import toast from 'react-hot-toast';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/api/users');
      setUsers(response.data.data);
    } catch (err) {
      toast.error('No se pudieron cargar los usuarios.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFormSubmit = async (data) => {
    const promise = userToEdit
      ? apiClient.put(`/api/users/${userToEdit.id}`, data)
      : apiClient.post('/api/users', data);

    toast.promise(promise, {
      loading: 'Guardando usuario...',
      success: () => {
        setIsModalOpen(false);
        setUserToEdit(null);
        fetchUsers();
        return userToEdit ? 'Usuario actualizado' : 'Usuario creado';
      },
      error: 'Error al guardar el usuario.',
    });
  };

  const handleDelete = async (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      toast.promise(apiClient.delete(`/api/users/${userId}`), {
        loading: 'Eliminando usuario...',
        success: () => {
          fetchUsers();
          return 'Usuario eliminado';
        },
        error: 'Error al eliminar el usuario.',
      });
    }
  };

  const openCreateModal = () => { setUserToEdit(null); setIsModalOpen(true); };
  const openEditModal = (user) => { setUserToEdit(user); setIsModalOpen(true); };

  return (
    <>
      <PageHeader 
        title="Gestionar Usuarios"
        buttonLabel="Crear Usuario"
        onButtonClick={openCreateModal}
      />
      
      <Card>
        <CardBody>
          {loading && <div className="flex justify-center"><Spinner /></div>}
          {!loading && (
            <Table>
              <Thead>
                {/* 
                */}
                <Tr>
                  <Th>Nombre</Th><Th>Library ID</Th><Th>Rol</Th><Th><span className="sr-only">Acciones</span></Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map(user => (
                  <Tr key={user.id}>
                    <Td>
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
                            <BsPersonCircle size={24} />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </Td><Td>{user.unique_library_id}</Td><Td>
                      {user.role === 'Admin' ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                          Admin
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          User
                        </span>
                      )}
                    </Td><TdAction>
                      <button onClick={() => openEditModal(user)} className="text-indigo-600 hover:text-indigo-900">
                        <BsPencil />
                      </button>
                      <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-900">
                        <BsTrash />
                      </button>
                    </TdAction>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </CardBody>
      </Card>
      
      <UserFormModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        userToEdit={userToEdit}
      />
    </>
  );
}