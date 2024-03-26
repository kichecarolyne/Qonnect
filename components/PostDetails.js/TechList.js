import React from 'react';
import { useSelectedPost } from '../../pages/SelectedPostContext';
import Image from 'next/image';

function TechList() {
  const { selectedPost } = useSelectedPost();

  return (
    <div className='mt-10 p-5'>
      <h2 className='font-bold text-[18px]'>Technology</h2>
      <div className='grid grid-cols-3 text-center gap-2 mt-2'>
        {selectedPost?.techList && selectedPost.techList.map((tech, index) => (
          <h2 key={index} className='border-[1px] border-sky-300 px- rounded-full text-[14px]'>
            {tech}
          </h2>
        ))}
      </div>
      <div className='w-[500px] mt-5'>
        <h2 className='font-bold text-[18px]'>Source/Links</h2>
        {selectedPost?.['app-demo-url'] && (
          <h2 className='font-light mt-4 cursor-pointer' onClick={() => window.open(selectedPost['app-demo-url'])}>
            {selectedPost['app-demo-url']}
          </h2>
        )}
        {selectedPost?.['yt-url'] && (
          <h2 className='font-light mt-4 cursor-pointer flex items-center gap-2' onClick={() => window.open(selectedPost['yt-url'])}>
            <Image src='/Images/youtube.png' width={20} height={20} alt='icon' className='w-[20px]' />
            {selectedPost['yt-url']}
          </h2>
        )}
        {selectedPost?.['ui-ux-design-url'] && (
          <h2 className='font-light max-w-[75ch] flex items-center gap-2 mt-4 cursor-pointer' onClick={() => window.open(selectedPost['ui-ux-design-url'])}>
            <Image src='/Images/figma.png' width={20} height={20} alt='icon' className='w-[20px]' />
            {selectedPost['ui-ux-design-url']}
          </h2>
        )}
        {selectedPost?.['github-url'] && (
          <h2 className='font-light flex items-center gap-2 mt-4 cursor-pointer' onClick={() => window.open(selectedPost['github-url'])}>
            <Image src='/Images/github.png' width={20} height={20} alt='icon' className='w-[20px]' />
            {selectedPost['github-url']}
          </h2>
        )}
        {selectedPost?.['linkedin'] && (
          <h2 className='font-light flex items-center gap-2 mt-4 cursor-pointer' onClick={() => window.open(selectedPost['linkedin'])}>
            <Image src='/Images/linkedin.png' width={20} height={20} alt='icon' className='w-[20px]' />
            {selectedPost['linkedin']}
          </h2>
        )}
      </div>
    </div>
  );
}

export default TechList;
