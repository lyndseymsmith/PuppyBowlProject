import fetchAllPlayers from "../API";
import { useEffect, useState } from "react";
import PlayerCard from "./PlayerCard";

function AllPlayers() {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getPlayers() {
      try {
        const response = await fetchAllPlayers();
        const data = await response.json();
        console.log(data);
        setPlayers(data.data.players);
      } catch (error) {
        setError(error);
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    }
    getPlayers();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (players.length === 0) {
    return <div>No players found.</div>;
  }

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="all-players">

      <input
        type="text"
        placeholder="Search players..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem",
          width: "100%",
          maxWidth: "400px",
        }}
      />

      {filteredPlayers.length > 0 ? (
        <div className="players-list">
          {filteredPlayers.map((player) => (
            <PlayerCard
              key={player.id}
              id={player.id}
              name={player.name}
              imageUrl={player.imageUrl}
            />
          ))}
        </div>
      ) : (
        <p>No matching players found.</p>
      )}
    </div>
  );
}

export default AllPlayers;
