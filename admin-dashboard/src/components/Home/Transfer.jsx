import React, { useEffect, useState } from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { players } from '../../assets/data/players';
import { soldPlayer } from '../../assets/data/soldPlayers';

const Transfer = () => {
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem('players')) || players; // Use initial data if not in localStorage
    const storedSoldPlayers = JSON.parse(localStorage.getItem('soldPlayers')) || soldPlayer;

    // Calculate only if data is available
    if (storedPlayers.length && storedSoldPlayers.length) {
      const boughtPlayers = storedPlayers.filter(player => player.boughtIn === 2024);
      const boughtValue = boughtPlayers.reduce((acc, player) => acc + player.boughtFor, 0);
      const soldValue = storedSoldPlayers.reduce((acc, value) => acc + value.soldFor, 0);

      // Update pieData state
      setPieData([
        { id: 0, value: soldValue, label: 'Sold' },
        { id: 1, value: boughtValue, label: 'Bought' },
      ]);

      setLoading(false); // Data is ready
    }
  }, []); // Empty dependency array, runs only once

  useEffect(() => {
    if (!localStorage.getItem('players')) {
      localStorage.setItem('players', JSON.stringify(players));
    }
    if (!localStorage.getItem('soldPlayers')) {
      localStorage.setItem('soldPlayers', JSON.stringify(soldPlayer));
    }
  }, []);
  

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while the data is being processed
  }

  return (
    <div className="bg-gray-800 h-auto w-auto rounded-2xl p-4">
      <PieChart
        colors={['green', 'red']}
        series={[
          {
            arcLabel: (item) => `$${item.value}M`,
            arcLabelMinAngle: 35,
            arcLabelRadius: '60%',
            data: pieData,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fontWeight: 'bold',
          },
        }}
        {...size}
      />
    </div>
  );
};

const size = {
  width: 350,
  height: 200,
};

export default Transfer;
