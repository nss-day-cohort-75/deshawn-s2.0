import { useEffect, useState } from "react";
import { getAllCities, getWalkersByCity } from "../apiManager";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export default function Walkers() {
  const [cities, setCities] = useState([]);
  const [walkers, setWalkers] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const toggle = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    getAllCities().then(setCities);
  }, []);

  const handleCitySelect = async (city) => {
    setSelectedCity(city);
    const cityWalkers = await getWalkersByCity(city.id);
    setWalkers(cityWalkers);
  };

  return (
    <div className="container mt-4">
      <h2>🚶 Walkers</h2>

      {/* Dropdown section FIRST */}
      <div className="mb-4">
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>
            {selectedCity ? selectedCity.cityName : "Select a City"}
          </DropdownToggle>
          <DropdownMenu>
            {cities.map((city) => (
              <DropdownItem
                key={city.id}
                onClick={() => handleCitySelect(city)}
              >
                {city.cityName}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Then static city list */}
      <h4 className="mt-3">🌆 All Cities</h4>
      <ul className="list-group mb-4">
        {cities.map((city) => (
          <li key={city.id} className="list-group-item">
            {city.cityName}
          </li>
        ))}
      </ul>

      {/* Then filtered walker results */}
      {selectedCity && (
        <>
          <h4>Walkers in {selectedCity.cityName}</h4>
          <ul className="list-group">
            {walkers.length > 0 ? (
              walkers.map((walker) => (
                <li key={walker.id} className="list-group-item">
                  {walker.walkerName}
                </li>
              ))
            ) : (
              <li className="list-group-item text-muted">
                No walkers available
              </li>
            )}
          </ul>
        </>
      )}
    </div>
  );
}
