import React from 'react';
import '../styles/global.css'

function Footer() {
  return (
    <footer className="dark:bg-gray-800 p-3 text-center cursor-pointer">
      <div className="container mx-auto p-3">
        <div className="flex justify-between items-center text-white">
          <div className="left content flex-1">
            <a href="#" className="footer-link">Test</a>
            <a href="#" className="footer-link">Tutorials</a>
            <a href="#" className="footer-link">Courses</a>
            <a href="#" className="footer-link">Mentors</a>
          </div>
          <div className="center content flex-1">
            <a href="#" className="footer-link">Jobs</a>
            <a href="#" className="footer-link">Blogs</a>
            <a href="#" className="footer-link">Collaborate</a>
            <a href="#" className="footer-link">AI/ML</a> 
          </div>
          <div className="right content flex-1">
            <a href="#" className="footer-link">Hacking</a>
            <a href="#" className="footer-link">Gaming</a>
            <a href="#" className="footer-link">Hackathons</a>
            <a href="#" className="footer-link">Events</a>
          </div>
        </div>
      </div>
      <p className="text-white mt-10">© 2024 Qonnect. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
