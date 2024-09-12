import MapComponent from "../MapComponent";
export default function Map() {
  return (
    <section
      id="map" style={{overflow : 'hidden'}}
      className="relative w-full lg:w-[70%] h-[38rem] border-2 border-dark-purple-x bg-white rounded-3xl"
    >
      <button id="panic" style={{zIndex : 990}} className="absolute bottom-4 right-4 w-1/4 bg-red-600 hover:bg-red-700 text-center py-2 text-white text-2xl rounded-2xl">
        Panic
      </button>
      <MapComponent></MapComponent>
    </section>
  );
}