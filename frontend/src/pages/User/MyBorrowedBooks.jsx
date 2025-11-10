// frontend/src/pages/User/MyBorrowedBooks.jsx
import { useState, useEffect } from 'react';
import Card, { CardBody } from '../../components/Card';
import apiClient from '../../api';
import Spinner from '../../components/Spinner';
import PageHeader from '../../components/PageHeader';
import toast from 'react-hot-toast';
import { BsBookFill } from 'react-icons/bs';

export default function MyBorrowedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBorrowedBooks = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/api/user/borrowed');
      setBooks(response.data.data);
    } catch (error) {
      toast.error('Error al cargar tus libros.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const handleReturn = async (bookId) => {
    const promise = apiClient.post(`/api/books/${bookId}/return`);
    toast.promise(promise, {
      loading: 'Procesando devolución...',
      success: (response) => {
        fetchBorrowedBooks();
        return response.data.message;
      },
      error: (err) => err.response?.data?.message || 'Error al devolver el libro.',
    });
  };

  return (
    <>
      <PageHeader title="Mis Libros Prestados" />
      <Card>
        <CardBody>
          {loading && <div className="flex justify-center"><Spinner /></div>}
          {!loading && (
            <div className="mt-6 space-y-4">
              {books.map(book => (
                <div key={book.id} className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    <BsBookFill className="text-indigo-600" size={20} />
                    <div>
                      <p className="font-semibold">{book.title}</p>
                      <p className="text-sm text-gray-600">ISBN: {book.isbn}</p>
                      <p className="text-sm text-red-600 font-medium">
                        Devolver antes de: {new Date(book.pivot.due_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleReturn(book.id)}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                  >
                    Devolver
                  </button>
                </div>
              ))}
              {!loading && books.length === 0 && (
                <p className="text-gray-500">No tienes libros prestados actualmente.</p>
              )}
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
}