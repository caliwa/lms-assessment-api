// frontend/src/components/BookChart.jsx
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BookChart({ available, borrowed }) {
  const data = {
    labels: ['Disponibles', 'Prestados'],
    datasets: [
      {
        data: [available, borrowed],
        backgroundColor: [
          '#4F46E5', //
          '#E0E7FF', //
        ],
        borderColor: [
          '#FFFFFF',
          '#FFFFFF',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    cutout: '70%', //
  };

  return <Doughnut data={data} options={options} />;
}