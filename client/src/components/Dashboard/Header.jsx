import Link from "./UI/Link";

export default function Header() {
  return (
    <header className="py-4 px-8 flex border justify-between items-center">      
      <h1 className="text-5xl text-center text-dark-purple font-bold"><i className="fas fa-map-marker-alt text-[#FF4500] mr-2"></i><span>GeoAlert</span></h1>
      <nav className="hidden lg:block">
        <Link route="#contact">Contact</Link>
        <Link route="#guide">Guide</Link>
        <Link route="#blog">Blog</Link>
        <Link route="#about">About</Link>
        <Link route="#profile">Profile</Link>        
      </nav>
      <nav className="lg:hidden">
        <button className="text-4xl text-dark-purple"><i className="fa-solid fa-bars"></i></button>
      </nav>
    </header>
  );
}