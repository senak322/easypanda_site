import React from "react";
import "./Main.scss";

interface MainProps {
  children: React.ReactNode;
}

function Main({ children }: MainProps) {
  return (
    <main className="main">
      <h1 className="main__header">Currency exchange</h1>
      {children}
    </main>
  );
}

export default Main;
