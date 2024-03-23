import React from 'react';

function Footer() {
  return (
    <footer className="dark:bg-gray-800 p-6 text-center cursor-pointer">
      <div className="container mx-auto px-0">
        <div className="flex justify-between items-center text-white">
          <div className="left content flex-1">
            <div>Test</div>
            <div>Tutorials</div>
            <div>Courses</div>
            <div>Mentors</div>
          </div>
          <div className="center content flex-1">
            <div>Jobs</div>
            <div>Blogs</div>
            <div>Collaborate</div>
            <div>AI/ML</div> 
          </div>
          <div className="right content flex-1">
            <div>Hacking</div>
            <div>Gaming</div>
            <div>Hackathons</div>
            <div>Events</div>
          </div>
        </div>
      </div>
      <p className="text-white mt-20">© 2024 Qonnect. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
