import React from "react";

const Header = ({ title }) => {
  return (
    <header className="bg-indigo-600 text-white py-4 px-6 shadow-md">
      <h1 className="text-xl font-bold">{title}</h1>
    </header>
  );
};

export default Header;
