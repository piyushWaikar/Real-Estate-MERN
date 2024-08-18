import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";

function ProfileUpdatePage() {

  const {currentUser, updateUser} = useContext(AuthContext);


  const [isLoading,setIsLoading] = useState(false);


  const handleSubmit = (e) =>{
    setIsLoading(true);
    e.preventDefault();

    const form = new FormData(e.target);

    const username = form.get("username");
    const email = form.get("email");
    const password = form.get("password");

  }

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button disabled={isLoading}>Update</button>
        </form>
      </div>
      <div className="sideContainer">
        <img src={currentUser.avatar || '/noavatar.png'} alt="" className="avatar" />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
