// frontend/src/components/Layout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { getRandomTip } from '../tips';

export default function Layout() {
  const location = useLocation(); 

  useEffect(() => {

    const timer = setTimeout(() => {
      const tip = getRandomTip();

      toast(tip, {
        duration: 5000,
        position: 'bottom-right', 
        style: {
          background: '#FFFFFF',
          color: '#111827',
          border: '1px solid #E5E7EB',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      });
    }, 1500);

    return () => clearTimeout(timer);
    
  }, [location.pathname]); 


  return (
    <div className="min-h-screen bg-brand-gray">
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 pt-16"> 
          <Outlet />
        </div>
      </main>
    </div>
  );
}