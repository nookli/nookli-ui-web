import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';
import { signin } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import ForgotPasswordModal from "./ForgotPasswordModal";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    // if (credentials.provider === 'google') {
    //   return axios.post(`${API_BASE}/auth/oauth/google`, {
    //     token: credentials.token,
    //   });
    // }
    // e.preventDefault();

    try {
      console.log("Logging in:", { email, password, rememberMe });
      const credendtials = {
        email,
        password,
        // rememberMe,
      };
      const resp = await signin(credendtials);
      console.log("Login successful, response:", resp);
      navigate("/dashboard/home");
    } catch (error) {
      navigate("/dashboard/home");
      console.error("Login failed", error);
    }
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
          Sign in with <span className="text-red-500">Nookli</span>
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Log in to continue your learning journey with Nookli
        </p>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter Your Email Here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter Your Password Here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-red-500"
              />
              Remember me
            </label>
            <button type="button" onClick={() => setShowForgotModal(true)}
              className="text-blue-500 hover:underline">
              Forgot Password?
            </button>
            <ForgotPasswordModal open={showForgotModal} onClose={() => setShowForgotModal(false)} />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded font-medium"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-sm text-gray-500">Or Sign In With</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Sign In */}
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => console.log("Login Failed")}
          useOneTap
        />
        <p className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-500 hover:underline"
          >
            Register now
          </button>
        </p>
      </div>
    </div>
  );
};

export default function LoginWithProvider() {
  return (
    <GoogleOAuthProvider clientId="490964506357-8bcm5mou24gded59904m61phgqsn3dti.apps.googleusercontent.com">
      <Login />
    </GoogleOAuthProvider>
  );
}
