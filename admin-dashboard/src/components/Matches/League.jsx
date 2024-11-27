import React, { useState, useEffect } from 'react';
import { upcomingMatches } from '../../assets/data/matches.js';

const League = ({ leagueType, bgGradient }) => {
  const [leagueMatches, setLeagueMatches] = useState([]);

  useEffect(() => {
    const storedMatches = JSON.parse(localStorage.getItem('upcomingMatches')) || upcomingMatches;
    setLeagueMatches(storedMatches.filter((match) => match.league === leagueType));
  }, [leagueType]);

  return (
    <div className={`w-full p-4 ${bgGradient} min-h-screen`}>
      {leagueMatches.map((match, index) => {
        let resultClass = '';
        if (match.Result === 'W') {
          resultClass = 'bg-gradient-to-r from-green-400 to-green-600';
        } else if (match.Result === 'L') {
          resultClass = 'bg-gradient-to-r from-red-500 to-red-700';
        } else if (match.Result === 'D') {
          resultClass = 'bg-gradient-to-r from-gray-300 to-gray-500';
        } else {
          resultClass = 'bg-[#222222]';
        }

        return (
          <div
            key={index}
            className={`flex flex-col w-full px-4 py-6 rounded-xl shadow-md mb-4 ${resultClass}`}
          >
            <div className="flex justify-between items-center w-full mb-2">
              <div className="flex items-center space-x-4">
                <img
                  src={match.atHome ? match.imgBarca : match.imgopponent}
                  alt="Team 1"
                  className="w-12 h-12 object-contain"
                />
                <p className="text-base font-semibold text-white">
                  {match.atHome ? 'Barcelona' : match.match.split(' vs ')[0]}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="border-l-4 h-16 border-gray-200 mx-4"></div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">{match.date}</p>
                  <p className="text-lg font-medium text-white">{match.time}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <img
                src={match.atHome ? match.imgopponent : match.imgBarca}
                alt="Team 2"
                className="w-12 h-12 object-contain"
              />
              <p className="text-base font-semibold text-white">
                {match.atHome ? match.match.split(' vs ')[1] : match.match.split(' vs ')[1]}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default League;
