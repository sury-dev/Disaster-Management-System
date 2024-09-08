import { useState } from "react";
import Header from "./Dashboard/Header";
import AskAI from "./Dashboard/AskAI";
import Map from "./Dashboard/Map";
import Aside from "./Dashboard/Aside";

function UserDashboard() {
  const [chatIsOpen, setChatIsOpen] = useState(false);

  return (
    <>
      <Header />
      <AskAI open={chatIsOpen} closeModal={() => setChatIsOpen(false)} />
      <main className="px-8 flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-0">
        <Map />
        <Aside />
        <button
          onClick={() => setChatIsOpen(true)}
          style={{ zIndex: 999 }}
          className="fixed bottom-16 left-4 w-24 h-24 rounded-full outline-none bg-dark-purple hover:bg-dark-purple-x hover:scale-110 duration-100 text-white text-4xl"
        >
          <i className="fa fa-phone" aria-hidden="true"></i>
        </button>
      </main>
    </>
  );
}

export default UserDashboard;

// import React from 'react';
// import MapComponent from './MapComponent';

// const UserDashboard = () => {
//     return (
//         <div>
//             <h1>User Dashboard</h1>
//             <p>Welcome to the user dashboard.</p>
//             <MapComponent></MapComponent>
//         </div>
//     );
// };

// export default UserDashboard;
