import React, { useEffect, useState } from "react";
import { soldPlayer } from "../../../assets/data/soldPlayers.js";
import Player from "./Player.jsx";

const AllPlayers = ({ players, setPlayers }) => {
  const [editPlayer, setEditPlayer] = useState(null);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newContract, setNewContract] = useState("");
  const [filter, setFilter] = useState({
    criteria: "", // Selected filter criteria (e.g., "age", "wages")
    sortOrder: "asc", // Default sort order
  });

  useEffect(() => {
    const savedSoldPlayers = JSON.parse(localStorage.getItem("soldPlayers"));
    if (savedSoldPlayers) {
      soldPlayer.splice(0, soldPlayer.length, ...savedSoldPlayers); // Update the `soldPlayer` array in memory
    }
  }, []);

  // Handle Player Edit
  const handleEditPlayer = (player) => {
    setEditPlayer(player.id);
    setNewName(player.PlayerName);
    setNewAge(player.age);
    setNewContract(player.boughtTill);
  };

  // Save the edited player
  const handleSave = (playerId) => {
    const updatedPlayers = players.map((player) => {
      if (player.id === playerId) {
        return {
          ...player,
          PlayerName: newName || player.PlayerName,
          age: newAge || player.age,
          boughtTill: newContract || player.boughtTill,
        };
      }
      return player;
    });

    setPlayers(updatedPlayers);
    localStorage.setItem("players", JSON.stringify(updatedPlayers));
    setEditPlayer(null);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditPlayer(null);
  };

  // Sell player logic
  const handleSell = (player) => {
    const amount = prompt(`How much do you want to sell ${player.PlayerName} for (in millions)?`);
    if (amount && !isNaN(amount)) {
      const updatedSoldPlayer = {
        PlayerName: player.PlayerName,
        soldFor: parseFloat(amount),
        img: player.img,
      };

      const updatedSoldPlayers = [...soldPlayer, updatedSoldPlayer];
      localStorage.setItem("soldPlayers", JSON.stringify(updatedSoldPlayers));

      const updatedPlayers = players.filter((p) => p.id !== player.id);
      setPlayers(updatedPlayers);
      localStorage.setItem("players", JSON.stringify(updatedPlayers));
    }
  };

  // Terminate player
  const handleTerminate = (playerId) => {
    const updatedPlayers = players.filter((player) => player.id !== playerId);
    setPlayers(updatedPlayers);
    localStorage.setItem("players", JSON.stringify(updatedPlayers));
  };

  // Toggle player's fitness status (injured / fit)
  const handleFitnessToggle = (playerId) => {
    const updatedPlayers = players.map((player) => {
      if (player.id === playerId) {
        return { ...player, isFit: !player.isFit };
      }
      return player;
    });

    setPlayers(updatedPlayers);
    localStorage.setItem("players", JSON.stringify(updatedPlayers));
  };

  // Filter players based on user input
  const filteredPlayers = players
    .filter((player) => {
      if (filter.criteria) {
        return (
          (filter.criteria === "wages" ? player.wages : "") <= parseFloat(filter.criteria) ||
          (filter.criteria === "age" ? player.age === parseInt(filter.criteria) : true) ||
          (filter.criteria === "boughtTill" ? player.boughtTill.includes(filter.criteria) : true)
        );
      } else return true;
    })
    .sort((a, b) => {
      const orderMultiplier = filter.sortOrder === "asc" ? 1 : -1;
      if (filter.criteria === "wages") {
        return (a.wages - b.wages) * orderMultiplier;
      } else if (filter.criteria === "age") {
        return (a.age - b.age) * orderMultiplier;
      } else if (filter.criteria === "kitNo") {
        return (a.id - b.id) * orderMultiplier;
      } else if (filter.criteria === "boughtTill") {
        return (a.boughtTill - b.boughtTill) * orderMultiplier;
      } else {
        return 0;
      }
    });

  return (
    <div style={{ width: "100%", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#1f1f1f", padding: "20px", boxSizing: "border-box" }}>
      <div style={{ width: "100%", maxWidth: "1200px", padding: "20px", backgroundColor: "#282828", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
        <div style={{ fontSize: "16px", fontFamily: "'Roboto', sans-serif", color: "white", marginBottom: "20px" }}>
          <p>Filter By:</p>
          <div style={{ display: "flex", gap: "20px", marginBottom: "20px", fontSize: "16px", fontFamily: "'Roboto', sans-serif", color: "white" }}>
            <div>
              <label style={{ display: "block", color: "white" }}>Filter Criteria:</label>
              <select value={filter.criteria} onChange={(e) => setFilter({ ...filter, criteria: e.target.value })} style={inputStyle}>
                <option value="">Select Filter</option>
                <option value="age">Age</option>
                <option value="wages">Wages</option>
                <option value="kitNo">Kit No</option>
                <option value="boughtTill">Bought Till</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", color: "white" }}>Sort Order:</label>
              <select value={filter.sortOrder} onChange={(e) => setFilter({ ...filter, sortOrder: e.target.value })} style={inputStyle}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {filteredPlayers.map((player) => (
            <Player
              key={player.id}
              player={player}
              editPlayer={editPlayer}
              newName={newName}
              newAge={newAge}
              newContract={newContract}
              setEditPlayer={setEditPlayer}
              setNewName={setNewName}
              setNewAge={setNewAge}
              setNewContract={setNewContract}
              handleEditPlayer={handleEditPlayer}
              handleSave={handleSave}
              handleCancelEdit={handleCancelEdit}
              handleSell={handleSell}
              handleTerminate={handleTerminate}
              handleFitnessToggle={handleFitnessToggle}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  fontSize: "14px",
  backgroundColor: "#333",
  color: "white",
  border: "1px solid #555",
  borderRadius: "5px",
};

export default AllPlayers;
