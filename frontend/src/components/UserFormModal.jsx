// frontend/src/components/UserFormModal.jsx
import { useForm } from 'react-hook-form';
import Modal from './Modal';
import { useEffect } from 'react';
import FormInput from './FormInput';

export default function UserFormModal({ show, onClose, onSubmit, userToEdit }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const isEditMode = !!userToEdit;

  useEffect(() => {
    if (isEditMode) {
      reset(userToEdit);
    } else {
      reset({
        name: '',
        email: '',
        password: '',
        unique_library_id: '',
        role: 'User',
      });
    }
  }, [userToEdit, reset, isEditMode]);

  return (
    <Modal 
      show={show} 
      onClose={onClose} 
      title={isEditMode ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormInput
          id="name"
          label="Nombre Completo"
          register={register}
          validationRules={{ required: 'El nombre es obligatorio' }}
          errors={errors}
        />
        <FormInput
          id="email"
          label="Email"
          type="email"
          register={register}
          validationRules={{ required: 'El email es obligatorio' }}
          errors={errors}
        />
        <FormInput
          id="unique_library_id"
          label="ID de Biblioteca"
          register={register}
          validationRules={{ required: 'El ID es obligatorio' }}
          errors={errors}
        />
        {!isEditMode && (
          <FormInput
            id="password"
            label="Contraseña"
            type="password"
            register={register}
            validationRules={{ 
              required: 'La contraseña es obligatoria',
              minLength: { value: 8, message: 'Mínimo 8 caracteres' }
            }}
            errors={errors}
          />
        )}
        <div className="relative">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rol</label>
          <select
            id="role"
            {...register('role', { required: 'El rol es obligatorio' })}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
            Cancelar
          </button>
          <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 disabled:opacity-50">
            {isSubmitting ? 'Guardando...' : (isEditMode ? 'Actualizar' : 'Crear')}
          </button>
        </div>
      </form>
    </Modal>
  );
}