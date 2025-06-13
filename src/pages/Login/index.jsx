import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { signin } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { toast } from "react-toastify";
import { useUserStore } from "../../redux/useUserStore";
import supabase from "../../config/supabase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const navigate = useNavigate();
  const loginToStore = useUserStore.getState().login;
  const addAccount = useUserStore.getState().addAccount;

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        const { user, access_token, refresh_token } = session;
        loginToStore({ user, accessToken: access_token, refreshToken: refresh_token });
        addAccount({ user, accessToken: access_token, refreshToken: refresh_token });
        toast.success("Google Sign-In successful!");
        navigate("/dashboard/home");
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const credentials = { email, password };
      const resp = await signin(credentials);
      const { accessToken, refreshToken, user, message } = resp;
      loginToStore({ user, accessToken, refreshToken });
      addAccount({ user, accessToken, refreshToken });
      toast.success(message || "Login successful!");
      navigate("/dashboard/home");
    } catch (error) {
      console.error("login failed", error);
      toast.error(error?.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    const { data,error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard/home`,
      },
    });

    alert('sfd')

    if (data) {
      const { user, access_token, refresh_token } = data;
      const userObj = {
        id: user.id,
        email: user.email,
        username: user.user_metadata.full_name?.toLowerCase().replace(/\s+/g, '') || user.email.split('@')[0],
        firstName: user.user_metadata.given_name || user.user_metadata.full_name?.split(' ')[0] || '',
        lastName: user.user_metadata.family_name || user.user_metadata.full_name?.split(' ')[1] || '',
        img: user.user_metadata.picture || '',
      };
      
      loginToStore({ user: userObj, accessToken: access_token, refreshToken: refresh_token });
      addAccount({ user: userObj, accessToken: access_token, refreshToken: refresh_token });
      toast.success("Google Sign-In successful!");
      navigate("/dashboard/home");
    }
    
    if (error) {
      console.error("Google login failed:", error.message);
      toast.error("Google login failed");
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
            <button
              type="button"
              onClick={() => setShowForgotModal(true)}
              className="text-blue-500 hover:underline"
            >
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

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-sm text-gray-500">Or Sign In With</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded py-2 hover:bg-gray-100"
        >
          <FcGoogle size={20} />
          <span className="text-sm font-medium">Continue with Google</span>
        </button>

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

export default Login;
