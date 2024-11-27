import React from 'react';
import League from '../components/Matches/League.jsx';

const LeaguePage = () => {
  return (
    <div>
      <League leagueType={true} bgGradient="bg-gradient-to-r from-purple-800 to-pink-400" />
    </div>
  );
};

export default LeaguePage;
