import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { toast } from "react-toastify";

library.add(fab);


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



function UsernameEntryPopup({ onClose, onSuccess, platform = "LeetCode" }) {

    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let isValid = false;
            let platformData = null;

            if (platform === "Codeforces") {
                const response = await fetch(`https://codeforces.com/api/user.info?handles=${email}`);
                const data = await response.json();

                if (data.status === "OK") {
                    isValid = true;
                    platformData = { platform: "Codeforces", data: { ...data.result[0], username: email } };
                } else {
                    toast.error("User not found on Codeforces");
                }
            } else if (platform === "LeetCode") {
                const response = await fetch(`http://localhost:8000/leetcode/${email}`);
                const data = await response.json();

                if (response.ok) {
                    isValid = true;
                    platformData = { platform: "LeetCode", data: { ...data, username: email } };
                } else {
                    toast.error(data.detail || "LeetCode user not found");
                }
            } else {
                // Placeholder for other platforms
                toast.info(`${platform} validation coming soon!`);
                onClose();
                return;
            }

            if (isValid) {
                // Store to database
                const handleUpdateBody = {};
                if (platform === "LeetCode") handleUpdateBody.leetcode_handle = email;
                if (platform === "Codeforces") handleUpdateBody.codeforces_handle = email;

                const saveResponse = await fetch("http://localhost:8000/update-handles", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(handleUpdateBody)
                });

                if (saveResponse.ok) {
                    toast.success(`${platform} Connected & Saved!`);
                    if (onSuccess) onSuccess(platformData);
                    onClose();
                } else {
                    const errorData = await saveResponse.json();
                    toast.error(errorData.detail || "Failed to save handle to database");
                }
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred during validation");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 w-full h-screen">

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
                        Let's Connect Across
                    </h2>
                    <p className="text-gray-500">
                        Connect with your {platform} Account
                    </p>
                </div>


                <form onSubmit={handleSubmit} noValidate>



                    <div className="div-group mb-6">
                        <Input
                            type="text"
                            placeholder={`${platform} Username`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border p-3 rounded mb-4"
                            icon="at"
                            required
                        />
                    </div>


                    <button
                        type="submit"
                        className="bg-[var(--violet)] text-white py-2.5 px-6 w-full rounded cursor-pointer hover:bg-[var(--hoverb)]"
                    >
                        Validate
                    </button>

                </form>


                {/* <div className="mt-6 text-center text-sm text-gray-500">
                     <button
                         onClick={onClose}
                         className="text-[var(--violet)] font-semibold hover:underline cursor-pointer"
                     >
                         Validate
                     </button>
                 </div> */}

            </div>
        </div>
    );

}
export default UsernameEntryPopup
