// frontend/src/pages/LoginPage.jsx

import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import FormInput from '../components/FormInput';
import Spinner from '../components/Spinner';
import Logo from '../components/Logo';

const imageUrl = 'https://cdn-media-2.freecodecamp.org/w1280/5f9c9999740569d1a4ca20a6.jpg';

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  const onSubmit = async (data) => {
    try {
      setLoginError(null);
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setLoginError("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
      } else {
        setLoginError("Ocurrió un error de red. Por favor, inténtalo más tarde.");
      }
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <div 
        className="hidden flex-1 items-center justify-center bg-cover bg-center lg:flex" 
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
      </div>

      <div className="bg-white flex-1 flex justify-center items-center overflow-y-auto h-screen">
        <div className="w-full max-w-md px-4 sm:w-[500px] py-8 my-auto">

          <div className="flex items-center justify-center mb-6">
            <Logo />
          </div>

          <div className="my-10 space-y-6">
            <div className="text-center">
              <h2 className="mb-1 text-3xl font-semibold text-gray-900">
                Bienvenido al LMS <span className="text-indigo-600">!</span> {/* <-- CAMBIO AQUÍ */}
              </h2>
              <p className="text-sm text-gray-500">Ingresa tus credenciales</p>
            </div>
          
            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300">
            </div>

            <form className="space-y-6 text-left" onSubmit={handleSubmit(onSubmit)}>
              
              <FormInput
                id="email"
                label="Email"
                type="email"
                register={register}
                validationRules={{ 
                  required: 'El email es obligatorio',
                  pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' }
                }}
                errors={errors}
              />

              <FormInput
                id="password"
                label="Contraseña"
                type="password"
                register={register}
                validationRules={{ 
                  required: 'La contraseña es obligatoria'
                }}
                errors={errors}
              />

              {loginError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative" role="alert">
                  <strong className="font-bold">Error: </strong>
                  <span className="block sm:inline">{loginError}</span>
                </div>
              )}
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer w-full text-center py-3 px-4 bg-indigo-600 text-white {/* <-- CAMBIO AQUÍ */}
                             rounded-md text-lg font-semibold 
                             hover:bg-indigo-700 focus:outline-none focus:ring-2 {/* <-- CAMBIO AQUÍ */}
                             focus:ring-indigo-600 focus:ring-offset-2 {/* <-- CAMBIO AQUÍ */}
                             flex items-center justify-center gap-2
                             transition-all duration-300 ease-in-out
                             disabled:bg-opacity-70"
                >
                  {isSubmitting ? <Spinner /> : 'Ingresar'}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}