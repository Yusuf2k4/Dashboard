import React from "react";

const PlayerActions = ({
  player,
  editPlayer,
  handleEditPlayer,
  handleSave,
  handleCancelEdit,
  handleSell,
  handleTerminate,
}) => {
  return (
    <div style={actionsContainerStyle}>
      {editPlayer === player.id ? (
        <>
          <button style={buttonStyle} onClick={() => handleSave(player.id)}>Save</button>
          <button style={buttonStyle} onClick={handleCancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          <button style={buttonStyle} onClick={() => handleEditPlayer(player)}>Edit Player</button>
          <button style={buttonStyle} onClick={() => handleSell(player)}>Sell Player</button>
          <button style={buttonStyle} onClick={() => handleTerminate(player.id)}>Terminate Player</button>
        </>
      )}
    </div>
  );
};

const actionsContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
};

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "14px",
  backgroundColor: "#555",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  width: "150px", // Fixed width for uniform button size
  textAlign: "center",
};

export default PlayerActions;
