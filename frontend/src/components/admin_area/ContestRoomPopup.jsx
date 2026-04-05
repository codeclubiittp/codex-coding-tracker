import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons"; 
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

library.add(fas);

const Input = ({ type, placeholder, icon, value, onChange, onKeyDown, readOnly }) => {
    return (
        <div className="flex items-center border w-full focus-within:border-[var(--violet)] transition duration-300 pr-3 gap-2 bg-[var(--secondary-bg)] border-gray-500/30 h-[46px] rounded-[5px] overflow-hidden">
            <FontAwesomeIcon icon={icon} className="text-gray-500 text-xl ml-3" />
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className="w-full h-full pl-1 outline-none bg-transparent placeholder-gray-500 text-sm"
                readOnly={readOnly} 
            />
        </div>
    );
};

function ContestRoomPopup({ onClose }) {
    const [name, setName] = useState("");
    const [roomId, setRoomId] = useState(""); 
    const [password, setPassword] = useState("");
    const [contestDate, setContestDate] = useState(""); 
    const [startTime, setStartTime] = useState(""); 
    const [endTime, setEndTime] = useState(""); 
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState([]);

    // Generating RoomID
    useEffect(() => {
        const sixDigitCode = Math.floor(100000 + Math.random() * 900000);
        setRoomId(sixDigitCode.toString());
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && tagInput.trim() !== "") {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput("");
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        //  validation add full type validation in later stage
        if (!name || !password || !contestDate || !startTime || !endTime) {
            toast.error("Please fill in all fields");
            return;
        }

        const payload = {
            name,
            roomId,
            password,
            contestDate,
            startTime,
            endTime,
            tags
        };

        console.log("Creating Room with:", payload);
        toast.success("Room Created Successfully!");
        
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>

            {/* Popup */}
            <div className="relative bg-[var(--secondary-bg)] w-full max-w-2xl rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <FontAwesomeIcon icon={['fas', 'times']} />
                </button>

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Create Contest Room</h2>
                    <p className="text-gray-500">Create Room to Invite Coders</p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    {/* Contest Name */}
                    <div className="mb-6">
                        <Input
                            type="text"
                            placeholder="Contest Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            icon="signature"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                        {/* RoomID */}
                        <Input
                            type="text"
                            placeholder="Room ID"
                            value={roomId}
                            icon="hashtag"
                            readOnly={true}
                        />

                        {/* Room Password */}
                        <Input
                            type="password" 
                            placeholder="Room Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon="key"
                        />
                    </div>

                    {/* Date */}
                    <div className="mb-6">
                        <Input
                            type="date"
                            value={contestDate}
                            onChange={(e) => setContestDate(e.target.value)}
                            icon="calendar-days"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                        {/* Start Time */}
                        <Input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            icon="play"
                        />

                        {/* End Time */}
                        <Input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            icon="flag-checkered"
                        />
                    </div>

                    {/* Tags Section */}
                    <div className="mb-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                            <AnimatePresence>
                                {tags.map((tag) => (
                                    <motion.span
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        key={tag}
                                        className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-500 text-xs font-bold border border-blue-500/20"
                                    >
                                        {tag}
                                        <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500">
                                            <FontAwesomeIcon icon="times" className="text-[10px]" />
                                        </button>
                                    </motion.span>
                                ))}
                            </AnimatePresence>
                        </div>

                        <Input
                            type="text"
                            placeholder={tags.length === 0 ? "Add tags (Press Enter)" : "Add more..."}
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            icon="tags"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-[var(--violet)] text-white py-2.5 px-6 w-full rounded cursor-pointer hover:bg-[var(--hoverb)] transition-colors"
                    >
                        Create Room
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ContestRoomPopup;