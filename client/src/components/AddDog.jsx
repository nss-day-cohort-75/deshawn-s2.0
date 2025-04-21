import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddDog() {
  const [name, setName] = useState("");
  const [walkerId, setWalkerId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dogToAdd = {
      name,
      walkerId: walkerId ? parseInt(walkerId) : null,
    };

    const res = await fetch("/api/dogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dogToAdd),
    });

    if (res.ok) {
      const createdDog = await res.json();
      navigate(`/dogs/${createdDog.id}`);
    } else {
      alert("Failed to add dog");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add a New Dog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="dogName" className="form-label">Dog Name</label>
          <input
            type="text"
            id="dogName"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="walkerId" className="form-label">Walker ID (optional)</label>
          <input
            type="number"
            id="walkerId"
            className="form-control"
            value={walkerId}
            onChange={(e) => setWalkerId(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
