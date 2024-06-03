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
  const [listTitle, setListTitle] = useState({});

  const handleTitleChange = (e) => {
    setListTitle(e.target.value);
  };

  const handleItemChange = (e) => {
    setItems(e.target.value.split("\n"));
    if (e.target.value == "") {
      setItems({});
    }
  };

  const handleNameChange = (e) => {
    setNames(e.target.value.split("\n"));
    if (e.target.value == "") {
      setNames({});
    }
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

    // set Results and History
    const historyResults =
      JSON.parse(localStorage.getItem("lootHistory")) || [];

    let currentTime = new Date().toLocaleTimeString();
    const key = listTitle + " " + currentTime;
    const newResult = { key, results };
    historyResults.push(newResult);
    localStorage.setItem("lootHistory", JSON.stringify(historyResults));

    setNoItems[remainingNames];
    setDisplayResults(true);
    setTempResults(results);
    setResults({});
  };

  // Copy to clipboard Function
  const copyToClipboard = () => {
    const textsResults =
      document.getElementsByClassName("resultsText")[0].innerText;
    navigator.clipboard
      .writeText(textsResults)
      .then(() => {
        console.log("Text copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
      });
  };

  return (
    <div className=" bg-slate-800 text-center p-10 pb-20">
      <a
        href="https://mithrilmines.eu/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* <Image
          src="https://mithrilmines.eu/images/logo.png"
          width="200"
          height="200"
          alt="mithrilMines Logo"
          className="m-auto mb-8"
        /> */}
        <div id="logo"></div>
      </a>
      <h1 className="text-white text-4xl mb-4 mt-6">L2 - Share Loot</h1>
      <div className="flex justify-center items-center flex-col h-100 m-auto">
        <textarea
          name="Loot Title"
          className=" bg-slate-50 text-slate-900 input input-bordered w-full max-w-xs h-fit mb-4 text-center"
          placeholder="List title (eg. Lilith 08/06/2024)"
          rows={1}
          onChange={handleTitleChange}
        ></textarea>
        <div className="flex gap-4 items-start m-auto justify-center">
          <div className="w-[50%]">
            <textarea
              placeholder="Enter items (one per line)"
              onChange={handleItemChange}
              rows={20}
              className=" bg-slate-50 text-slate-900 input input-bordered w-full max-w-xs h-fit"
            />
            {items.length > 0 && (
              <span className="text-white font-medium">
                Items - {items.length}
              </span>
            )}
          </div>
          <div className="w-[50%]">
            <textarea
              placeholder="Enter names (one per line)"
              onChange={handleNameChange}
              rows={20}
              className="bg-slate-50 text-slate-900 input input-bordered w-full max-w-xs h-fit"
            />
            {names.length > 0 && (
              <span className="text-white font-medium">
                Players - {names.length}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={handleMatch}
          className="btn-primary btn block m-auto mt-4"
          disabled={
            items.length >= 1 && names.length >= 1 && listTitle.length >= 1
              ? false
              : true
          }
        >
          Share Loot
        </button>
        {displayResults && (
          <div className="resultsText">
            <h2 className="mt-4 text-lg font-bold text-white">
              Congratulations:
            </h2>
            <div className="text-white text-lg underline font-bold">
              Rewards from {listTitle}
            </div>
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

        {displayResults && (
          <div>
            <button
              className="btn_copyToClipboard fixed right-2 bottom-20 btn rounded-full p-3 flex justify-center items-center h-fit drop-shadow-xl"
              onClick={copyToClipboard}
            >
              <img width="32" height="32" src="/copy.png" alt="copy-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
