import React, { useContext } from 'react';
import { MdError } from 'react-icons/md';
import { IoIosCheckmarkCircle } from "react-icons/io";
import "../styles/components-styles/Alert.css"
import { AlertContext } from "../contexts/AlertContext"
import { LiaTimesSolid } from "react-icons/lia";

function Alert() {
  const { customAlert, setCustomAlert } = useContext(AlertContext);

  // Don't render anything if there's no message
  if (!customAlert.message) return null;

  return (
    <div className={`${customAlert.type === "success" ? "success-alert-container" : "error-alert-container"}`}>
      {
        customAlert.type === "success" ? <IoIosCheckmarkCircle className="alert-icon"/> :
        <MdError className="alert-icon" />
      }
      <div className="alert-message-container">
        <p>{customAlert.type}</p>
        <p>{customAlert.message}</p>
      </div>
      <div>
          <LiaTimesSolid 
                onClick={() => {
                    setCustomAlert({ type: null, message: null })
                }}
                className="alert-close-icon"
            />
      </div>
    </div>
  );
}

export default Alert;
