import { getAllDogs, deleteDog } from "./apiManager";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getAllDogs()
      .then((data) => {
        setDogs(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="m-4">Loading...</p>;
  if (error) return <p className="m-4 text-danger">Not Connected to the API</p>;

  return (
    <div className="container mt-4">
      <h2>🐶 Dogs</h2>

      <div className="d-flex justify-content-end mb-3">
        <Link to="/dogs/new" className="btn btn-success">
          + Add Dog
        </Link>
      </div>

      {dogs.length > 0 ? (
        <ul className="list-group">
          {dogs.map((dog) => (
            <li
              key={dog.id}
              className="list-group-item d-flex justify-content-between"
            >
              <Link to={`/dogs/${dog.id}`}>{dog.name}</Link>
              <button
                className="btn btn-sm btn-danger"
                onClick={async () => {
                  try {
                    await deleteDog(dog.id);
                    setDogs((prev) => prev.filter((d) => d.id !== dog.id));
                  } catch {
                    alert("Failed to murder the dog.");
                  }
                }}
              >
                Murder
              </button>s
            </li>
          ))}
        </ul>
      ) : (
        <p>No dogs found.</p>
      )}
    </div>
  );
}
