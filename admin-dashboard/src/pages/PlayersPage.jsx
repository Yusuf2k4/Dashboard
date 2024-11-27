import React, { useState, useEffect } from "react";
import TopPlayers from "../components/Players/TopPlayers";
import lamineYamal from "../assets/images/topPlayers/lamineYamal.png";
import robertLewandowski from "../assets/images/topPlayers/robertLewandowski.png";
import raphinha from "../assets/images/topPlayers/raphinha.png";
import PlayersInfo from "../components/Players/PlayersInfo";
import { players as initialPlayers } from "../assets/data/players.js";
import AllPlayers from "../components/Players/AllPlayers/AllPlayers.jsx";

const PlayersPage = () => {
  // Load players from localStorage or use initial players
  const [players, setPlayers] = useState(() => {
    const savedPlayers = localStorage.getItem("players");
    return savedPlayers ? JSON.parse(savedPlayers) : initialPlayers;
  });

  // Calculate fit and injured players based on the loaded players
  const fitPlayersCount = players.filter((player) => player.isFit).length;
  const injuredPlayersCount = players.length - fitPlayersCount;

  // Save players to localStorage whenever the players data changes
  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Grid Layout with 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Reuse TopPlayers component to show 3 cards */}
        <TopPlayers
          title="Most Goals"
          img={robertLewandowski}
          playerName="Robert Lewandowski"
          provided={20}
          title2="Goals"
        />
        <TopPlayers
          title="Most Assists"
          img={lamineYamal}
          playerName="Lamine Yamal"
          provided={8}
          title2="Assists"
        />
        <TopPlayers
          title="Most Goals and Assists"
          img={raphinha}
          playerName="Raphinha"
          provided={21}
          title2="Goals and Assists"
        />
      </div>

      {/* Additional Player Information */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <PlayersInfo
          title="Total Players"
          info={players.length}
          className="bg-gradient-to-r from-blue-500 to-red-500"
        />
        <PlayersInfo
          title="Fit Players"
          info={fitPlayersCount}
          className="bg-green-500"
        />
        <PlayersInfo
          title="Injured Players"
          info={injuredPlayersCount}
          className="bg-red-300"
        />
      </div>

      <div>
        <AllPlayers players={players} setPlayers={setPlayers} />
      </div>
    </div>
  );
};

export default PlayersPage;
