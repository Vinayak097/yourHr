import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userinfo } from "../store/user";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../config";
import { AiOutlineDownload } from "react-icons/ai";
import axios from "axios";
import Navbar from "./navbar";

function Profile() {
  const navigate = useNavigate();
  const user=useRecoilValue(userinfo)

  const [pdf, setPdf] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // if (!user) {
    //   navigate('/'); // Navigate to the home page if user data is not available
    // }
    console.log(user);
  }, [user, navigate]);

  const fetchFile = async () => {
    try {
      const response = await axios.get(
        `${backend_url}/user/files/${user.resumeUrl}`,
        {
          headers: {
            authorization: localStorage.getItem("ytoken"),
          },
          responseType: "blob",
        },
        
      );
      const pdfUrl = URL.createObjectURL(response.data);
      setPdf(pdfUrl);
      console.log(pdfUrl);
    } catch (error) {

      console.error("Error fetching PDF :", error);
      setError("Could not download resume.");
    }
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex-1 flex mt-10 justify-center">
        <div className="w-[800px] border p-4">
          <h1 className="text-xl text-center font-bold tracking-wider">
            Profile
          </h1>
          <div className="flex justify-between mt-4">
            <div>
            
              <p className="text-3xl font-bold">{user ? user.fullname : "Unknown User"}</p>
              <p className="">{user.email || "email"}</p>
            </div>
            <div>
              <p className="font-bold">{user.resumeUrl}</p>
              {error && <p className="text-red-500">{error}</p>}
              {pdf ? (
                <a
                  href={pdf}
                  download={`${user.resume}-resume.pdf`}
                  className="btn btn-secondary flex items-center gap-2"
                >
                  <AiOutlineDownload className="text-xl" /> Download Resume
                </a>
              ) : (
                <button
                  onClick={fetchFile}
                  className="btn btn-primary w-full flex items-center gap-2"
                >
                  <AiOutlineDownload className="text-xl" /> Fetch Resume
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
