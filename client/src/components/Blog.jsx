import React from "react";
import Header from "./Dashboard/Header";
import { DISASTER_DATA } from "../disaster_blog";

function Blog() {
  return (
    <main className="w-full min-h-screen pb-16 mb-0">
      <header className="px-16 my-8">
        <h2 className="text-5xl font-bold text-dark-purple mb-2">GeoLog</h2>
        <p className="text-xl text-gray-500">Strategies for Effective Disaster Management</p>
      </header>
      <ul className="w-full flex flex-wrap gap-4 justify-center">
        {DISASTER_DATA.map((data) => {
          return (
            <li className="w-[30%] h-90 border border-black p-8 hover:shadow-2xl duration-100">
              <header className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gray-500 rounded-full grid place-items-center text-2xl text-white">J</div>
                <p>
                    <span>{data.author}</span>
                </p>
              </header>
              <h2 className="text-4xl font-bold mb-4">{data.title}</h2>
              <p>{data.text}</p>              
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default Blog;
