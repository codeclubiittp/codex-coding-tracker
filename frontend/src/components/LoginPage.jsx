import React, { useState, useEffect } from 'react';
import SignupPopup from './SignupPopup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import ForgotPasswordPopup from './ForgotPasswordPopup.jsx';

import { validatePassword, validateEmail, validateName } from "./validateLogin.js";

library.add(fas);

function validateUserData(email, password) {
    if (validateEmail(email) != null) {
        toast.error(validateEmail(email));
        return false;
    }
    if (!password) {
        toast.error("Password is required");
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

            {(type === "password" || type === "text") && (
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    <FontAwesomeIcon
                        icon={showPassword ? "eye" : "eye-slash"}
                        className="text-gray-500 text-xl mr-2"
                    />
                </button>
            )}

            {/* <FontAwesomeIcon icon={icon} className="text-gray-500 text-xl" /> */}
        </div>
    );
};


const LoginPage = ({ onLoginSuccess }) => {


    //     useEffect(() => {

    //     fetch("http://127.0.0.1:8000/check-session", {
    //         credentials: "include"
    //     })
    //     .then(res => {
    //         if(res.status === 401){
    //             window.location.href = "/login";
    //         }
    //     });

    // }, []);


    //submit data
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateUserData(email, password)) return;

        try {
            const response = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    username: email,
                    password: password,
                    name: 'user'
                })
            });

            const data = await response.json();
            console.log("Backend response:", data);

            if (response.ok) {
                toast.success("Login successful");
                if (onLoginSuccess) onLoginSuccess();
            } else {
                toast.error(data.detail || "Login failed");
            }

        } catch (error) {
            console.error("Error:", error);
            toast.error("Server error. Please try again.");
        }
    };


    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showSignup, setShowSignup] = useState(false);
    const [showForgot, setShowForgot] = useState(false);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[var(--primary-bg)] p-4 font-sans relative overflow-hidden">
            {/* Popup */}
            {showSignup && <SignupPopup onClose={() => setShowSignup(false)} />}

            {showForgot && (
    <ForgotPasswordPopup onClose={() => setShowForgot(false)} />
  )}


            <div className={`absolute inset-0 pointer-events-none transition-all duration-300 ${showSignup ? 'blur-md' : 'blur-0'}`}>
                <div className="floating-icon icon-1">
                    <div className="bg-[#6366F1] p-2 rounded-xl">
                        <FontAwesomeIcon icon="layer-group" className="text-white text-3xl" />
                    </div>
                </div>

                <div className="floating-icon icon-2">
                    <div className="bg-orange-100 p-4 rounded-2xl">
                        <FontAwesomeIcon icon="award" className="text-orange-500 text-3xl" />
                    </div>
                </div>

                <div className="floating-icon icon-3">
                    <div className="bg-emerald-100 p-5 rounded-xl">
                        <FontAwesomeIcon icon='trophy' className="text-emerald-500 text-xl" />
                    </div>
                </div>

                <div className="floating-icon icon-4">
                    <div className="bg-purple-100 p-4 rounded-xl">
                        <FontAwesomeIcon icon="boxes-stacked" className="text-purple-500 text-3xl" />
                    </div>
                </div>

                <div className="floating-icon icon-5">
                    <div className="bg-blue-100 p-3 rounded-lg rotate-12">
                        <FontAwesomeIcon icon="bolt-lightning" className="text-blue-500 text-2xl" />
                    </div>
                </div>
            </div>

            {/* Main Content with Blur effect */}
            <div className={`flex justify-center items-center transition-all duration-300 ${showSignup ? 'blur-md' : 'blur-0'}`}>
                <div className="login-area text-[var(--text-primary)] text-center">
                    <h1 className="text-5xl font-bold p-4">Login to <span className='text-[var(--violet)]'>Codex</span> Pro</h1>
                    <h3 className='text-xl text-gray-500 mb-3'>Access your coding journey and metrics</h3>


                    <form action="" onSubmit={handleSubmit} noValidate>
                        <div className="inputs-section bg-[var(--secondary-bg)] py-10 px-12 rounded-2xl mt-8">


                            {/* LeetCode signIn setup */}

                            {/* <button className="flex items-center justify-center gap-3 mb-4 w-full bg-[#f89f1b] hover:bg-[#e68e0d] text-white py-3 px-4 rounded-xl font-semibold transition-all hover:shadow-lg active:scale-[0.98]">
                                <img src="assets/leetcode.svg" className='w-6 text-white' alt="" />
                                <span>Login with LeetCode</span>
                            </button>

                            <div className="flex items-center justify-center mb-3 text-gray-400">
                                <hr className="flex-1"/>
                                <p className="mx-3 whitespace-nowrap">or continue with</p>
                                <hr className="flex-1"/>
                            </div> */}

                            <div className="group-container">
                                <div className="div-group mb-6">
                                    {/* <input type="email" name="" id="" /> */}
                                    <Input
                                        type="email"
                                        placeholder="Email Address"
                                        icon="at"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                </div>
                                <div className="div-group mb-6">
                                    {/* <input type="email" name="" id="" /> */}
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        icon='lock'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        showPassword={showPassword}
                                        setShowPassword={setShowPassword}
                                    />
                                </div>
                            </div>
                            <input type="submit" value="Login" className="bg-[var(--violet)] text-[#fff] cursor-pointer py-2.5 px-6 block w-full rounded-[5px] mb-4 hover:bg-[var(--hoverb)]" />

                            <a href="#"><span onClick={() => setShowForgot(true)}
                            className='text-[var(--violet)] text-[15px]'>Forgot Password</span></a>
                            <p className='text-[15px] text-gray-600'>Dont have an acoount? <button type="button" onClick={() => setShowSignup(true)} className='text-[var(--violet)] hover:underline cursor-pointer'>Sign Up</button></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
