// import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./App.css";
import Header from "./components/Header/Header.jsx";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
      </div>
    </Provider>
  );
}

export default App;
