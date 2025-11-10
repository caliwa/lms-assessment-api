
const tips = [
  "💡 Consejo: ¿No sabes qué leer? Usa la barra de 'Buscar Libros' por título, autor o ISBN.",
  "💡 Consejo: Recuerda que solo puedes tener un máximo de 3 libros prestados al mismo tiempo.",
  "💡 Consejo: ¡No olvides devolver tus libros! El plazo de préstamo es de 14 días.",
  "💡 Consejo: Leer 20 minutos al día mejora la concentración y reduce el estrés.",
  "💡 ¿Sabías que? Puedes ver todos tus préstamos actuales en la sección 'Mis Préstamos'.",
  "💡 Consejo: Un libro 'No disponible' ya ha sido prestado por otro usuario.",
];

//
export function getRandomTip() {
  return tips[Math.floor(Math.random() * tips.length)];
}