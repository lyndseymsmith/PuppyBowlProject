import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function SinglePlayer() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getPlayer() {
      setError(null);
      setLoading(true);
      try {
        const response = await fetch(
          `https://fsa-puppy-bowl.herokuapp.com/api/2501-FTB-ET-WEB-PT/players/${id}`
        );
        const data = await response.json();
        console.log(data);
        setPlayer(data.data.player);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching player:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    getPlayer();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!player) return <p>No player found</p>;

  const { name, imageUrl, breed, status } = player;

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://fsa-puppy-bowl.herokuapp.com/api/2501-FTB-ET-WEB-PT/players/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete player");
      }
      navigate("/");
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  }

  return (
    <>
     
      {player && (
        <div className="single-player"
        key={player.id}>
          <h2>{name}</h2>
          <img
            src={imageUrl}
            style={{ height: "400px" }}
            alt={name}
          />
          <p>Breed: {breed}</p>
          <p>Status: {status}</p>
          {player.team?.name ? (
            <p>Team: {player.team.name}</p>
          ) : (
            <p>Team ID: {player.teamId || "Unassigned"}</p>
          )}
          <button onClick={() => navigate("/")}>Back to All Players</button>
          <button onClick={handleDelete}>Delete Player</button>
        </div>
      )}
    </>
  );
}

export default SinglePlayer;
