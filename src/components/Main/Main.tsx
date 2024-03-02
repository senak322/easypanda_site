import React from "react";
import "./Main.scss";
import Rools from "../Rools/Rools";

interface MainProps {
  children: React.ReactNode;
}

function Main({ children }: MainProps) {
  return (
    <main className="main">
      <h1 className="main__header">Currency exchange</h1>
      {children}
      <Rools />
    </main>
  );
}

export default Main;
