import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  supabase  from '../config/supabase'; // Adjust the import path as necessary
import { toast } from 'react-toastify';
import { useCurrentUserStore } from '../redux/useCurrentUserStore';
import { useUserAccountsStore } from '../redux/useUserAccountsStore';

const AuthSync = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data} = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
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
        navigate('/dashboard/home');
      }
    });

    return () => {
      subscription?.subscription?.unsubscribe();
    };
  }, [navigate]);

  return null;
};

export default AuthSync;
