import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WiDaySunny } from "react-icons/wi";

export default function Landing() {
  const navigate = useNavigate();
  const [showSignIn, setShowSignIn] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);

  const handleSignIn = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // DEMO credentials
    if (emailOrUsername === "demo@example.com" && password === "123") {
      const demoToken = "demo-token";
      const demoUser = { name: "Demo User", email: "demo@example.com" };

      // Save in localStorage
      localStorage.setItem("authToken", demoToken);
      localStorage.setItem("user", JSON.stringify(demoUser));

      setToken(demoToken);
      setMessage(`Welcome back, ${demoUser.name}!`);
      setShowSignIn(false);

      setTimeout(() => navigate("/home"), 1000);
    } else {
      setError("Invalid credentials");
    }
  };

  const getBackground = () => "linear-gradient(to bottom, #87ceeb, #f0f8ff)";

  return (
    <div
      className="h-screen w-full flex flex-col items-center justify-center relative text-center px-6"
      style={{ background: getBackground() }}
    >
      {/* Logo */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
        <WiDaySunny className="text-white text-3xl md:text-4xl" />
        <span className="font-semibold text-white text-lg md:text-xl">WeatherPulse</span>
      </div>

      {/* Success Message */}
      {message && (
        <div className="absolute top-20 bg-green-500 text-white px-4 py-2 rounded">
          {message}
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">WeatherPulse</h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl text-white opacity-90 max-w-md">
          Real-time weather updates anywhere
        </p>

        {/* Get Started Button */}
        <button
          onClick={() => navigate("/home")}
          disabled={!token}
          className={`mt-10 px-8 py-3 rounded-full text-sm sm:text-base transition duration-300 ${
            token ? "bg-white text-blue-700 hover:scale-105" : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          Get Started →
        </button>

        {/* Sign In Trigger */}
        <p
          className="mt-6 text-white hover:underline cursor-pointer text-sm sm:text-base"
          onClick={() => setShowSignIn(true)}
        >
          Sign In
        </p>
      </div>

      {/* Sign In Modal */}
      {showSignIn && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-80 md:w-96">
            <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>

            {error && <p className="text-red-500 text-center mb-2">{error}</p>}

            <form onSubmit={handleSignIn} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Email or Username"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Sign In
              </button>
            </form>

            <button
              className="mt-3 text-gray-500 hover:underline text-sm w-full"
              onClick={() => setShowSignIn(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}