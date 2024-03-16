// Profile.js
import React, { useState } from 'react';
import MyPosts from '@/components/Profile/MyPosts';
import UserInfo from '@/components/Profile/UserInfo';

function Profile() {
  const [bio, setBio] = useState('');
  return (
    <div className='px-10'>
      <UserInfo bio={bio} setBio={setBio} /> {/* Pass bio state and setBio function as props */}
      <MyPosts />
    </div>
  );
}

export default Profile;
