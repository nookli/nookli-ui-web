import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { signup } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
    }

    const res = await signup(payload)
    console.log("Registration successful, response:", res);
    navigate("/login");
  };


  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google user:", decoded);

      const resp = await signin({
        provider: 'google',
        token: credentialResponse.credential,
      });

      console.log("Backend login successful:", resp);

      localStorage.setItem('accessToken', resp.data?.accessToken);

      navigate("/dashboard/home");
      // Redirect to dashboard
      // window.location.href = "/dashboard/home";
    } catch (error) {
      navigate("/dashboard/home");
      console.error("Google Sign-In failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full p-8 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Register to <span className="text-red-500">Begin</span>
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Register now to begin your learning journey with Nookli
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                name="firstName"
                placeholder="Enter Your Name Here"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                name="lastName"
                placeholder="Enter Your Last Name Here"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              name="username"
              placeholder="Enter Your Username Here"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter Your Email Here"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter Your Password Here"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded font-medium"
          >
            Register Now
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-sm text-gray-500">Or Sign up With</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Sign Up */}
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => console.log("Google Login Failed")}
          useOneTap
        />
        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline"
          >
            Sign In          </button>
        </p>
      </div>
    </div>
  );
};

export default function RegisterWithProvider() {
  return (
    <GoogleOAuthProvider clientId="490964506357-8bcm5mou24gded59904m61phgqsn3dti.apps.googleusercontent.com">
      <Register />
    </GoogleOAuthProvider>
  );
}
