import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { recoverVerifyOTPRequest } from "../../APIrequest/APIrequest";
import { ErrorToast } from "../../helper/FormHelper";
import { getEmail } from "../../helper/SessionHelper";
import ReactCodeInput from "react-code-input";
import './VerifyOtp.css'
const VerifyOTP = () => {
  let [OTP, SetOTP] = useState("");
  const navigate = useNavigate();

  const defaultInputStyle = {
    fontFamily: "monospace",
    MozAppearance: "textfield",
    margin: "4px",
    paddingLeft: "8px",
    width: "45px",
    borderRadius: "3px",
    height: "45px",
    fontSize: "32px",
    border: "1px solid lightskyblue",
    boxSizing: "border-box",
    color: "black",
    backgroundColor: "white",
    borderColor: "lightgrey",
  };

  const submitOTP = () => {
    if (OTP.length === 6) {
      recoverVerifyOTPRequest(getEmail(), OTP).then((result) => {
        if (result === true) {
          navigate("/CreatePassword");
        }
      });
    } else {
      ErrorToast("Enter 6 Digit Code");
    }
  };

  return (
    <div>
      <div className="verifyOtp">
        <h4>OTP VERIFICATION </h4>
        <p>A 6 Digit verification code has been sent to your email address. </p>
        <ReactCodeInput
          onChange={(value) => SetOTP(value)}
          inputStyle={defaultInputStyle}
          fields={6}
        />
        <br /> <br />
        <button
          onClick={submitOTP}
          className="btn w-100 animated fadeInUp float-end btn-primary"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP;
