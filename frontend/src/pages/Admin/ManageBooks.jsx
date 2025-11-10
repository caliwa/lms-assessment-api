// frontend/src/pages/Admin/ManageBooks.jsx
import { useState, useEffect } from 'react';
import Card, { CardBody } from '../../components/Card';
import { Table, Thead, Tbody, Tr, Th, Td, TdAction } from '../../components/Table';
import apiClient from '../../api';
import BookFormModal from '../../components/BookFormModal';
import Spinner from '../../components/Spinner';
import PageHeader from '../../components/PageHeader';
import { BsPencil, BsTrash } from 'react-icons/bs';
import toast from 'react-hot-toast';

export default function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/api/books');
      setBooks(response.data.data);
    } catch (err) {
      toast.error('No se pudieron cargar los libros.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleFormSubmit = async (data) => {
    const promise = bookToEdit
      ? apiClient.put(`/api/books/${bookToEdit.id}`, data)
      : apiClient.post('/api/books', data);
      
    toast.promise(promise, {
      loading: 'Guardando libro...',
      success: () => {
        setIsModalOpen(false);
        setBookToEdit(null);
        fetchBooks();
        return bookToEdit ? 'Libro actualizado' : 'Libro creado';
      },
      error: (err) => {
        console.error(err);
        return 'Error al guardar el libro.';
      },
    });
  };

  const handleDelete = async (bookId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este libro?')) {
      toast.promise(apiClient.delete(`/api/books/${bookId}`), {
        loading: 'Eliminando libro...',
        success: () => {
          fetchBooks();
          return 'Libro eliminado';
        },
        error: 'Error al eliminar el libro.',
      });
    }
  };

  const openCreateModal = () => {
    setBookToEdit(null);
    setIsModalOpen(true);
  };
  const openEditModal = (book) => {
    setBookToEdit(book);
    setIsModalOpen(true);
  };

  return (
    <>
      <PageHeader 
        title="Gestionar Libros"
        buttonLabel="Crear Libro"
        onButtonClick={openCreateModal}
      />
      
      <Card>
        <CardBody>
          {loading && <div className="flex justify-center"><Spinner /></div>}
          {!loading && (
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th><Th>Título</Th><Th>Autor ID</Th><Th>ISBN</Th><Th>Estado</Th><Th><span className="sr-only">Acciones</span></Th>
                </Tr>
              </Thead>
              <Tbody>
                {books.map(book => (
                  <Tr key={book.id}>
                    <Td>{book.id}</Td>
                    <Td className="font-medium">{book.title}</Td>
                    
                    {}
                    <Td>{book.author ? book.author.id : 'N/A'}</Td>
                    
                    <Td>{book.isbn}</Td><Td>
                      {book.available ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Disponible
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Prestado
                        </span>
                      )}
                    </Td><TdAction>
                      <button onClick={() => openEditModal(book)} className="text-indigo-600 hover:text-indigo-900">
                        <BsPencil />
                      </button>
                      <button onClick={() => handleDelete(book.id)} className="text-red-600 hover:text-red-900">
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
      
      <BookFormModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        bookToEdit={bookToEdit}
      />
    </>
  );
}