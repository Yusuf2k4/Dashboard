import React from "react";

const TopPlayers = ({ title, img, playerName, provided, title2 }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-red-500 p-6 rounded-lg shadow-lg text-center flex flex-col items-center">
      {/* Title */}
      <div className="text-xl font-bold text-white">{title}</div>

      {/* Divider */}
      <div className="my-4 border-b-2 border-gray-300 w-3/4 mx-auto"></div>

      {/* Player Image */}
      <div className="mb-4">
        <img
          src={img} // Replace with the actual image URL
          alt="Player"
          className="mx-auto w-32 h-32 object-cover rounded-full border-4 border-white"
        />
      </div>

      {/* Player Name */}
      <div className="text-lg font-semibold text-white">{playerName}</div>

      {/* Goals */}
      <div className="text-md text-gray-200">
        {title2}: {provided}
      </div>
    </div>
  );
};

export default TopPlayers;
 