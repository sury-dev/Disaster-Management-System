import React from "react";

function Button({ styles, classes, children }) {
  return (
    <button style={styles} className={`bg-dark-purple hover:bg-dark-purple-x text-white rounded-lg px-4 py-1 mr-4 ${classes}`}>
      {children}
    </button>
  );
}

export default Button;
