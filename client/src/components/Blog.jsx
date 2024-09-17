import React from "react";
import Header from "./Dashboard/Header";
import { DISASTER_DATA } from "../disaster_blog";

function Blog() {
  return (
    <main className="w-full min-h-screen pb-16 mb-0">
      <header className="px-16 my-8 flex justify-between items-center">
        <div id="blog-heading">
          <h2 className="text-5xl font-bold text-dark-purple mb-2 flex gap-4 items-center"><span><i id="logo-spin" className="fa-solid fa-history text-5xl text-yellow-500"></i></span><span>GeoLog</span></h2>
          <p className="text-xl text-gray-500">
            Strategies for Effective Disaster Management
          </p>
        </div>
        <div className="flex items-center">
            <input type="text" placeholder="Search" className="h-12 p-4 text-xl outline-dark-purple" />
            <i className="fa-solid fa-circle-user ml-2 text-4xl text-dark-purple hover:text-dark-purple-x duration-100 w-12 h-12 grid place-items-center"></i>
        </div>
      </header>
      <ul className="w-full flex flex-wrap gap-4 justify-center">
        {DISASTER_DATA.map((data) => {
          return (
            <li
              key={data.id}
              className="w-[80%] md:w-[40%] lg:w-[30%] h-90 border-black p-8 shadow-xl hover:shadow-2xl duration-100"
            >
              <header className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gray-500 rounded-full grid place-items-center text-2xl text-white">
                  J
                </div>
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
