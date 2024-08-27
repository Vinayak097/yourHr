import React, { useEffect, useState } from "react";
import axios from "axios";
import { backend_url } from "../config";
import Navbar from "./navbar";
import { userinfo } from "../store/user";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate=useNavigate();
  const [user, setUser] = useRecoilState(userinfo);
  const [error, setError] = useState(null);
  const [loading,setloadin]=useState(false)
  console.log(user);
  useEffect(() => {
    const fetchUserProfile = async () => {
      setloadin(true)
      try {
        const response = await axios.get(`${backend_url}/user/profile`, {
          headers: {
            authorization: localStorage.getItem("ytoken"), // Include your auth token if required
          },
        });
        setUser(response.data);
        setloadin(false)
      } catch (error) {
        navigate('/signup')
        setloadin(false)
        console.error("Error fetching user profile:", error);
        setError("Could not load user profile.");
      }
      
    };

    fetchUserProfile();
  }, []);

  

  if (error) {
    return <p>{error}</p>;
  }
  if(loading){
    <div className="h-screen flex items-center justify-center">  
    <span className="loading loading-dots loading-lg"></span>
    </div>
  }
  if (!user) {
    return <div className="h-screen flex items-center justify-center">  
    </div>;
  }

  return (
    <div className="user-profile h-screen flex flex-col">
      <Navbar></Navbar>
      <div className="flex-1 flex  justify-center border ">
        <div className="text-center">
          <h1 className="mt-10 text-3xl font-serif">Hi {user.fullname}</h1>
          <p className="font text-xl font-normal mt-2">
            Let’s help you land your dream career
          </p>

          

          <div>
            <p className="text-3xl font-bold mt-6">Recommended for you</p>
            <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="card bg-base-100 h-72 w-72 shadow-xl border">
              <div className="card-body">
                <h2 className="card-title">Software development</h2>
                <p>make your future bright!</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Explore</button>
                </div>
              </div>
            </div>
            <div className="card bg-base-100 h-72 w-72 shadow-xl border">
              <div className="card-body">
                <h2 className="card-title">Data Science</h2>
                <p>make your future bright!</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Explore</button>
                </div>
              </div>
            </div>
            <div className="card bg-base-100 h-72 w-72 shadow-xl border">
              <div className="card-body">
                <h2 className="card-title">Ai  Robotics & RD</h2>
                <p>make your future bright!</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Explore </button>
                </div>
              </div>
            </div>

            </div>
            
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Home;
