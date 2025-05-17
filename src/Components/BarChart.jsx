import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart() {
  // Data structure
  const chartData = {
    labels: ['Action', 'Comedy', 'Drama', 'Sci-Fi'], // X-axis labels
    datasets: [
      {
        label: 'Movies Watched (2023)', // Legend label
        data: [30, 40, 50, 60],          // Y-axis values
        backgroundColor: '#36A2EB',     // Bar color (or array for multi-color)
      },
    ],
  };

  // Optional: Chart customization
  const options = {
    indexAxis : 'y',
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Movie Genres' },
    },
  };

  return <Bar data={chartData} options={options} />;
}

export default BarChart;