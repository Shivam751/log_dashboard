import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const EventChart = ({ data }) => {
  // Count the frequency of each system call type
  const syscallFrequency = data.reduce((acc, event) => {
    const syscallName = event.event_context.syscall_name;
    
    // check for undefined syscall name
    if (syscallName === undefined) {
      return acc;
    }
    
    acc[syscallName] = (acc[syscallName] || 0) + 1;
    return acc;
  }, {});

  // Prepare data for the chart
  const chartData = {
    labels: Object.keys(syscallFrequency),
    datasets: [
      {
        label: 'Event Frequency',
        data: Object.values(syscallFrequency),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default EventChart;
