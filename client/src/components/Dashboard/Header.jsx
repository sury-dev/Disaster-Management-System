import { useState } from "react";
import Link from "./UI/Link";

export default function Header() {

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  return (
    <header className="py-4 px-8 flex border justify-between items-center">
      <h1 className="text-5xl text-center text-dark-purple font-bold">
        <i className="fas fa-map-marker-alt text-[#FF4500] mr-2"></i>
        <span>GeoAlert</span>
      </h1>
      <nav className="hidden lg:block">
        <Link route="#contact">Contact</Link>
        <Link route="#guide">Guide</Link>
        <Link route="#blog">Blog</Link>
        <Link route="#about">About</Link>
        <Link route="#profile">Profile</Link>
      </nav>
      
      <nav className="lg:hidden">
        <button onClick={() => setIsOpenSidebar(true)} className="text-4xl text-dark-purple">
          <i className="fa-solid fa-bars"></i>
        </button>
      </nav>

      <nav className="p-8 z-20 fixed top-0 right-0 bottom-0 w-[90%] sm:w-[60%] lg:hidden h-[100vh] bg-dark-purple text-white text-right text-4xl border-white">
        <button onClick={() => setIsOpenSidebar(false)} className="text-right hover:scale-110 duration-100">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="mt-8 flex flex-col gap-8 text-left">
          <Link route="#contact">Contact</Link>
          <Link route="#guide">Guide</Link>
          <Link route="#blog">Blog</Link>
          <Link route="#about">About</Link>
          <Link route="#profile">Profile</Link>
        </div>
      </nav>
    </header>
  );
}
