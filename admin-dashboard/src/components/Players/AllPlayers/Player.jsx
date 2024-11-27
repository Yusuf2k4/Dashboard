import React from "react";
import PlayerDetails from "./PlayerDetails";
import PlayerActions from "./PlayerActions";
import FitnessToggle from "./FitnessToggle";

const Player = ({
  player,
  editPlayer,
  newName,
  newAge,
  newContract,
  setEditPlayer,
  setNewName,
  setNewAge,
  setNewContract,
  handleEditPlayer,
  handleSave,
  handleCancelEdit,
  handleSell,
  handleTerminate,
  handleFitnessToggle,
}) => {
  return (
    <div style={playerContainerStyle}>
      <PlayerDetails
        player={player}
        editPlayer={editPlayer}
        newName={newName}
        newAge={newAge}
        newContract={newContract}
        setNewName={setNewName}
        setNewAge={setNewAge}
        setNewContract={setNewContract}
      />
      <div style={actionsFitnessContainerStyle}>
        <PlayerActions
          player={player}
          editPlayer={editPlayer}
          handleEditPlayer={handleEditPlayer}
          handleSave={handleSave}
          handleCancelEdit={handleCancelEdit}
          handleSell={handleSell}
          handleTerminate={handleTerminate}
        />
        <div style={verticalSeparator}></div>
        <FitnessToggle player={player} handleFitnessToggle={handleFitnessToggle} />
      </div>
    </div>
  );
};

const playerContainerStyle = {
  display: "grid",
  gridTemplateColumns: "1fr auto auto", // Auto-width for actions and fitness toggle
  gap: "20px",
  alignItems: "center",
  padding: "20px",
  border: "1px solid #444",
  borderRadius: "8px",
  backgroundColor: "#333",
  fontFamily: "'Roboto', sans-serif",
  color: "white",
};

const actionsFitnessContainerStyle = {
  display: "flex",
  gap: "20px",
  alignItems: "center",
};

const verticalSeparator = {
  height: "50px", // Adjust height as needed
  width: "2px",
  backgroundColor: "#444",
};

export default Player;
