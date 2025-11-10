// frontend/src/components/PageHeader.jsx

export default function PageHeader({ title, buttonLabel, onButtonClick }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
        {title}
      </h1>
      {buttonLabel && onButtonClick && (
        <button
          onClick={onButtonClick}
          className="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md 
                     shadow-sm hover:bg-indigo-700
                     flex items-center justify-center gap-2
                     transition-all duration-200 ease-in-out
                     transform hover:-translate-y-px"
        >
          {buttonLabel}
        </button>
      )}
    </div>
  );
}