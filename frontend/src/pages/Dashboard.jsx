// frontend/src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Card, { CardHeader, CardBody } from '../components/Card';
import apiClient from '../api';
import Spinner from '../components/Spinner';
import StatCard from '../components/StatCard';
import BookChart from '../components/BookChart';
//
import { BsBook, BsPeople, BsJournalArrowUp, BsJournalCheck } from 'react-icons/bs';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/api/dashboard-stats');
        setStats(response.data);
      } catch (error) {
        console.error("Error al cargar estadísticas", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  const AdminDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard de Administrador</h1>
      
      {/*  */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total de Libros" 
          value={stats.totalBooks}
          icon={<BsBook size={24} className="text-white" />}
        />
        <StatCard 
          title="Total de Usuarios" 
          value={stats.totalUsers}
          icon={<BsPeople size={24} className="text-white" />}
        />
        <StatCard 
          title="Libros Prestados (Ahora)" 
          value={stats.borrowedBooks}
          icon={<BsJournalArrowUp size={24} className="text-white" />}
        />
      </div>

      {/**/}
      <Card>
        <CardHeader><h2 className="text-lg font-semibold">Estado de la Biblioteca</h2></CardHeader>
        <CardBody>
          <div className="h-64 md:h-80">
            <BookChart 
              available={stats.availableBooks} 
              borrowed={stats.borrowedBooks} 
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );

  const UserDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Hola, {user.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard 
          title="Mis Préstamos Actuales" 
          value={stats.myBorrowedCount}
          icon={<BsJournalCheck size={24} className="text-white" />}
        />
        <StatCard 
          title="Libros Disponibles" 
          value={stats.availableBooks}
          icon={<BsBook size={24} className="text-white" />}
        />
      </div>

      <Card>
        <CardHeader><h2 className="text-lg font-semibold">Estado de la Biblioteca</h2></CardHeader>
        <CardBody>
          <div className="h-64 md:h-80">
            <BookChart 
              available={stats.availableBooks} 
              borrowed={stats.borrowedBooks} 
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );

  return user.role === 'Admin' ? <AdminDashboard /> : <UserDashboard />;
}