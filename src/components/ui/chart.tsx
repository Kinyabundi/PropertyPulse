import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      // text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Token 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 0 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Token 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 0 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Token 3',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 0 })),
      backgroundColor: 'rgb(181, 27, 117)',
    },
  ],
};

export function Chart() {
  return <Bar options={options} data={data} />;
}

