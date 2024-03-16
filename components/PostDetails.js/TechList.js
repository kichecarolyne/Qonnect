import React, { useContext } from 'react'
import { SelectedPostContext } from '../Profile/MyPosts';
import Image from 'next/image'


function TechList() {
  const post = useContext(SelectedPostContext);

  // Check if post exists before using it
  if (!post) {
    return <div>Loading...</div>; // Or any other fallback UI
  }

  return (
    <div className='mt-10 p-5'>
      <h2 className='font-bold'>Technology</h2>
    <div className='grid grid-cols-3 text-center gap-2 mt-2'>
        {post?.techList.map((tech,index)=>(
          <h2 key={index} className='border-[1px] border-sky-300
           px- rounded-full text-[14px]'>{tech}</h2>
        ))}
      </div>
      <div className='w-[500px]'>
      <h2 className='font-bold mt-6'>Source/Links</h2>
         {project['app-demo-url']? 
         <h2 className='font-light mt-4 cursor-pointer flex items-center gap-2'>
           <Image src='/Images/play.png' 
           width={20} height={20} alt='icon'
            
            onClick={()=>window.open(project['app-demo-url'])} 
            className='w-[20px]'/> 
            {post['app-demo-url']}</h2>:null}
            {post['yt-url']? 
            <h2 className='font-light mt-4 cursor-pointer 
            flex items-center gap-2' onClick={()=>window.open(post['yt-url'])}>
           <Image src='/Images/youtube.png' 
           width={20} height={20} alt='icon'
            className='w-[20px]'/>  {post['yt-url']}</h2>:null}
            {post['ui-ux-design-url']?  <h2 className='font-light max-w-[75ch]
            flex items-center gap-2 mt-4 cursor-pointer' onClick={()=>window.open(post['ui-ux-design-url'])}>
            <Image src='/Images/figma.png'width={20} height={20} alt='icon'
             className='w-[20px]'/> {post['ui-ux-design-url']}</h2>:null}
            {post['github-url']?<h2 className='font-light
            flex items-center gap-2 mt-4 cursor-pointer' onClick={()=>window.open(post['github-url'])}>
           <Image src='/Images/github.png' width={20} height={20} alt='icon'
            className='w-[20px]'/> 
            {post['github-url']}</h2>:null}
            {post['linkedin']?<h2 className='font-light
            flex items-center gap-2 mt-4 cursor-pointer' onClick={()=>window.open(post['instagram'])}>
           <Image src='/Images/instagram.png' 
           width={20} height={20} alt='icon'
            className='w-[20px]'/> 
            {post['linkedin']}</h2>:null}

            </div>
    </div>
  )
}

export default TechList