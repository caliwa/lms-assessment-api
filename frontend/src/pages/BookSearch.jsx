// frontend/src/pages/BookSearch.jsx
import { useState, useEffect } from 'react';
//
import Card, { CardHeader, CardBody } from '../components/Card'; 
import apiClient from '../api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BsSearch, BsBook } from 'react-icons/bs';

export default function BookSearch() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const searchBooks = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const response = await apiClient.get(`/api/books/search?q=${searchTerm}`);
      setBooks(response.data.data);
    } catch (error) {
      toast.error('Error al buscar libros.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => { searchBooks(); }, []);

  const handleBorrow = async (bookId) => {
    if (!user) {
      toast.error('Debes iniciar sesión para prestar un libro.');
      navigate('/login');
      return;
    }
    
    const promise = apiClient.post(`/api/books/${bookId}/borrow`);
    toast.promise(promise, {
      loading: 'Procesando préstamo...',
      success: (response) => {
        searchBooks(); 
        return response.data.message;
      },
      error: (err) => err.response?.data?.message || 'Error al prestar el libro.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-bold text-gray-900">Búsqueda de Libros</h1>
      </CardHeader>
      <CardBody>
        <form onSubmit={searchBooks} className="flex gap-4 my-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BsSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por título, autor o ISBN..."
              className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>
        
        <div className="mt-6 space-y-4">
          {books.map(book => (
            <div key={book.id} className="flex items-center justify-between p-4 border rounded-md hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-4">
                <BsBook className="text-indigo-600" size={20} />
                <div>
                  <p className="font-semibold">{book.title}</p>
                  <p className="text-sm text-gray-600">ISBN: {book.isbn}</p>
                </div>
              </div>
              <button
                onClick={() => handleBorrow(book.id)}
                disabled={!book.available}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 
                           disabled:bg-gray-400 disabled:cursor-not-allowed
                           transition-all duration-200"
              >
                {book.available ? 'Prestar' : 'No disponible'}
              </button>
            </div>
          ))}
          {!loading && books.length === 0 && <p>No se encontraron libros.</p>}
        </div>
      </CardBody>
    </Card>
  );
}