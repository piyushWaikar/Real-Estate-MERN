import axios from "axios";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {

  const {currentUser, updateUser} = useContext(AuthContext);

  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false);

  const handleLogout = async()=>{
    try{
      setIsLoading(true);
      await apiRequest.post('/auth/logout');
      updateUser(null);
      localStorage.removeItem('user');
      navigate('/login');
      toast.success("Logout Successfully !!");
    } catch(err){
      toast.error("Logout failed !!");
      console.log(err.message);
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to='/profileUpdate'>
            <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser.avatar || '/noavatar.png'}
                alt=""
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button disabled={isLoading} onClick={()=>handleLogout()}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat/>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
