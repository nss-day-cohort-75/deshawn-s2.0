import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAssignableDogs, assignDogToWalker } from "../apiManager";

export default function AssignDog() {
  const { id } = useParams(); // walkerId
  const navigate = useNavigate();

  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAssignableDogs(id)
      .then(setDogs)
      .catch(() => setError("Failed to load assignable dogs"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAssign = async (dogId) => {
    try {
      await assignDogToWalker(id, dogId);
      navigate(`/dogs/${dogId}`);
    } catch {
      alert("Failed to assign walker to dog.");
    }
  };

  if (loading) return <p className="m-4">Loading dogs...</p>;
  if (error) return <p className="m-4 text-danger">{error}</p>;
  if (!dogs.length) return <p className="m-4">No available dogs to assign.</p>;

  return (
    <div className="container mt-4">
      <h2>Assign a Dog</h2>
      <ul className="list-group">
        {dogs.map((dog) => (
          <li
            key={dog.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {dog.name}
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleAssign(dog.id)}
            >
              Assign
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
