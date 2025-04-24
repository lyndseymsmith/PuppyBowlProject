import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewPlayerForm() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("bench");
  const [teamId, setTeamId] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const payload = { name, breed };
    if (status) payload.status = status;
    if (imageUrl.trim() !== "") payload.imageUrl = imageUrl.trim();
    if (teamId.trim() !== "") payload.teamId = Number(teamId);

    console.log("POST payload:", payload);

    try {
      const res = await fetch(
        "https://fsa-puppy-bowl.herokuapp.com/api/2501-FTB-ET-WEB-PT/players",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error?.message || "Failed to create player");
      }
      await res.json();
      navigate("/");
    } catch (err) {
      console.error("Invite error:", err);
      setError(err.message);
    }
  };

  return (
    <div className="new-player-form">
      <h1>Invite New Player</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name*</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="breed">Breed*</label>
        <input
          id="breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          required
        />

        <label htmlFor="imageUrl">Image URL</label>
        <input
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="bench">Bench</option>
          <option value="field">Field</option>
        </select>

        <label htmlFor="teamId">Team ID (optional)</label>
        <input
          id="teamId"
          type="number"
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
        />

        {error && <p className="error">Error: {error}</p>}

        <button type="submit">Add Player</button>
      </form>
    </div>
  );
}

export default NewPlayerForm;
