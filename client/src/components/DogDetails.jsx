import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DogDetails() {
  const { id } = useParams();
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/dogs/${id}`)
      .then((res) => res.ok ? res.json() : null)
      .then(setDog)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!dog) return <p>Dog not found.</p>;

  return (
    <div className="container mt-4">
      <h2>{dog.name}</h2>
      <p><strong>Walker:</strong> {dog.walkerName ?? "No walker assigned."}</p>
    </div>
  );
}
