import React from "react";

function Button({ styles, classes, children, onClick }) {
  return (
    <button onClick={onClick} style={styles} className={`bg-dark-purple hover:bg-dark-purple-x text-white text-nowrap rounded-lg px-4 py-1 mr-4 ${classes}`}>
      {children}
    </button>
  );
}

export default Button;
