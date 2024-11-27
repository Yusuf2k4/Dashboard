import React from "react";
import injuredIcon from "../../../assets/images/Logo/injury.png";
import fullFitnessIcon from "../../../assets/images/Logo/fit.png";

const FitnessToggle = ({ player, handleFitnessToggle }) => {
  return (
    <div style={fitnessToggleStyle}>
      <button
        onClick={() => handleFitnessToggle(player.id)}
        style={{
          ...buttonStyle,
          backgroundColor: player.isFit ? "green" : "red",
        }}
      >
        <img
          src={player.isFit ? injuredIcon : fullFitnessIcon}
          alt={player.isFit ? "Injured" : "Full Fitness"}
          style={imgStyle}
        />
      </button>
    </div>
  );
};

const fitnessToggleStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
};

const buttonStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
  fontSize: "14px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  color: "#fff",
  textAlign: "center",
};

const imgStyle = {
  width: "20px",
  height: "20px",
};

export default FitnessToggle;
