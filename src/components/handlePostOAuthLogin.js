import supabase  from '../config/supabase';
import { useUserStore } from '../redux/useUserStore';

const handlePostOAuthLogin = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
    console.error("OAuth session fetch failed:", error?.message || "No session");
    return;
  }

  const user = session.user;
  const accessToken = session.access_token;
  const refreshToken = session.refresh_token;

  // Extract custom user data from metadata
  const {
    email,
    full_name,
    user_metadata: {
      full_name: name,
      picture: avatar_url,
      given_name: firstName,
      family_name: lastName,
    } = {},
  } = user;

  const userObj = {
    id: user.id,
    email,
    username: name?.toLowerCase().replace(/\s+/g, '') || email.split('@')[0],
    firstName: firstName || name?.split(' ')[0] || '',
    lastName: lastName || name?.split(' ')[1] || '',
    img: avatar_url || '',
  };

  // Save to Zustand store
  useUserStore.getState().login({
    user: userObj,
    accessToken,
    refreshToken,
  });
};
