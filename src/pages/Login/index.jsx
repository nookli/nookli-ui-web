import { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { signin } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordModal from './ForgotPasswordModal';
import { toast } from 'react-toastify';
import { useUserStore } from '../../redux/useUserStore';
import supabase from '../../config/supabase';
import {useUserAccountsStore} from '../../redux/useUserAccountsStore';
import { useCurrentUserStore } from '../../redux/useCurrentUserStore';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [activeSessions, setActiveSessions] = useState([]);

  const navigate = useNavigate();
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const users = useUserAccountsStore((state) => state.users);

  useEffect(() => {
    if (currentUser) {
      console.log('Current user already logged in:', currentUser);
      navigate('/dashboard/home'); // or your home route
      return;
    }

    const now = new Date();

    const validUsers = users.filter((user) => {
      const expiry = new Date(user.tokenExpiry);
      return expiry > now && user.accessToken; // session still valid
    });

    setActiveSessions(validUsers);
  }, [currentUser, users, navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const credentials = { email, password };
      const resp = await signin(credentials);

      const { accessToken, refreshToken, user, message } = resp;

      const decoded = jwtDecode(accessToken);
      const tokenExpiry = decoded.exp
        ? new Date(decoded.exp * 1000).toISOString()
        : null;

      const fullUser = {
        ...user,
        accessToken,
        refreshToken,
        tokenExpiry,
      };
      useCurrentUserStore.getState().loginCurrentUser(fullUser);
      useUserAccountsStore.getState().addUserAccount(fullUser);

      toast.success(message || 'Login successful!');
      navigate('/dashboard/home');
    } catch (error) {
      console.error('Login failed', error);
      toast.error(
        error?.response?.data?.message || 'Login failed. Please try again.',
      );
    }
  };

  // const handleGoogleLogin = async () => {
  //   // 1. Initiate Google OAuth login
  //   const { data, error } = await supabase.auth.signInWithOAuth({
  //     provider: 'google',
  //   });

  //   if (error) {
  //     console.error('Google login error:', error);
  //     return;
  //   }

  //   console.log('Google login initiated:', data);

  //   // 2. After redirect, parse tokens from URL
  //   const hashParams = new URLSearchParams(window.location.hash.substring(1));
  //   const accessToken = hashParams.get('access_token');
  //   const refreshToken = hashParams.get('refresh_token');
  //   const tokenExpiry = Number(hashParams.get('expires_at'));

  //   if (!accessToken) return;

  //   // 3. Decode JWT to extract user info
  //   const decoded = jwtDecode(accessToken);

  //   const email = decoded.email || '';
  //   const fullName = decoded.user_metadata?.full_name || decoded.name || '';
  //   const [firstname, ...rest] = fullName.split(' ');
  //   const lastName = rest.join(' ');
  //   const username = email.split('@')[0];
  //   const img = decoded.user_metadata?.avatar_url || decoded.picture || '';
  //   const id = decoded.sub;

  //   // 4. Construct user object
  //   const user = {
  //     id,
  //     email,
  //     firstname,
  //     lastname: lastName,
  //     username,
  //     img,
  //     accessToken,
  //     refreshToken,
  //     tokenExpiry,
  //   };

  //   // 5. Store user in both stores
  //   useCurrentUserStore.getState().loginCurrentUser(user);
  //   useUserAccountsStore.getState().addUserAccount(user);
  // };


  const handleGoogleLogin = async () => {
  try {
    // Step 1: Start login — will redirect
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      toast.error('Google login failed');
      console.error('Google login error:', error);
    }

    // 🔥 Note: After this call, user will be redirected.
    // So any code below here won't run during this session.
  } catch (err) {
    toast.error('Unexpected login error');
    console.error(err);
  }
};

  useEffect(() => {
  const finalizeGoogleLogin = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    const { access_token, refresh_token, user } = session;

    const email = user.email || '';
    const fullName = user.user_metadata?.full_name || '';
    const [firstname, ...rest] = fullName.split(' ');
    const lastName = rest.join(' ');
    const username = email.split('@')[0];
    const img = user.user_metadata?.avatar_url || '';
    const id = user.id;

    const tokenExpiry = Math.floor(Date.now() / 1000) + session.expires_in;

    const finalUser = {
      id,
      email,
      firstname,
      lastname: lastName,
      username,
      img,
      accessToken: access_token,
      refreshToken: refresh_token,
      tokenExpiry,
    };

    useCurrentUserStore.getState().loginCurrentUser(finalUser);
    useUserAccountsStore.getState().addUserAccount(finalUser);

    toast.success('Logged in with Google!');
    navigate('/dashboard');
  };

  finalizeGoogleLogin();
}, []);


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div>
        {!currentUser && (
          <div>
            {activeSessions.length > 0 ? (
              <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md space-y-4">
                <h2 className="text-2xl font-semibold text-center">
                  Select Your Account
                </h2>
                <p className="text-sm text-gray-500 text-center mb-4">
                  Choose an account with an active session to continue
                </p>

                <div className="space-y-3">
                  {activeSessions.map((user) => (
                    <div key={user.email} className="space-y-1">
                      <button
                        onClick={async () => {
                          await useUserAccountsStore
                            .getState()
                            .switchAccount(user.email);
                          navigate('/dashboard/home');
                        }}
                        className="w-full flex items-center justify-between border border-gray-300 rounded px-4 py-2 hover:bg-gray-100 transition"
                      >
                        <div className="flex flex-col text-left">
                          <span className="font-medium">{user.username}</span>
                          <span className="text-sm text-gray-500">
                            {user.email}
                          </span>
                        </div>
                        <span className="text-sm text-red-500 font-medium">
                          Continue →
                        </span>
                      </button>
                      <button
                        onClick={() =>
                          useUserAccountsStore
                            .getState()
                            .removeUserAccount(user.email)
                        }
                        className="text-xs text-red-400 hover:text-red-600 ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-center text-sm text-gray-600">
                  Or login with a different account below
                </div>
              </div>
            ) : (
              <div className="max-w-md w-full p-8 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-2">
                  Sign in with <span className="text-red-500">Nookli</span>
                </h2>
                <p className="text-center text-sm text-gray-500 mb-6">
                  Log in to continue your learning journey with Nookli
                </p>

                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1"
                    >
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
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium mb-1"
                    >
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
                    <ForgotPasswordModal
                      open={showForgotModal}
                      onClose={() => setShowForgotModal(false)}
                    />
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
                  <span className="mx-2 text-sm text-gray-500">
                    Or Sign In With
                  </span>
                  <hr className="flex-grow border-gray-300" />
                </div>

                <button
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded py-2 hover:bg-gray-100"
                >
                  <FcGoogle size={20} />
                  <span className="text-sm font-medium">
                    Continue with Google
                  </span>
                </button>

                <p className="mt-6 text-sm text-center text-gray-600">
                  Don’t have an account?{' '}
                  <button
                    onClick={() => navigate('/register')}
                    className="text-blue-500 hover:underline"
                  >
                    Register now
                  </button>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
