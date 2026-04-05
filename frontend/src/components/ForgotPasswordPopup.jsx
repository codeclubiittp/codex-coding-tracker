import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




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



function ForgotPasswordPopup({ onClose }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // OTP input
  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus prop
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    
    setStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    console.log("OTP:", finalOtp);
   
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">


      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />


      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-md bg-[var(--secondary-bg)] border border-white/10 rounded-2xl p-8 shadow-2xl"
      >

       
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <FontAwesomeIcon icon="xmark" />
        </button>

        <AnimatePresence mode="wait">

          {/* email section*/}
          {step === 1 && (
            <motion.div
              key="email"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
            >
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                Forgot Password
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mb-6">
                Enter your email to receive OTP
              </p>

              <form onSubmit={handleSubmitEmail} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon="at"
                  required
                />

                <button
                  type="submit"
                  className="w-full py-3 bg-[var(--violet)] rounded-lg text-white font-semibold hover:opacity-90 transition"
                >
                  Send OTP
                </button>
              </form>
            </motion.div>
          )}

          {/* OTP section */}
          {step === 2 && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
            >
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                Verify OTP
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mb-6">
                Enter the 6-digit code sent to your email
              </p>

              <form onSubmit={handleVerifyOtp}>

   
                <div className="flex justify-between gap-2 mb-6">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) =>
                        handleOtpChange(e.target.value, index)
                      }
                      className="w-12 h-12 text-center flex items-center border w-full focus-within:border-[var(--violet)] transition duration-300 pr-3 gap-2 bg-[var(--secondary-bg)] border-gray-500/30 h-[46px] rounded-[5px] overflow-hidden"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[var(--success)] rounded-lg text-white font-semibold hover:opacity-90 transition"
                >
                  Verify OTP
                </button>

                <p
                  onClick={() => setStep(1)}
                  className="text-xs text-center text-[var(--text-secondary)] mt-4 cursor-pointer hover:underline"
                >
                  Change Email
                </p>

              </form>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default ForgotPasswordPopup;