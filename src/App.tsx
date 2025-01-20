import React, { useEffect, useState } from 'react';
import './App.css';

// Define a type for the billionaire
type Billionaire = {
  name: string;
  netWorth: number; // Net worth in USD
};

const App: React.FC = () => {
  const [billionaires, setBillionaires] = useState<Billionaire[]>([]);
  const [totalNetWorth, setTotalNetWorth] = useState(0);

  useEffect(() => {
    // Fetch the mock data
    fetch('/data.json')
      .then((res) => res.json())
      .then((data: Billionaire[]) => {
        setBillionaires(data);

        // Calculate total net worth
        const total = data.reduce((sum, person) => sum + person.netWorth, 0);
        setTotalNetWorth(total);
      })
      .catch((error) => console.error('Failed to fetch data:', error));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>World's Richest People</h1>
      <h2>Total Net Worth: ${totalNetWorth.toLocaleString()}</h2>
      <table cellPadding="10" style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Net Worth (USD)</th>
          </tr>
        </thead>
        <tbody>
          {billionaires.map((person, index) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td>${person.netWorth.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
