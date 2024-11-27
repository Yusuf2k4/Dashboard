import React from "react";

const PlayerDetails = ({ player, editPlayer, newName, newAge, newContract, setNewName, setNewAge, setNewContract }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
      <img
        src={player.img}
        alt={player.PlayerName}
        style={{ width: "80px", height: "80px", borderRadius: "50%" }}
      />
      <div>
        <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "600" }}>
          {editPlayer === player.id ? (
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              style={{
                fontSize: "20px",
                color: "white",
                backgroundColor: "#333",
                border: "1px solid #555",
                padding: "5px",
              }}
            />
          ) : (
            player.PlayerName
          )}
        </h3>
        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          Age:{" "}
          {editPlayer === player.id ? (
            <select
              value={newAge}
              onChange={(e) => setNewAge(parseInt(e.target.value, 10))}
              style={{
                fontSize: "14px",
                backgroundColor: "#333",
                border: "1px solid #555",
                padding: "5px",
                color: "white",
              }}
            >
              {Array.from({ length: 41 - player.age }, (v, k) => k + player.age).map((age) => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>
          ) : (
            player.age
          )}
        </p>

        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          Contract Till:{" "}
          {editPlayer === player.id ? (
            <select
              value={newContract}
              onChange={(e) => setNewContract(e.target.value)}
              style={{
                fontSize: "14px",
                backgroundColor: "#333",
                border: "1px solid #555",
                padding: "5px",
                color: "white",
              }}
            >
              {Array.from({ length: 6 }, (v, k) => k + parseInt(player.boughtTill) + 1).map(
                (year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                )
              )}
            </select>
          ) : (
            player.boughtTill
          )}
        </p>
      </div>
    </div>
  );
};

export default PlayerDetails;
