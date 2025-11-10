// frontend/src/components/Navbar.jsx
import { useState } from 'react'; //
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BsList, BsX } from 'react-icons/bs'; //

//
// Componente interno para los links de navegación (Desktop)
const NavItem = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium
        ${
          isActive
            ? 'border-indigo-600 text-gray-900'
            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
        }
        transition-colors duration-200 ease-in-out`
      }
    >
      {children}
    </NavLink>
  );
};

//
// Componente interno para los links de navegación (Mobile)
const MobileNavItem = ({ to, onClick, children }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick} //
      className={({ isActive }) =>
        `block py-2 pl-3 pr-4 text-base font-medium 
        ${
          isActive
            ? 'bg-indigo-50 border-l-4 border-indigo-600 text-indigo-700'
            : 'border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
        }`
      }
    >
      {children}
    </NavLink>
  );
};


export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  //
  // Estado para manejar el menú hamburguesa
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  //
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/*  */}
          <div className="flex">
            <Link to="/dashboard" className="flex-shrink-0 flex items-center font-bold text-xl">
              LMS
            </Link>
          </div>

          {/*  */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <NavItem to="/dashboard">Inicio</NavItem>
            <NavItem to="/">Buscar Libros</NavItem>
            
            {user && <NavItem to="/my-books">Mis Préstamos</NavItem>}
            
            {user?.role === 'Admin' && (
              <>
                <NavItem to="/admin/books">Gestionar Libros</NavItem>
                <NavItem to="/admin/users">Gestionar Usuarios</NavItem>
                <NavItem to="/admin/borrowing">Ver Préstamos</NavItem>
              </>
            )}
          </div>

          {/*  */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                {/*
                */}
                <span className="text-sm text-gray-700">
                  Hola, <span className="font-medium">{user.name}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md 
                             hover:bg-indigo-700 shadow-sm
                             transition-all duration-200 ease-in-out
                             transform hover:-translate-y-px"
                >
                  Salir
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md 
                           hover:bg-indigo-700 shadow-sm
                           transition-all duration-200 ease-in-out
                           transform hover:-translate-y-px"
              >
                Login
              </Link>
            )}
          </div>

          {/*
          */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Abrir menú</span>
              {isMobileMenuOpen ? <BsX size={24} /> : <BsList size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/*
      */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-200">
          <div className="pt-2 pb-3 space-y-1">
            <MobileNavItem to="/dashboard" onClick={closeMobileMenu}>Dashboard</MobileNavItem>
            <MobileNavItem to="/" onClick={closeMobileMenu}>Buscar Libros</MobileNavItem>
            
            {user && <MobileNavItem to="/my-books" onClick={closeMobileMenu}>Mis Préstamos</MobileNavItem>}
            
            {user?.role === 'Admin' && (
              <>
                <MobileNavItem to="/admin/books" onClick={closeMobileMenu}>Gestionar Libros</MobileNavItem>
                <MobileNavItem to="/admin/users" onClick={closeMobileMenu}>Gestionar Usuarios</MobileNavItem>
                <MobileNavItem to="/admin/borrowing" onClick={closeMobileMenu}>Ver Préstamos</MobileNavItem>
              </>
            )}
          </div>
          
          {/*  */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <>
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 text-gray-500">
                      <span className="font-medium text-gray-700">{user.name[0]}</span>
                    </span>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-1">
                <MobileNavItem to="/login" onClick={closeMobileMenu}>Login</MobileNavItem>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}