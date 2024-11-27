import React, { useState } from "react";

const UserCard = ({ imageSrc, name, userId, amountPaid }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex items-center border border-gray-700 rounded-lg p-4 shadow-md hover:bg-gray-800 transition mt-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left side - Image */}
      <img
        src={imageSrc}
        alt={`${name}`}
        className="w-16 h-16 object-cover rounded-full"
      />

      {/* Right side - Details */}
      <div className="ml-4 flex-1">
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-gray-400">No: #{userId}</p>
      </div>

      {/* Hover information - Applied only to the right side */}
      <div
        className={`absolute right-0 top-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-lg font-medium rounded-r-lg p-4 transition-all ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        Paid: ${amountPaid}M
      </div>
    </div>
  );
};

export default UserCard;
