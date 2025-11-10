// frontend/src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast'; //

// Pages
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import BookSearch from './pages/BookSearch';
import MyBorrowedBooks from './pages/User/MyBorrowedBooks';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageBooks from './pages/Admin/ManageBooks';
import ManageUsers from './pages/Admin/ManageUsers';
import ManageBorrowing from './pages/Admin/ManageBorrowing'; //
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { user } = useAuth();

  return (
    <>
      {/*
        El Contenedor del Toaster. Aquí aparecerán las notificaciones.
      */}
      <Toaster 
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: '#F0FDF4',
              color: '#166534',
            },
          },
          error: {
            style: {
              background: '#FEF2F2',
              color: '#B91C1C',
            },
          },
        }}
      />
      
      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
        
        {/* RUTAS PRIVADAS (Requieren Login) */}
        <Route element={<Layout />}>
          <Route path="/" element={<BookSearch />} />
          <Route path="/dashboard" element={!user ? <Navigate to="/login" /> : <Dashboard />} />

          {/* Rutas de Usuario (Rol "User") */}
          <Route element={<ProtectedRoute allowedRoles={['User', 'Admin']} />}>
            <Route path="/my-books" element={<MyBorrowedBooks />} />
          </Route>

          {/* Rutas de Admin (Rol "Admin") */}
          <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/books" element={<ManageBooks />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/borrowing" element={<ManageBorrowing />} /> {/* */}
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;