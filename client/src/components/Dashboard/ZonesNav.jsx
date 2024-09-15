import React, { useState } from "react";
import Button from "./UI/Button";

function ZonesNav() {

    const [showNav, setShowNav] = useState(false);


  return (
    <div className="flex items-center justify-end">
      <nav
        className={`${showNav? 'block': 'hidden'} absolute bottom-24`}
        style={{ zIndex: 999 }}
      >
        <div className="flex flex-col items-end gap-2  mb-4">
          <Button>Current Location Alerts</Button>
          <Button>All India Alerts</Button>
          <Button>Locate Rescue Camps</Button>
        </div>
      </nav>
      <Button classes="mr-2 lg:mr-4 text-nowrap">
        Zones <i className="fa-solid fa-caret-up ml-1 lg:ml-2"></i>
      </Button>
      <Button onClick={() => setShowNav(prevState => !prevState)} styles={{ zIndex: 999 }} classes="xl:hidden">
        <i className="fa-solid fa-plus"></i>
      </Button>
    </div>
  );
}

export default ZonesNav;
