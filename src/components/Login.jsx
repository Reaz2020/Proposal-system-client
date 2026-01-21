import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext.jsx";
import Swal from "sweetalert2";

export default function LoginPage() {
  const navigate = useNavigate();
  const { handleLogin , user } = useContext(AuthContext);

  const [userNumber, setUserNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const onSubmit = async () => {
  setError("");

  if (!userNumber) {
    setError("User number is required");
    return Swal.fire("Missing Field", "Please enter your user number", "warning");
  }

  const result = await handleLogin(userNumber, password);

  if (result.success) {
    // Check the user's role
    if (result.user?.role === "admin") {
      navigate("/admin/users");
    } else {
      navigate("/");
    }
  } else {
    setError(result.message || "Login failed");
    Swal.fire("Login failed", result.message || "Invalid credentials", "error");
  }
};


  return (
    <div className="min-h-4/5 flex mt-20">
      {/* Left Side - Image */}
      <div className="w-1/2 hidden md:flex items-center justify-center bg-gray-200">
        <img
          src="/logo.png"
          alt="Login Illustration"
          className="object-cover h-full w-full rounded-l-2xl"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-100">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

          {error && (
            <p className="text-red-500 mb-4 text-center font-medium">{error}</p>
          )}

          {/* User Number */}
          <input
            type="number"
            placeholder="User Number"
            className="input input-bordered w-full mb-4"
            value={userNumber}
            onChange={(e) => setUserNumber(e.target.value)}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full mb-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Login Button */}
          <button
            className="btn btn-primary w-full flex items-center justify-center gap-2 text-white"
            onClick={onSubmit}
          >
            Login
          </button>

          {/* Optional: Forgot password */}
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>
              Don't have an account?{" "}
              <span className="text-blue-500 cursor-pointer hover:underline">
                Contact Admin
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
