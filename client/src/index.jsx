import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Home from "./Home";
import DogDetails from "./components/DogDetails";
import AddDog from "./components/AddDog";
import Walkers from "./components/Walkers";
import AssignDog from "./components/AssignDog";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="dogs/new" element={<AddDog />} />
        <Route path="dogs/:id" element={<DogDetails />} />
        <Route path="walkers" element={<Walkers />} />
        <Route path="walkers/:id/assign" element={<AssignDog />} />
        <Route path="cities" element={<div>Cities page placeholder</div>} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
