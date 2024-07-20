// pages/_app.js

import '../styles/globals.css';
import CustomItemContext from '../client/context/ItemContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      console.log('App is changing to: ', url);
    };
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const checkUsername = () => {
      const username = localStorage.getItem('username');
      if (username && username !== 'null') {
        router.push('/login');
      }
    };

    // Check initially
    checkUsername();

    // Set interval to check every minute (adjust as needed)
    const interval = setInterval(checkUsername, 60000); // Check every minute

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <CustomItemContext>
      <Component {...pageProps} />
    </CustomItemContext>
  );
}

export default MyApp;
