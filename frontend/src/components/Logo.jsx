// frontend/src/components/Logo.jsx

export default function Logo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="8" fill="#4F46E5"/> {/* <-- CAMBIO AQUÍ */}
      <path d="M13 15V33H19V21L25 33H31L22 18L31 15H25L19 27L13 15Z" fill="white"/>
    </svg>
  );
}