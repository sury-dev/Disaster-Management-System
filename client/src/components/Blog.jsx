import React from "react";
import Header from "./Dashboard/Header";
import { DISASTER_DATA } from "../disaster_blog";

function Blog() {
  return (
    <main className="w-full min-h-screen px-20 pb-16 mb-0">
      <header className=" mt-8">
        <h2 className="text-5xl font-bold text-dark-purple mb-8">Blog</h2>        
      </header>
      <ul className="w-full flex flex-wrap gap-4 justify-center">
          {DISASTER_DATA.map((data) => {
            return (
              <li
                id="blog-post"
                key={data.title}
                className="w-[32%] border-2 border-black rounded-xl hover:-translate-y-8 hover:scale-105 duration-75"
              >
                <div className="h-[60%] ">
                  <img
                    src={data.img}
                    alt={data.title}
                    className="h-full w-full rounded-t-xl"
                  />
                </div>
                <div id="content" className="h-[40%] p-4 pb-6">
                  <h3 className="text-2xl mb-2 font-bold">{data.title}</h3>
                  <p className="">{data.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
    </main>
  );
}

export default Blog;
