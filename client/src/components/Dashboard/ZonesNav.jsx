import React, { useState } from "react";
import Button from "./UI/Button";

const DUMMY_ZONES = ["Alameda", "Amador", "Calavera", "Contra Costa"];

function ZonesNav() {
  const [showNav, setShowNav] = useState(false);
  const [showZones, setShowZones] = useState(false);

  return (
    <div className="flex items-center justify-end">
      <nav
        className={`${
          showZones ? "block" : "hidden"
        } absolute right-4 bottom-24 rounded-xl bg-dark-purple opacity-90 text-white p-4`}
        style={{ zIndex: 999 }}
      >
        <ul className="flex flex-col items-end gap-2 mb-4">
          {DUMMY_ZONES.map((zone) => {
            return (
              <li
                key={zone}
                className="border-b border-dark-purple hover:border-b hover:border-white"
              >
                <button>{zone}</button>
              </li>
            );
          })}
        </ul>
      </nav>
      <nav
        className={`${showNav ? "block" : "hidden"} absolute bottom-24`}
        style={{ zIndex: 999 }}
      >
        <div className="flex flex-col items-end gap-2 mb-4">
          <Button classes="opacity-90">Current Location Alerts</Button>
          <Button classes="opacity-90">All India Alerts</Button>
          <Button classes="opacity-90">Locate Rescue Camps</Button>
        </div>
      </nav>
      <Button
        onClick={() => {
          setShowZones((prevState) => !prevState);
          setShowNav(false);
        }}
        classes="mr-2 lg:mr-4 text-nowrap"
      >
        Zones{" "}
        {showZones ? (
          <i className="fa-solid fa-caret-down ml-1 lg:ml-2"></i>
        ) : (
          <i className="fa-solid fa-caret-up ml-1 lg:ml-2"></i>
        )}
      </Button>
      <Button
        onClick={() => {
          setShowNav((prevState) => !prevState);
          setShowZones(false);
        }}
        styles={{ zIndex: 999 }}
        classes="xl:hidden"
      >
        <i className="fa-solid fa-plus"></i>
      </Button>
    </div>
  );
}

export default ZonesNav;
