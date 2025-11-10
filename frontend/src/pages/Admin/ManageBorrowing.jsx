// frontend/src/pages/Admin/ManageBorrowing.jsx
import { useState, useEffect } from 'react';
import Card, { CardBody } from '../../components/Card';
import { Table, Thead, Tbody, Tr, Th, Td } from '../../components/Table';
import apiClient from '../../api';
import Spinner from '../../components/Spinner';
import PageHeader from '../../components/PageHeader';
import toast from 'react-hot-toast';

export default function ManageBorrowing() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBorrowed = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/api/borrowing');
      setBorrowedBooks(response.data.data);
    } catch (err) {
      toast.error('No se pudieron cargar los préstamos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrowed();
  }, []);

  return (
    <>
      <PageHeader title="Préstamos Activos" />
      <Card>
        <CardBody>
          {loading && <div className="flex justify-center"><Spinner /></div>}
          {!loading && (
            <Table>
              <Thead>
                <Tr>
                  <Th>Libro</Th>
                  <Th>Usuario</Th>
                  <Th>Fecha Límite</Th>
                </Tr>
              </Thead>
              <Tbody>
                {borrowedBooks.map(item => (
                  <Tr key={item.book_id}>
                    <Td>
                      <div className="font-medium">{item.book_title}</div>
                      <div className="text-sm text-gray-500">{item.author_name}</div>
                    </Td>
                    <Td>
                      <div className="font-medium">{item.user_name}</div>
                      <div className="text-sm text-gray-500">ID: {item.user_id}</div>
                    </Td>
                    <Td>
                      <span className="font-medium text-red-600">
                        {new Date(item.due_at).toLocaleDateString()}
                      </span>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
          {!loading && borrowedBooks.length === 0 && (
            <p className="text-gray-500">No hay libros prestados actualmente.</p>
          )}
        </CardBody>
      </Card>
    </>
  );
}