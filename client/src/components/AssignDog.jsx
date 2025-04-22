import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AssignDog() {
  const { id } = useParams(); // walkerId
  const navigate = useNavigate();

  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/dog-assign?walkerId=${id}`)
      .then((res) => res.ok ? res.json() : [])
      .then(setDogs)
      .finally(() => setLoading(false));
  }, [id]);

  const assignDog = async (dogId) => {
    const res = await fetch(`/api/walkers/${id}/assign-dog/${dogId}`, {
      method: "POST"
    });

    if (res.ok) {
      navigate(`/dogs/${dogId}`);
    } else {
      alert("Failed to assign walker to dog.");
    }
  };

  if (loading) return <p>Loading dogs...</p>;
  if (!dogs.length) return <p>No available dogs to assign.</p>;

  return (
    <div className="container mt-4">
      <h2>Assign a Dog</h2>
      <ul className="list-group">
        {dogs.map((dog) => (
          <li key={dog.id} className="list-group-item d-flex justify-content-between align-items-center">
            {dog.name}
            <button className="btn btn-primary btn-sm" onClick={() => assignDog(dog.id)}>
              Assign
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
