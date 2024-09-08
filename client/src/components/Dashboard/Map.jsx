import MapComponent from "../MapComponent";
export default function Map() {
  return (
    <section
      id="map" style={{overflow : 'hidden'}}
      className="relative w-full lg:w-[64%] h-[40rem] border-2 border-dark-purple bg-white rounded-lg"
    >
      <button id="panic" style={{zIndex : 999}} className="absolute bottom-4 right-4 w-1/4 bg-red-600 hover:bg-red-700 text-center py-2 text-white text-2xl rounded-lg">
        Panic
      </button>
      <MapComponent></MapComponent>
    </section>
  );
}