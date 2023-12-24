import React from 'react'
import {useLocation} from 'react-router-dom'
import './Profile.css'
const Profile = () => {
  const location=useLocation()
  return (
    <div>
      <div className="container">
        <div className="profile">
            <div className="user-info">
                <div className="profile-image">
                    <img src="img/prfile_icon.jpg" alt="User Image" />
                </div>
                <div className="user-details">
                    <h2>User Name</h2>
                    <p>{location.state.myEmail}</p>
                </div>
            </div>
            <div className="recent-contacts">
                <h3>Recent Contacts</h3>
                <ul>
                    <li>Contact 1</li>
                    <li>Contact 2</li>
                    <li>Contact 3</li>
                </ul>
            </div>
            <div className="container">
                <div className="start-call">
                    <h3>Start Call</h3>
                    <form>
                        <input type="text" placeholder="Name"/>
                        <input type="text" placeholder="ID to Call"/>
                        <button type="submit"><i className="fas fa-phone-alt"></i> Start Call</button>
                    </form>
                </div>
            </div>
            <div className="content">
                {/* rest of the content HTML remains the same */}
            </div>
            <div className="top-right">
                <div className="settings">
                    <div className="icon">
                        <p>Settings</p>
                    </div>
                    <div className="edit-profile">
                        <i className="fas fa-edit"><p>Edit Profile</p></i>
                    </div>  
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
