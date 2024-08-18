import "./login.scss";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [error,setError] = useState("");
  const [isLoading,setIsLoading] = useState(false);

  const {updateUser} = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit =async (e)=>{
    setIsLoading(true);
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);

    const username = formData.get("username")
    const password = formData.get("password")

    try{
      const res = await apiRequest.post("/auth/login",{
        username,password
      });

      console.log(res.data);
      //Storing user data res from backend to the local storage.
      // localStorage.setItem("user",JSON.stringify(res.data)); insted of doing this we will do this :=
      updateUser(res.data);

      navigate("/");
      toast.success("Login Successfully !");

    } catch(error){
      toast.error("Login Failed !!");
      console.log(error);
      setError(error.response.data.message);
    } finally{
      setIsLoading(false);
    }
    
  }

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading} >Login</button>
          {error ? <span>{error}</span>:null}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
