import React from 'react';
import { MdError } from 'react-icons/md';
import "../styles/components-styles/Alert.css"
function Alert() {
  return (
    <div className="alert-container">
      <MdError className="alert-icon" />
      <div className="alert-message-container">
        <p>Error</p>
        <p>Something went wrong please try again</p>
      </div>
    </div>
  );
}

export default Alert;
