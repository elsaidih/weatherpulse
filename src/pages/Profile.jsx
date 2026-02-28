import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCog } from "react-icons/fa";

export default function Profile() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const [user, setUser] = useState(storedUser);
  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-blue-500 text-black relative px-6 py-6 md:px-12 md:py-12">

      {/* Top Bar */}
      <div className="flex items-center justify-between mb-10">
        <button onClick={() => navigate(-1)}>
          <FaArrowLeft className="text-2xl text-black" />
        </button>
        <h1 className="text-xl font-bold">Profile</h1>
        <FaCog className="text-2xl text-black" />
      </div>

      {/* User Info */}
      <div className="text-center mt-10">
        {isEditing ? (
          <div className="flex flex-col items-center gap-4">
            <input
              type="text"
              name="name"
              value={user.name || ""}
              onChange={handleChange}
              className="border border-black rounded px-3 py-2 w-full max-w-xs text-black"
              placeholder="Your Name"
            />
            <input
              type="email"
              name="email"
              value={user.email || ""}
              onChange={handleChange}
              className="border border-black rounded px-3 py-2 w-full max-w-xs text-black"
              placeholder="Your Email"
            />
            <button
              onClick={handleSave}
              className="bg-black text-white px-4 py-2 rounded font-semibold"
            >
              Save
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold">{user.name || "Your Name"}</h2>
            <p className="mt-2 text-sm">{user.email || "your@email.com"}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-6 font-semibold underline"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>

      {/* Account Section */}
      <div className="mt-20">
        <div className="space-y-6">

          {/* Info about password management */}
          <div className="flex justify-between items-center border-b border-black pb-2">
            <span>Password is managed securely.</span>
          </div>

          {/* Logout */}
          <div
            onClick={handleLogout}
            className="flex justify-between items-center border-b border-black pb-2 cursor-pointer text-red-600"
          >
            <span>Log out</span>
            <span>{">"}</span>
          </div>

        </div>
      </div>
    </div>
  );
}