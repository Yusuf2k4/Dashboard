import React from "react";

const PlayersInfo = ({ title, info, className }) => {
  return (
    <div className={`p-6 rounded-lg shadow-md w-48 text-center mx-auto mb-6 ${className}`}>
      {/* Title */}
      <div className="text-lg font-semibold text-gray-800 ">{title}</div>

      {/* Divider */}
      <div className="my-2 border-t-2 border-gray-300"></div>

      {/* Number */}
      <div className="text-xl font-bold text-gray-900">{info}</div>
    </div>
  );
};

export default PlayersInfo;
