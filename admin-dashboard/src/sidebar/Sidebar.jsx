import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUsers, FaUserPlus, FaChevronDown, FaSpotify } from "react-icons/fa";
import { useAuth } from "../auth/Auth.jsx"; // Import AuthContext
import { SiNike } from "react-icons/si"; // Nike icon from react-icons/si

// Import your custom images
import leagueIcon from "../assets/images/Logo/LaLiga.png";
import uclIcon from "../assets/images/Logo/ucl.png";
import adminIcon from "../assets/images/Logo/adminIcon.png";
import userIcon from "../assets/images/Logo/userIcon.png";

const Sidebar = ({ children }) => {
  const location = useLocation(); // For highlighting the active tab
  const { user, switchRole } = useAuth(); // Get user from AuthContext
  const [dropdownOpen, setDropdownOpen] = useState(false); // Manage dropdown state

  const handleRoleChange = (role) => {
    switchRole(role);
    setDropdownOpen(false); // Close dropdown after selecting role
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-900 shadow-xl fixed h-full top-0 left-0 z-0 flex flex-col justify-between">
        {/* Admin Info and Navigation */}
        <div className="p-6 text-white flex flex-col">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src={user?.role === "admin" ? adminIcon : userIcon}
                alt={user?.role}
                className="w-14 h-14 rounded-full border-2 border-blue-500"
              />
              <div className="ml-4">
                <h1 className="text-2xl font-bold">{user?.role === "admin" ? "Admin" : "User"}</h1>
                {user?.role === "admin" && <p className="text-sm text-gray-400">Admin of Barcelona</p>}
              </div>
            </div>
            <div className="relative">
              <button
                className="flex items-center cursor-pointer bg-gray-800 text-white p-2 rounded-lg"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FaChevronDown />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-gray-700 rounded-md shadow-lg z-10">
                  <div
                    className="flex items-center py-2 px-4 cursor-pointer hover:bg-gray-600"
                    onClick={() => handleRoleChange("admin")}
                  >
                    <img src={adminIcon} alt="Admin" className="w-6 h-6 rounded-full mr-2" />
                    <span>Admin</span>
                  </div>
                  <div
                    className="flex items-center py-2 px-4 cursor-pointer hover:bg-gray-600"
                    onClick={() => handleRoleChange("user")}
                  >
                    <img src={userIcon} alt="User" className="w-6 h-6 rounded-full mr-2" />
                    <span>User</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-8 flex-grow">
            <ul className="space-y-4">
              {user?.role === "admin" && (
                <li>
                  <Link
                    to="/home"
                    className={`flex items-center py-2 px-4 rounded-lg transition-colors ${
                      location.pathname === "/home"
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-800 hover:text-blue-400 text-gray-300"
                    }`}
                  >
                    <FaHome className="mr-2" />
                    Home
                  </Link>
                </li>
              )}

              {user?.role === "admin" && (
                <>
                  {/* Players Section */}
                  <li className="text-gray-300 cursor-default">
                    <span className="block py-2 px-4">Players</span>
                    <ul className="ml-4 space-y-2">
                      <li>
                        <Link
                          to="/players"
                          className={`flex items-center py-2 px-4 rounded-lg transition-colors ${
                            location.pathname === "/players"
                              ? "bg-blue-500 text-white"
                              : "hover:bg-gray-800 hover:text-blue-400 text-gray-300"
                          }`}
                        >
                          <FaUsers className="mr-2" />
                          All Players
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/add-players"
                          className={`flex items-center py-2 px-4 rounded-lg transition-colors ${
                            location.pathname === "/add-players"
                              ? "bg-blue-500 text-white"
                              : "hover:bg-gray-800 hover:text-blue-400 text-gray-300"
                          }`}
                        >
                          <FaUserPlus className="mr-2" />
                          Add Player
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              {/* Matches Section */}
              <li className="text-gray-300 cursor-default">
                <span className="block py-2 px-4">Matches</span>
                <ul className="ml-4 space-y-2">
                  <li>
                    <Link
                      to="/matches/league"
                      className={`flex items-center py-2 px-4 rounded-lg transition-colors ${
                        location.pathname === "/matches/league"
                          ? "bg-blue-500 text-white"
                          : "hover:bg-gray-800 hover:text-blue-400 text-gray-300"
                      }`}
                    >
                      <img src={leagueIcon} alt="League" className="w-5 h-5 mr-2" />
                      League Matches
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/matches/ucl"
                      className={`flex items-center py-2 px-4 rounded-lg transition-colors ${
                        location.pathname === "/matches/ucl"
                          ? "bg-blue-500 text-white"
                          : "hover:bg-gray-800 hover:text-blue-400 text-gray-300"
                      }`}
                    >
                      <img src={uclIcon} alt="UCL" className="w-6 h-6 object-contain mr-2" />
                      UCL Matches
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>

        {/* Footer */}
        <div className="p-6 text-white flex justify-center items-center">
          <a href="https://www.nike.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:opacity-75 text-2xl mx-2">
            <SiNike />
          </a>
          <a href="https://open.spotify.com/genre/0JQ5DAqbMKFzsCGvlWfxyX" target="_blank" rel="noopener noreferrer" className="transition-colors hover:opacity-75 text-2xl mx-2">
            <FaSpotify />
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow ml-[23%] pl-6 overflow-auto">{children}</div> {/* Adjust left margin to prevent overlap */}
    </div>
  );
};

export default Sidebar;
