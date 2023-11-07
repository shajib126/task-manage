import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { recoverResetPassRequest } from "../../APIrequest/APIrequest";
import { ErrorToast, isEmpty } from "../../helper/FormHelper";
import { getEmail, getOTP, removeSessions } from "../../helper/SessionHelper";
import './CreatePassword.css'

const CreatePassword = () => {
  let passwordRef,
    confirmPasswordRef = useRef();
  const navigate = useNavigate();

  const resetPass = () => {
    let Password = passwordRef.value;
    let ConfirmPassword = confirmPasswordRef.value;
    if (isEmpty(Password)) {
      ErrorToast("Password Required");
    } else if (isEmpty(ConfirmPassword)) {
      ErrorToast("Confirm Password Required");
    } else if (Password !== ConfirmPassword) {
      ErrorToast("Password & Confirm Password Should be Same");
    } else {
      recoverResetPassRequest(getEmail(), getOTP(), Password).then((result) => {
        if (result === true) {
          // removeSessions()
          navigate("/Login");
        }
      });
    }
  };
  return (
    <div className="craate-password">
     
        <h4>SET NEW PASSWORD</h4>
        <br />
        <label>Your email address</label>
        <input
          readOnly={true}
          value={getEmail()}
          placeholder="User Email"
         
          type="email"
        />
        <br />
        <label>New Password</label>
        <input
          ref={(input) => (passwordRef = input)}
          placeholder="New Password"
         
          type="password"
        />
        <br />
        <label>Confirm Password</label>
        <input
          ref={(input) => (confirmPasswordRef = input)}
          placeholder="Confirm Password"
         
          type="password"
        />
        <br />
        <button
          onClick={resetPass}
         
        >
          Next
        </button>
     
    </div>
  );
};

export default CreatePassword;
