"use client";

import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-800 text-center pb-4 pt-4 border-t border-slate-600 fixed bottom-0 w-full text-white">
      Page was created by{" "}
      <a
        href="https://github.com/GeoX23"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500"
      >
        GeoX
      </a>
    </div>
  );
};

export default Footer;
