import React from 'react';

function Hero() {
  return (
    <div className='text-center' style={{ backgroundImage: 'url("https://i.imgur.com/EdldXhn.png")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', paddingTop: '100px', paddingBottom: '40px' }}>
        <h1 className='text-[50px] font-bold text-center mb-4'>Explore & Find
        <br/><span className='text-black-500'>Amazing Apps, Events & Developers</span></h1>
        <h2 className='text-black-700 px-8 md:px-16 mb-8'>Best Website to Discover your favorite
        <br/> apps, tutorials, mentors, jobs, collaborations, events, developers and so much more</h2>
    </div>
  );
}

export default Hero;
