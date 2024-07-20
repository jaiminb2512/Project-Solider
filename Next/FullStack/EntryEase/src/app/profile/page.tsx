"use client";

import useSWR from 'swr';
import { getSession, changePremium, changeUsername } from '@/actions';
import { useRouter } from 'next/navigation';

const fetcher = async () => {
  const session = await getSession();
  if (!session.isLoggedIn) {
    throw new Error("Not logged in");
  }
  return session;
};

const ProfilePage = () => {
  const { data: session, error, mutate } = useSWR('/api/session', fetcher);
  const router = useRouter();

  if (error) {
    if (error.message === "Not logged in") {
      router.push('/');
    }
    return <div>Error: {error.message}</div>;
  }

  if (!session) {
    return <div>Loading...</div>;
  }

  const handlePremiumChange = async (e) => {
    e.preventDefault();
    await changePremium();
    mutate(); 
  };

  const handleUsernameChange = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await changeUsername(formData);
    mutate(); 
  };

  return (
    <div className='box home color'>
      <h1>Welcome to the Profile page</h1>
      <p>Welcome, <b>{session.username}</b></p>
      <span>You are a <b>{session.isPro ? "Premium" : "Free"}</b> user</span>

      <form onSubmit={handlePremiumChange}>
        <button className='profile-btn' type="submit">{session.isPro ? "Cancel" : "Buy"} Premium</button>
      </form>

      <form onSubmit={handleUsernameChange}>
        <input type="text" name='username' required placeholder={session.username} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default ProfilePage;
