import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import MainRoute from "./MainRoute";
import { StoreProvider } from "./store/AppContext";
import { execApi } from "./services/api";
declare global {
  interface Window {
    _token: string;
  }
}

function App() {
  useEffect(() => {
    const token = localStorage.getItem("GSI_token");
    if (token) window._token = token;
  }, []);
  return (
    <StoreProvider>
      <MainRoute></MainRoute>
    </StoreProvider>
  );
}

export default App;
