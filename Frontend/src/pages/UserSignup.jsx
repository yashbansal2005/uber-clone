import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

function UserSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = { // we are storing input data of user here to send it to backend using axios
      email: email,
      password: password,
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
    };
    // console.log('making api call')
    // console.log(`${import.meta.env.VITE_BASE_URL}/user/register`)
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`,newUser );
    
      // console.log("Response Status:", response.status); // Logs the status code
    
      if (response.status === 201) {
        const data = response.data;
        // console.log("Response Data:", data);
        setUser(data.user); // Store user data in context api for global access
        localStorage.setItem('token',data.token)
        navigate("/home"); // Redirect to home page
      }} 
    
    catch (error) {
      if (error.response) {
        // Server responded with an error status code (e.g., 400, 500)
        console.log("Error Status:", error.response.status);
        console.log("Error Data:", error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.log("No Response Received:", error.request);
      } else {
        // Other errors (e.g., network issues)
        console.log("Error:", error.message);
      }
    }
    
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  return (
    <div>
      <div className="p-6 h-screen flex flex-col justify-between ">
        <div>
          <img
            className="w-18 mb-3"
            src="https://logospng.org/download/uber/logo-uber-4096.png"
            alt=""
          />

          <form
            action=""
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <h3 className="text-lg  font-medium mb-2">
              Please enter your name
            </h3>

            <div className="flex gap-4 ">
              <input
                className="bg-[#eeeeee] mb-5  px-4 py-2 rounded w-1/2 font-medium text-lg placeholder:text-base"
                required
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <input
                className="bg-[#eeeeee] mb-5  px-4 py-2 rounded w-1/2 text-lg font-medium placeholder:text-base"
                required
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <h3 className="text-lg  font-medium mb-2">
              {" "}
              Please enter your email
            </h3>

            <input
              className="bg-[#eeeeee] mb-5  px-4 py-2 rounded font-medium w-full text-lg  placeholder:text-base"
              required
              type="email"
              placeholder="email@example.com"
              onChange={(e) => setEmail(e.target.value)}  
            />

            <h3 className="text-lg font-medium mb-2"> Enter Password</h3>

            <input
              className="bg-[#eeeeee] mb-5  font-medium px-4 py-2 rounded w-full text-lg placeholder:text-base"
              required
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="bg-[#111] text-white mb-0.5 font-normal border px-4 py-2 rounded w-full text-lg">
              Create account
            </button>
          </form>

          <p className="text-center font-normal mb-3 ">
            {" "}
            Already have an account?
            <Link to="/login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </div>

        <div>
          <p className="text-[13px] text-[#6B6B6B]">
            This site is protected by reCAPTCHA and the Google{" "}
            <span className="underline">Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service</span> apply
          </p>
        </div>
      </div>
    </div>
  );
}
export default UserSignup;
