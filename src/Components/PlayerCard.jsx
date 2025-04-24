import { useNavigate } from "react-router-dom";

function PlayerCard({ id, name, imageUrl }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/players/${id}`);
  };

  const player = {
    id: id,
    name: name,
    imageUrl: imageUrl,
  };

  return (
    <>
      <div className="player-card">
        {imageUrl ? (
          <img src={imageUrl} alt={name} />
        ) : (
          <img
            src="https://learndotresources.s3.amazonaws.com/workshop/60ad725bbe74cd0004a6cba0/puppybowl-default-dog.png"
            alt="default-image"
          />
        )}
        <button onClick={handleClick}>{name}</button>
      </div>
    </>
  );
}

export default PlayerCard;
