// Profile.js
import React, { useState } from 'react';
import UserInfo from '@/components/Profile/UserInfo';
import PostModal from '@/components/PostDetails.js/PostModal';

function Profile() {
  const [bio, setBio] = useState('');
  return (
    <div className='px-10'>
      <UserInfo bio={bio} setBio={setBio} />
      <PostModal />
    </div>
  );
}

export default Profile;
