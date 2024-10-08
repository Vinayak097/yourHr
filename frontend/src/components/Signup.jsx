import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../config";
function Signup() {
  const navigate=useNavigate()
  const [fullname, setFullname] = useState("");
  const [file, setFile] = useState("");
  const [password, setpassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading,setloading]=useState(false)
  const [error,setError]=useState("");
  const isValid = () => {
    return email && fullname && password && file && file.type === "application/pdf";
  };
  const submitImage = async (e) => {
    setError('');
    setloading(true);
    if (!isValid()) {
      setError("select a valid file.")
      
      return;
    }
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fullname", fullname);
      formData.append("password", password);
      formData.append("email", email);
  
      const result = await axios.post(`${backend_url}/auth/signup`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (result.data.token) {
        localStorage.setItem("ytoken", result.data.token);
        console.log("token settled");
      }
  
      navigate("/");
    } catch (error) {
      setError("Errro during signup")
      console.error("Error during signup:", error);
      
    } finally {
      setloading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center h-screen">
      <form className="formStyle flex flex-col gap-3 text-center" onSubmit={submitImage} >
        <h4 className="mb-5 font-light">Singup to <span className= " font-serif text-blue-500 text-xl ml-4">YourHr</span></h4>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input onChange={(e)=>{setEmail(e.target.value)}} type="text" className="grow" placeholder="Email"  required />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input onChange={(e)=>{setFullname(e.target.value)}} type="text" className="grow" placeholder="full_name"  required/>
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input onChange={(e)=>{setpassword(e.target.value)}} type="password" className="grow" placeholder="password" required/>
        </label>
        <input
          type="file"
         
          accept="application/pdf"
          className="form-control file-input file-input-bordered file-input-primary w-full max-w-xs"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <p className="text-sm font-bold text-red-500">{error?error:""}</p>
        <br />
        <button className="btn btn-primary" type="submit" >
          {loading? <span className="loading loading-dots loading-lg"></span>:"Submit"}
        </button>
      </form>
    </div>
  );
}

export default Signup;
