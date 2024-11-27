import logo from "../assets/images/logo.jpg";
import titles from "../assets/images/titles.png";
import Matches from "../components/Home/Matches";
import Transfer from "../components/Home/Transfer";
import TransferWindow from "../components/Home/TransferWindow";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <img src={logo} alt=""  />
      <div className="flex flex-row justify-between">
        <div className="bg-gray-800 h-96 w-1/4 ml-10 rounded-2xl mt-4 mb-2">
          <h4 className="text-white text-2xl font-semibold mb-4 tracking-wide text-center">
            Upcoming Matches
          </h4>
          <Matches></Matches>
        </div>

        <div className="pt-20 flex flex-col items-center ml-10 ">
          <h4 className="text-white text-2xl font-semibold mb-4 tracking-wide text-center">
            Net Transfer
          </h4>
          <Transfer />
        </div>

        <div className="bg-gray-800 h-96 w-1/4 ml-10 rounded-2xl mt-4 mb-2 mr-10 p-4 flex flex-col">
          <TransferWindow></TransferWindow>
        </div>
      </div>
      <img src={titles} className="mt-20 " alt="" />
    </div>
  );
};

export default HomePage;
