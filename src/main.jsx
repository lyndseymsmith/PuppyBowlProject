import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import SinglePlayer from "./Components/SinglePlayer.jsx";
import AllPlayers from "./Components/AllPlayers.jsx";
import { Link } from "react-router-dom";
import NewPlayerForm from "./Components/NewPlayerForm.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <nav>
        <Link to="/">All Players</Link>

        <Link to="/players">Create New Player</Link>

      </nav>
      <Routes>
        <Route path="/" element={<AllPlayers />} />
        <Route path="/players/:id" element={<SinglePlayer />} />
        <Route path="/players" element={<NewPlayerForm />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
