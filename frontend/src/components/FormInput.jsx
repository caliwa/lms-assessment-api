// frontend/src/components/FormInput.jsx

export default function FormInput({ 
  id, 
  label, 
  type = "text", 
  register, 
  validationRules, 
  errors 
}) {
  const error = errors[id];

  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        {...register(id, validationRules)}
        placeholder=" " 
        className={`peer block w-full p-3 border rounded-md shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent {/* <-- CAMBIO AQUÍ */}
                    ${error ? 'border-red-500' : 'border-gray-300'}
                  `}
      />
      <label
        htmlFor={id}
        className={`absolute top-3 left-3 z-10 origin-[0] -translate-y-6 scale-75 transform 
                    bg-white px-2 text-sm text-gray-500 duration-300
                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 
                    peer-placeholder-shown:scale-100 
                    peer-focus:top-3 peer-focus:-translate-y-6 
                    peer-focus:scale-75 peer-focus:px-2 peer-focus:text-indigo-600 {/* <-- CAMBIO AQUÍ */}
                    ${error ? 'text-red-500' : ''}
                  `}
      >
        {label}
      </label>
      {error && (
        <p className="mt-1 text-xs text-red-600">{error.message}</p>
      )}
    </div>
  );
}