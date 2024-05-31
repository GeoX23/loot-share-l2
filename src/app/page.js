"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [items, setItems] = useState([]);
  const [names, setNames] = useState([]);
  const [displayResults, setDisplayResults] = useState(false);
  const [results, setResults] = useState({});
  const [tempResults, setTempResults] = useState({});
  const [noItems, setNoItems] = useState({});

  const handleItemChange = (e) => {
    setItems(e.target.value.split("\n"));
  };

  const handleNameChange = (e) => {
    setNames(e.target.value.split("\n"));
  };

  // Shuffle the arrays randomly
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Shuffle both items and names arrays
  shuffleArray(items);
  shuffleArray(names);

  const handleMatch = () => {
    // Implement your matching logic here
    // Randomly assign items to names
    // Ensure each name has at least one match

    for (let i = 0; i < items.length; i++) {
      const itemName = items[i];
      const name = names[i % names.length]; // Cycle through names

      if (!results[name]) {
        results[name] = [];
      }
      results[name].push(itemName);
    }
    const allNames = new Set(names);
    const matchedNames = new Set(Object.keys(results));
    const remainingNames = Array.from(allNames).filter(
      (name) => !matchedNames.has(name)
    );
    setNoItems[remainingNames];
    setDisplayResults(true);
    setTempResults(results);
    setResults({});
  };

  return (
    <div className=" bg-slate-800 text-center p-10 pb-20">
      <a
        href="https://mithrilmines.eu/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="https://mithrilmines.eu/images/logo.png"
          width="200"
          height="200"
          alt="mithrilMines Logo"
          className="m-auto mb-8"
        />
      </a>
      <h1 className="text-white text-4xl mb-4">L2 - Share Loot</h1>
      <div className="flex justify-center items-center flex-col h-100 m-auto">
        <div className="flex gap-4 items-center m-auto justify-center">
          <textarea
            placeholder="Enter items (one per line)"
            onChange={handleItemChange}
            rows={20}
            className=" bg-slate-50 text-slate-900 input input-bordered w-full max-w-xs h-fit"
          />
          <textarea
            placeholder="Enter names (one per line)"
            onChange={handleNameChange}
            rows={20}
            className=" bg-slate-50 text-slate-900 input input-bordered w-full max-w-xs h-fit"
          />
        </div>
        <button
          onClick={handleMatch}
          className="btn-primary btn block m-auto mt-4"
        >
          Share Loot
        </button>
        {displayResults && (
          <div>
            <h2 className="mt-4 text-lg font-bold">Congratulations:</h2>
            {Object.keys(tempResults).map((name) => (
              <div
                key={name}
                className="text-white bg-slate-900 m-1.5 p-1 rounded border-l-4 border-yellow-400"
              >
                <strong className=" text-blue-400">{name}</strong> παίρνει το
                αντικείμενο:{" "}
                <strong className=" text-blue-400">
                  {tempResults[name].join(" |  ")}
                </strong>
              </div>
            ))}
            {/* <div>
            <h2>Unmatched Names:</h2>
            {Object.keys(noItems).map((name) => (
              <div key={name}>{name}</div>
            ))}
          </div> */}
          </div>
        )}
      </div>
    </div>
  );
}
