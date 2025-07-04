import { useEffect } from "react";
import { useState } from "react";
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
import Card from 'react-bootstrap/Card';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function MovieBarChart({id}) {

    let [chartData, setChartData] = useState({})

    useEffect(() => {
        async function getChartData(id) {
            try {
                const response = await fetch("https://fullstackproject-backend-1.onrender.com/reviews/bargraphdata/" + id)
                if(!response.ok) {
                    throw new Error("Error occured " + response.json())
                }
                const jsonResponse = await response.json()
                setChartData(jsonResponse)
            } catch (error) {
                console.log(error.message)
            }
        }
        getChartData(id)
    }, [id])

    const graphData = {
            labels : ['Bad', 'Average', 'Good', 'Excellent'], 
            datasets : [{
                label : 'Audience Rating count',
                data : chartData,
                backgroundColor : [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ]
            }]
        }

    const options = {
    indexAxis : 'y',
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Audience Rating' },
    },scales: {
      x: {
        title: {
          display: true,
          text: 'No. of Reviews', // Custom X-axis label
          font: {
            size: 12,
          }
        }
      }
    }
    };

    return (
        <>
          <Card className='m-auto my-2 w-100 m-auto'>
              <Card.Body className='d-flex flex-row'>
                  {chartData && <Bar data={graphData} options={options}/>}
              </Card.Body>
          </Card>
            
        </>
    )
} 