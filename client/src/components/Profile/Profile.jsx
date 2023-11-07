import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfileDetails, profileUpdateRequest } from "../../APIrequest/APIrequest";
import {
  ErrorToast,
  getBase64,
  isEmail,
  isEmpty,
} from "../../helper/FormHelper";
import './Profile.css'

const Profile = () => {
  let emailRef,
    firstNameRef,
    lastNameRef,
    mobileRef,
    passwordRef,
    userImageRef,
    userImgView = useRef();

  useEffect(() => {
    getProfileDetails();
    console.log(profileData);
  }, []);
  const profileData = useSelector((state) => state.profile.value);
  const navigate = useNavigate();

  const previewImage = () => {
    const imgFile = userImageRef.files[0];
    getBase64(imgFile).then((base64Img) => {
      userImgView.src = base64Img;
    });
  };

  const updateProfile = () => {
    let email = emailRef.value;
    let firstName = firstNameRef.value;
    let lastName = lastNameRef.value;
    let mobile = mobileRef.value;
    let password = passwordRef.value;
    let photo = userImgView.src;
    console.log(photo);
    if (!isEmail(email)) {
      ErrorToast("Valid email address required");
    } else if (isEmpty(firstName)) {
      ErrorToast("First Name required");
    } else if (isEmpty(lastName)) {
      ErrorToast("Last Name required");
    } else if (isEmpty(mobile)) {
      ErrorToast("mobile number required");
    } else if (isEmpty(password)) {
      ErrorToast("password required!");
    } else {
      profileUpdateRequest(email,firstName,lastName,mobile,password,photo).then((result)=>{
        if(result){
          navigate('/')
        }
      })
    }
  };
  return (
    <div className="profile-container">
      <img
        ref={(input) => (userImgView = input)}
       
        src={profileData.photo}
        alt="Avatar"
      />
      <hr />
      <div className="profiledetails">
        <div >
          <label>Profile Picture</label>
          <input
            onChange={previewImage}
            ref={(input) => (userImageRef = input)}
            placeholder="User Email"
           
            type="file"
          />
        </div>
        <div>
          <label>Email Address</label>
          <input
            key={Date.now()}
            defaultValue={profileData.email}
            readOnly={true}
            ref={(input) => (emailRef = input)}
            placeholder="User Email"
       
            type="email"
          />
        </div>
        <div>
          <label>First Name</label>
          <input
            key={Date.now()}
            defaultValue={profileData.firstname}
            ref={(input) => (firstNameRef = input)}
            placeholder="First Name"
            
            type="text"
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            key={Date.now()}
            defaultValue={profileData.lastname}
            ref={(input) => (lastNameRef = input)}
            placeholder="Last Name"
          
            type="text"
          />
        </div>
        <div>
          <label>Mobile</label>
          <input
            key={Date.now()}
            defaultValue={profileData.mobile}
            ref={(input) => (mobileRef = input)}
            placeholder="Mobile"
           
            type="mobile"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            key={Date.now()}
            defaultValue={profileData.password}
            ref={(input) => (passwordRef = input)}
            placeholder="User Password"
           
            type="password"
          />
        </div>
        <div>
          <button
            onClick={updateProfile}
           
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
