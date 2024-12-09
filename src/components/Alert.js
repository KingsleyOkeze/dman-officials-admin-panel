import React from 'react';
import { MdError } from 'react-icons/md';
import { IoIosCheckmarkCircle } from "react-icons/io";
import "../styles/components-styles/Alert.css"




function Alert({ status, title, message }) {
  return (
    <div className={`${status === "success" ? "success-alert-container" : "error-alert-container"}`}>
      {
        status === "success" ? <IoIosCheckmarkCircle className="alert-icon"/> :
        <MdError className="alert-icon" />
      }
      <div className="alert-message-container">
        <p>{title}</p>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Alert;
