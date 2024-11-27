import React, { useState, useEffect } from "react";
import { upcomingMatches } from "../../assets/data/matches.js";

function Matches() {
  const [selectedColors, setSelectedColors] = useState(Array(4).fill(null));
  const [matches, setMatches] = useState([]);
  const [displayedMatches, setDisplayedMatches] = useState([]);
  const [matchIndex, setMatchIndex] = useState(0);

  useEffect(() => {
    const storedMatches = JSON.parse(localStorage.getItem('upcomingMatches')) || upcomingMatches;
    const storedMatchIndex = JSON.parse(localStorage.getItem('matchIndex')) || 0;
    
    setMatches(storedMatches);
    setMatchIndex(storedMatchIndex);

    const initialDisplay = storedMatches.slice(storedMatchIndex).filter(match => !match.Result).slice(0, 4);
    setDisplayedMatches(initialDisplay);
  }, []);

  useEffect(() => {
    if (matches.length > 0) {
      localStorage.setItem('upcomingMatches', JSON.stringify(matches));
      localStorage.setItem('matchIndex', JSON.stringify(matchIndex));
    }
  }, [matches, matchIndex]);

  const handleVsClick = (index) => {
    const updatedColors = [...selectedColors];
    updatedColors[index] = "choose";
    setSelectedColors(updatedColors);
  };

  const handleColorSelect = (index, color) => {
    const updatedColors = [...selectedColors];
    updatedColors[index] = color;
    setSelectedColors(updatedColors);

    const updatedMatches = [...matches];
    const displayedMatchIndex = matchIndex + index;

    if (color === "green") {
      updatedMatches[displayedMatchIndex].Result = "W";
    } else if (color === "gray") {
      updatedMatches[displayedMatchIndex].Result = "D";
    } else if (color === "red") {
      updatedMatches[displayedMatchIndex].Result = "L";
    }

    setMatches(updatedMatches);

    // Set a delay before immediately removing the match
    setTimeout(() => {
      const newDisplayedMatches = [...displayedMatches];
      newDisplayedMatches.splice(index, 1);

      if (matchIndex + newDisplayedMatches.length < updatedMatches.length) {
        newDisplayedMatches.push(updatedMatches[matchIndex + newDisplayedMatches.length]);
        setMatchIndex(matchIndex + 1);
      }

      setDisplayedMatches(newDisplayedMatches);
      setSelectedColors(Array(newDisplayedMatches.length).fill(null));
    }, 1000); // 1 second delay before removal effect
  };

  return (
    <div className="flex flex-col items-center min-h-screen gap-y-4 mt-3">
      {displayedMatches.map((match, index) => (
        <div
          key={index}
          className={`rounded-lg shadow-md w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg flex items-center justify-between p-4 ${
            selectedColors[index] && selectedColors[index] !== "choose"
              ? `bg-${selectedColors[index]}-500`
              : "bg-slate-700"
          }`}
        >
          {match.atHome ? (
            <>
              <img
                src={match.imgopponent}
                alt="Opponent"
                className="w-12 h-12 object-cover"
              />
              {!selectedColors[index] || selectedColors[index] !== "choose" ? (
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                  onClick={() => handleVsClick(index)}
                >
                  vs
                </button>
              ) : (
                <div className="flex w-full justify-around">
                  <div
                    className="flex-1 h-12 bg-green-500 cursor-pointer"
                    onClick={() => handleColorSelect(index, "green")}
                  ></div>
                  <div
                    className="flex-1 h-12 bg-gray-500 cursor-pointer"
                    onClick={() => handleColorSelect(index, "gray")}
                  ></div>
                  <div
                    className="flex-1 h-12 bg-red-500 cursor-pointer"
                    onClick={() => handleColorSelect(index, "red")}
                  ></div>
                </div>
              )}
              <img
                src={match.imgBarca}
                alt="Barca"
                className="w-12 h-12 object-cover"
              />
            </>
          ) : (
            <>
              <img
                src={match.imgBarca}
                alt="Barca"
                className="w-12 h-12 object-cover"
              />
              {!selectedColors[index] || selectedColors[index] !== "choose" ? (
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                  onClick={() => handleVsClick(index)}
                >
                  vs
                </button>
              ) : (
                <div className="flex w-full justify-around">
                  <div
                    className="flex-1 h-12 bg-green-500 cursor-pointer"
                    onClick={() => handleColorSelect(index, "green")}
                  ></div>
                  <div
                    className="flex-1 h-12 bg-gray-500 cursor-pointer"
                    onClick={() => handleColorSelect(index, "gray")}
                  ></div>
                  <div
                    className="flex-1 h-12 bg-red-500 cursor-pointer"
                    onClick={() => handleColorSelect(index, "red")}
                  ></div>
                </div>
              )}
              <img
                src={match.imgopponent}
                alt="Opponent"
                className="w-12 h-12 object-cover"
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Matches;
