import MapComponent from "../MapComponent";
import Button from "./UI/Button";
import ZonesNav from "./ZonesNav";
export default function Map() {
  return (
    <section
      id="map"
      style={{ overflow: "hidden" }}
      className="relative w-full lg:w-[70%] h-[38rem] border-2 border-dark-purple-x bg-white rounded-3xl"
    >
      <nav
        style={{ zIndex: 990 }}
        className="w-1/4 absolute bottom-4 right-4 flex flex-col gap-2"
      >
        <ZonesNav />
        <button
          id="panic"
          className="w-full bg-red-600 hover:bg-red-700 text-center py-2 text-white text-2xl rounded-2xl"
        >
          Panic
        </button>
      </nav>
      <MapComponent></MapComponent>
      <nav
        className="flex justify-center items-center absolute bottom-6 left-6"
        style={{ zIndex: 999 }}
      >
        <div className="hidden xl:block">
          <Button>Current Location Alerts</Button>
          <Button>All India Alerts</Button>
          <Button>Locate Rescue Camps</Button>
        </div>
      </nav>
    </section>
  );
}
