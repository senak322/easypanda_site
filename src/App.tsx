// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./fonts/fonts.css";
import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import PaymentDetails from "./components/PaymentDetails/PaymentDetails";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/payment-details" element={<PaymentDetails />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
