// frontend/src/components/BookFormModal.jsx
import { useForm } from 'react-hook-form';
import Modal from './Modal';
import { useEffect } from 'react';
import FormInput from './FormInput';

export default function BookFormModal({ show, onClose, onSubmit, bookToEdit }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const isEditMode = !!bookToEdit;

  useEffect(() => {
    if (isEditMode) {

      const flatBookData = {
        title: bookToEdit.title,
        isbn: bookToEdit.isbn,
        publication_year: bookToEdit.publication_year,
        author_id: bookToEdit.author ? bookToEdit.author.id : ''
      };
      reset(flatBookData);
      
    } else {
      reset({
        title: '',
        author_id: '',
        isbn: '',
        publication_year: '',
      });
    }
  }, [bookToEdit, reset, isEditMode]); //

  return (
    <Modal 
      show={show} 
      onClose={onClose} 
      title={isEditMode ? 'Editar Libro' : 'Crear Nuevo Libro'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormInput
          id="title"
          label="Título"
          register={register}
          validationRules={{ required: 'El título es obligatorio' }}
          errors={errors}
        />
        
        {/*
        */}
        <FormInput
          id="author_id"
          label="ID del Autor"
          type="number"
          register={register}
          validationRules={{ required: 'El ID de autor es obligatorio' }}
          errors={errors}
        />
        
        <FormInput
          id="isbn"
          label="ISBN"
          register={register}
          validationRules={{ required: 'El ISBN es obligatorio' }}
          errors={errors}
        />
        
        <FormInput
          id="publication_year"
          label="Año de Publicación"
          type="number"
          register={register}
          validationRules={{ 
            required: 'El año es obligatorio',
            min: { value: 1800, message: 'Año inválido' }
          }}
          errors={errors}
        />

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Guardando...' : (isEditMode ? 'Actualizar' : 'Crear')}
          </button>
        </div>
      </form>
    </Modal>
  );
}