import React from 'react';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import '@/styles/globals.css';
import { SelectedPostProvider } from './SelectedPostContext';
import { UserPostsProvider } from './UserPostsContext';
import MyPosts from '@/components/Profile/MyPosts';

export default function App({ Component, pageProps, session }) {
  const router = useRouter();
  const isProfilePage = router.pathname === '/profile';

  return (
    <SessionProvider session={session}>
      <Header />
      <SelectedPostProvider>
        <UserPostsProvider>
          <Component {...pageProps} />
          {isProfilePage && <MyPosts />}
        </UserPostsProvider>
      </SelectedPostProvider>
    </SessionProvider>
  );
}
