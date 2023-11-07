import React, { useEffect, useState } from "react";
import { removeSessions } from "../../helper/SessionHelper";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Layout.css";
import { getProfileDetails } from "../../APIrequest/APIrequest";

const Layout = (props) => {
  const [sidebar, setSidebar] = useState(true);
  const [profile,setProfile] = useState(false)

  useEffect(() => {
    getProfileDetails();
    console.log(profileData);
  }, []);
  const profileData = useSelector((state) => state.profile.value);
  
 
  return (
    <>
      <nav className="navbar">
        <Link to='/'>
        <div className="logo">
          <span class="material-symbols-outlined">task </span>Task Manager
        </div>
        </Link>
        <div className="userdetails">
          <img onClick={()=>setProfile(!profile)}  src={profileData.photo ? profileData?.photo:'https://img.freepik.com/premium-vector/man-character_665280-46967.jpg'} alt="" />
          
        </div>
        
      </nav>
      
      <div className={profile ? 'nameandemail':'profile-none'}>
            <h1> {`${profileData.firstname} ${profileData.lastname} `}</h1>
            <h3> {profileData.email}</h3>
            <div className="logout-profile">
              <button onClick={removeSessions}>Logout</button>
              <button><Link to='/profile'>Settings</Link></button>
            </div>
          </div>

          
      <div className="layout">
        <nav className={sidebar ? `sidebar` : `sidebar-none`}>
        <div>
       
        </div>
        
          <Link to="/">
            <span class="material-symbols-outlined">dataset</span>Dashboard
          </Link>
          <Link to="/create">
            <span class="material-symbols-outlined">add_circle</span>Create New
          </Link>
          <Link to="/new">
            <span class="material-symbols-outlined">open_in_new</span>New Task
          </Link>
          <Link to="/progress">
            <span class="material-symbols-outlined">pending</span>In Progress
          </Link>
          <Link to="/completed">
            <span class="material-symbols-outlined">done</span>Completed
          </Link>
          <Link to="/canceled">
            <span class="material-symbols-outlined">remove_done</span>Canceled
          </Link>
        </nav>
        {sidebar ?  <i onClick={()=>setSidebar(false)} class="fa-solid fa-xmark"></i> : <i onClick={()=>setSidebar(true)} class="fa-solid fa-bars"></i>}
       
        <div className="body">{props.children}</div>
      </div>
    </>
  );
};

export default Layout;
