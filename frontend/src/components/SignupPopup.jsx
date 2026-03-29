import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { toast } from "react-toastify";
import {validatePassword, validateEmail, validateName} from "./validateLogin.js";

library.add(fab);

function validateUserData(name, email, password){
    if(validateName(name) != null){
        toast.error(validateName(name));
        return false;
    }
    if(validateEmail(email) != null){
        toast.error(validateEmail(email));
        return false;
    }
    if(validatePassword(password) != null){
        toast.error(validatePassword(password));
        return false;
    }
    return true;
}

const Input = ({ type, placeholder, icon, value, onChange, showPassword, setShowPassword }) => {
  return (
    <div className="flex items-center border w-full focus-within:border-[var(--violet)] transition duration-300 pr-3 gap-2 bg-[var(--secondary-bg)] border-gray-500/30 h-[46px] rounded-[5px] overflow-hidden">
      <FontAwesomeIcon icon={icon} className="text-gray-500 text-xl ml-3" />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full h-full pl-1 outline-none placeholder-gray-500 text-sm"
      />

      {/* {(type === "password" || type === "text") && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          <FontAwesomeIcon
            icon={showPassword ? "eye" : "eye-slash"}
            className="text-gray-500 text-xl mr-2"
          />
        </button>
      )} */}

      {/* <FontAwesomeIcon icon={icon} className="text-gray-500 text-xl" /> */}
    </div>
  );
};



const SignupPopup = ({ onClose }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();


        if(!validateUserData(name,email,password)) return;

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: email,
                    name: name,
                    password: password
                })
            });

            const data = await response.json();
            console.log("Backend response:", data);

            if (response.ok) {
                toast.success("Signup successful!");
                onClose();
            } else {
                toast.error(data.detail || "SignUp failed");
            }

        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Popup */}
            <div className="relative bg-[var(--secondary-bg)] w-full max-w-md rounded-2xl shadow-2xl p-8">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <FontAwesomeIcon icon={['fas', 'times']} />
                </button>

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                        Create Account
                    </h2>
                    <p className="text-gray-500">
                        Join our community of developers
                    </p>
                </div>

                <form onSubmit={handleSubmit} noValidate>

                    {/* Name */}
                    <div className="div-group mb-6">
                    <Input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border p-3 rounded mb-4"
                        icon="user"
                        required
                    />
                    </div>
                    {/* Email */}
                    <div className="div-group mb-6">
                        <Input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border p-3 rounded mb-4"
                        icon="at"
                        required
                    />
                    </div>
                    

                    {/* Password */}
                    <div className="div-group mb-6">
                        <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border p-3 rounded mb-4"
                        icon="lock"
                        required
                    />
                    </div>
                    

                    {/* Confirm Password */}
                    <div className="div-group mb-6">
                        <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border p-3 rounded mb-6"
                        icon="key"
                        required
                    />
                    </div>
                    

                    <button
                        type="submit"
                        className="bg-[var(--violet)] text-white py-2.5 px-6 w-full rounded cursor-pointer hover:bg-[var(--hoverb)]"
                    >
                        Sign Up
                    </button>

                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <button
                        onClick={onClose}
                        className="text-[var(--violet)] font-semibold hover:underline cursor-pointer"
                    >
                        Log In
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SignupPopup;