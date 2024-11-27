import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { soldPlayer as initialSoldPlayer } from "../../assets/data/soldPlayers";

// Function to get players from localStorage, or fallback to default players
const getPlayersFromStorage = () => {
  const savedPlayers = localStorage.getItem("players");
  return savedPlayers ? JSON.parse(savedPlayers) : [];
};

const getSoldPlayersFromStorage = () => {
  const savedSoldPlayers = localStorage.getItem("soldPlayers");
  return savedSoldPlayers ? JSON.parse(savedSoldPlayers) : initialSoldPlayer; // Use initial data if not in localStorage
};

// Function to update players in localStorage
const setPlayersToStorage = (players) => {
  localStorage.setItem("players", JSON.stringify(players));
};

// Function to update soldPlayers in localStorage
const setSoldPlayersToStorage = (soldPlayers) => {
  localStorage.setItem("soldPlayers", JSON.stringify(soldPlayers));
};

const TransferWindow = () => {
  const [activeTab, setActiveTab] = useState("sold");
  const [players, setPlayers] = useState([]);
  const [soldPlayer, setSoldPlayer] = useState([]);

  // Fetch players and sold players from localStorage on mount
  useEffect(() => {
    setPlayers(getPlayersFromStorage());
    setSoldPlayer(getSoldPlayersFromStorage());
  }, []);

  // Filter players based on the 'boughtIn' year and sold status
  const soldPlayers = soldPlayer.filter((player) => player.soldFor > 0);
  const boughtPlayers = players.filter((player) => player.boughtFor > 0 && player.boughtIn === 2024);

  // Select active data based on the tab
  const activeData = activeTab === "sold" ? soldPlayers : boughtPlayers;

  // Handle when a player is sold and move it from players to soldPlayers
  const handleSellPlayer = (playerId) => {
    const updatedPlayers = players.filter((player) => player.id !== playerId);
    const playerToSell = players.find((player) => player.id === playerId);

    if (playerToSell) {
      // Move player to soldPlayers and update the soldFor value
      playerToSell.soldFor = playerToSell.boughtFor * 1.1; // Example of selling price as 10% more than boughtFor

      const updatedSoldPlayers = [...soldPlayer, playerToSell];

      // Update localStorage
      setPlayersToStorage(updatedPlayers);
      setSoldPlayersToStorage(updatedSoldPlayers);

      // Update state
      setPlayers(updatedPlayers);
      setSoldPlayer(updatedSoldPlayers);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      {/* Header Section */}
      <div className="flex items-center border-b border-gray-700">
        <button
          className={`flex-1 py-3 px-4 font-medium ${
            activeTab === "sold" ? "bg-gray-700" : "bg-transparent hover:bg-gray-800"
          } rounded-l-lg transition`}
          onClick={() => setActiveTab("sold")}
        >
          Players Sold
        </button>
        <div className="w-px bg-red-600"></div>
        <button
          className={`flex-1 py-3 px-4 font-medium ${
            activeTab === "bought" ? "bg-gray-700" : "bg-transparent hover:bg-gray-800"
          } rounded-r-lg transition`}
          onClick={() => setActiveTab("bought")}
        >
          Players Bought
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="overflow-y-auto p-4" style={{ height: "calc(3 * 6rem)" }}>
        {activeData.map((player) => (
          <UserCard
            key={player.id} // Ensure unique key for each player
            imageSrc={player.img}
            name={player.PlayerName}
            userId={player.id} // Use player id or name if no id exists
            amountPaid={player.soldFor || player.boughtFor} // Show soldFor for sold players, boughtFor for bought players
            // Add "Sell Player" button for sold players
            onSell={() => handleSellPlayer(player.id)} // When sold button is clicked
          />
        ))}
      </div>
    </div>
  );
};

export default TransferWindow;
