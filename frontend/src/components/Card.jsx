// frontend/src/components/Card.jsx

//
export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

//
export function CardHeader({ children }) {
  return (
    <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
      {children}
    </div>
  );
}

//
export function CardBody({ children }) {
  return (
    <div className="p-6"> 
      {children}
    </div>
  );
}