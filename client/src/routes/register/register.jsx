import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useState } from "react";
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [error,setError] = useState("");
  const [isLoading,setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit =async (e)=>{
    setIsLoading(true);
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);

    const username = formData.get("username")
    const email = formData.get("email")
    const password = formData.get("password")

    try{
      const res = await axios.post("http://localhost:3000/api/auth/register",{
        username,email,password
      });

      console.log(res.data);

      navigate("/login");
      toast.success("Register Successfully !");

    } catch(error){
      toast.error("Register Failed !!", {
        position: "top-left"
      });
      console.log(error);
      setError(error.response.data.message);
    } finally{
      setIsLoading(false);
    }
    
  }

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading} >Register</button>
          {error ? <span>{error}</span>:null}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
