import React, { useState } from 'react';
import InputField from './InputField'; // Import the InputField component

// Function to get players from localStorage, or fallback to default players
const getPlayersFromStorage = () => {
  const savedPlayers = localStorage.getItem('players');
  return savedPlayers ? JSON.parse(savedPlayers) : [];
};

const AddPlayer = () => {
  const [newPlayer, setNewPlayer] = useState({
    PlayerName: '',
    boughtIn: 0,
    boughtTill: 0,
    wages: 0,
    boughtFor: 0,
    img: '',
    isFit: true,
    age: 0,
    id: 26, // Internal id field, displayed as Kit No
  });

  const [error, setError] = useState('');

  // Function to validate all fields
  const validate = () => {
    const currentYear = new Date().getFullYear();

    if (newPlayer.age <= 16 || newPlayer.age < 0) {
      return 'Age should be greater than 16 and not negative';
    }
    if (newPlayer.wages <= 0) {
      return 'Wages should be greater than 0';
    }
    if (newPlayer.boughtIn <= 2015 || newPlayer.boughtIn > currentYear) {
      return 'Bought In Year should be greater than 2015';
    }
    if (newPlayer.boughtTill <= newPlayer.boughtIn || newPlayer.boughtTill <= currentYear) {
      return 'Bought Till year should be greater than Bought In year and current year';
    }
    if (newPlayer.boughtFor < 0) {
      return 'Bought For should not be negative';
    }
    if (newPlayer.id <= 0) {
      return 'Kit No (ID) should be greater than 0';
    }

    // Check if a player already has the same id
    const players = getPlayersFromStorage();
    const existingId = players.find(player => player.id === newPlayer.id);
    if (existingId) {
      return 'Kit No (ID) is already taken by another player';
    }

    return null; // No errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPlayer((prevPlayer) => ({
      ...prevPlayer,
      [name]: name === 'age' || name === 'wages' || name === 'boughtIn' || name === 'boughtTill' || name === 'boughtFor' || name === 'id' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate before submitting
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    // Get existing players from localStorage
    const players = getPlayersFromStorage();

    // Add the new player
    const updatedPlayers = [...players, newPlayer];
    localStorage.setItem('players', JSON.stringify(updatedPlayers));

    // Optionally reset the form
    setNewPlayer({
      PlayerName: '',
      boughtIn: 0,
      boughtTill: 0,
      wages: 0,
      boughtFor: 0,
      img: '',
      isFit: true,
      age: 0,
      id: 26, // Reset Kit No to default
    });

    setError('');
    alert('Player added successfully!');
  };

  return (
    <div className="w-auto h-auto flex justify-center items-center pt-5">
      <div className="max-w-md w-full p-8 bg-gradient-to-r from-blue-500 to-red-500 shadow-lg rounded-xl h-1/2 overflow-y-auto">
        <h2 className="text-3xl font-semibold text-center mb-6">Add New Player</h2>

        {/* Show error message if validation fails */}
        {error && <div className="text-black text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-8">
          <InputField
            label="Player Name"
            type="text"
            name="PlayerName"
            value={newPlayer.PlayerName}
            onChange={handleChange}
            required
          />
          <InputField
            label="Age"
            type="number"
            name="age"
            value={newPlayer.age}
            onChange={handleChange}
            required
          />
          <InputField
            label="Wages (in Millions)"
            type="number"
            name="wages"
            value={newPlayer.wages}
            onChange={handleChange}
            required
          />
          <InputField
            label="Bought In Year"
            type="number"
            name="boughtIn"
            value={newPlayer.boughtIn}
            onChange={handleChange}
            required
          />
          <InputField
            label="Bought Till Year"
            type="number"
            name="boughtTill"
            value={newPlayer.boughtTill}
            onChange={handleChange}
            required
          />
          <InputField
            label="Bought For (in Millions)"
            type="number"
            name="boughtFor"
            value={newPlayer.boughtFor}
            onChange={handleChange}
            required
          />
          <InputField
            label="Kit No"
            type="number"
            name="id" // Connect to internal id
            value={newPlayer.id}
            onChange={handleChange}
            required
          />
          <InputField
            label="Image URL"
            type="text"
            name="img"
            value={newPlayer.img}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full py-3 px-6 text-black font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-sky-300"
          >
            Add Player
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPlayer;
