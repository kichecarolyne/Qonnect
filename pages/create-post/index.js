import React, { useEffect, useState } from 'react'
import Data from '@/Data/Data';
import Data1 from '@/Data/Data1';
import Toast from '@/components/Toast';
import app from '../../Shared/firebaseConfig'
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
function CreatePost() {
    const [inputs,setInputs]=useState({})
    const [techList,setTechList]=useState([]);
    const [categoryList,setCategoryList]=useState([]);
    const [file,setFile]=useState([]);
    const [submit,setSubmit]=useState(false);
    const [showToast, setShowToast] = useState(false);
    const [docId,setDocId]=useState(Date.now().toString());

    const {data:session}=useSession();
    const db = getFirestore(app);
    const storage = getStorage(app);
    const router=useRouter();
   
    useEffect(()=>{
        if(session)
        {
            setInputs((values)=>({
                ...values, userName: session.user?.name
            }));
            setInputs((values)=>({
                ...values, userImage: session.user?.image
            }));
            setInputs((values)=>({
                ...values, email: session.user?.email
            }))
            setInputs((values)=>({
              ...values,id:docId
          }))
        }
    },[session]);

    useEffect(()=>{
      if(submit==true)
      {
          saveDoc();
      }
  },[submit])

    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
      
        setInputs((values)=>({
            ...values,[name]:value
        }))
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      setShowToast(true);
      const storageRef = ref(storage, 'connect-posts/'+file?.name);
      uploadBytes(storageRef, file).then((snapshot) => {
          console.log('Uploaded a blob or file!');
        }).then(resp=>{
          getDownloadURL(storageRef).then(async(url)=>{
              
              setInputs((values)=>({...values,
                  image:url}));          
              setSubmit(true);
  
          }) 
        }) ;
    };
    

    const saveDoc=async()=>{
        await setDoc(doc(db, "posts", Date.now().toString()), inputs);
    }  

    const onTechSelect=(name,isChecked)=>{
        if(isChecked)
        {
            setTechList(techList=>
                [...techList,name]);
        }
        else{
            let techListItem=
            techList.filter(item=>item!==name)
                setTechList(techListItem);
        }
    }

    useEffect(()=>{
        setInputs((values)=>({
            ...values,['techList']:techList
        }))
        
    },[techList])
    
    const onCategorySelect=(name,isChecked)=>{
        if(isChecked)
        {
            setCategoryList(categoryList=>
                [...categoryList,name]);
        }
        else{
            let categoryListItem=
            categoryList.filter(item=>item!==name)
                setCategoryList(categoryListItem);
        }
    }

    useEffect(()=>{
        setInputs((values)=>({
            ...values,['categoryList']:categoryList
        }))
        
    },[categoryList])


  return (
    <div
    className="flex justify-center mt-10
  shadow-md mx-4 md:mx-56 lg:mx-72 p-5 rounded-md"
  >
    {showToast ? (
      <div className="absolute top-10 right-10 z-50">
      <Toast
        msg={"Post Created Successfully"}
        closeToast={() => setShowToast(false)}
      />
    </div>
    ) : null}

    
    <form onSubmit={handleSubmit}>
      <h2
        className="text-[30px]
    font-extrabold text-blue-500"
      >
        CREATE POST
      </h2>
      <h2 className="mb-6">Create New Post and Share with Community</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        required
        onChange={handleChange}
        className="w-full mb-4 border-[1px] p-2 rounded-md"
      />
      <textarea
        name="desc"
        className="w-full mb-4 
      outline-blue-400 border-[1px] 
      p-2 rounded-md"
        required
        onChange={handleChange}
        placeholder="Write Description here"
      />
      <input
          type="date"
          name="date"
          onChange={handleChange}
          className="w-full mb-4 border-[1px] p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Location"
          name="location"
          onChange={handleChange}
          className="w-full mb-4 border-[1px] p-2 rounded-md"
        />
      <h2 className="mb-3 font-bold">Select Tools & Technologies</h2>
      <div className="grid grid-cols-2 mb-4 md:grid-cols-3  ">
        {Data.Technology.map((item,index) => (
          <div key={index} className="flex gap-2 items-center">
            <input id="technology"
            onClick={(e)=>onTechSelect(item.name,e.target.checked)}
             type="checkbox" 
             className="w-4 h-4" />
            <label>{item.name}</label>
          </div>
        ))}
      </div>
      <h2 className="mb-3 font-bold">Select Category</h2>
      <div className="grid grid-cols-2 mb-4 md:grid-cols-3  ">
        {Data1.Category.map((item,index) => (
          <div key={index} className="flex gap-2 items-center">
            <input id="category"
            onClick={(e)=>onCategorySelect(item.title,e.target.checked)}
             type="checkbox" 
             className="w-4 h-4" />
            <label>{item.title}</label>
          </div>
        ))}
      </div>
      <input
        type="text"
        name="app-demo-url"
        placeholder="App Demo Url"
        onChange={handleChange}
        className="w-full mb-4 border-[1px] p-2 rounded-md"
      />
      <input
        type="text"
        name="ui-ux-design-url"
        onChange={handleChange}
        placeholder="UI/UX Design Url(Figma)"
        className="w-full mb-4 border-[1px] p-2 rounded-md"
      />
      <input
        type="text"
        name="yt-url"
        onChange={handleChange}
        placeholder="Youtube Tutorial Url"
        className="w-full mb-4 border-[1px] p-2 rounded-md"
      />
      <input
        type="text"
        name="github-url"
        onChange={handleChange}
        placeholder="Github Source Code Url"
        className="w-full mb-4 border-[1px] p-2 rounded-md"
      />

      <input
        type="text"
        onChange={handleChange}
        name="instagram"
        placeholder="LinkedIn Profile"
        className="w-full mb-4 border-[1px] p-2 rounded-md"
      />
      <input
        type="text"
        onChange={handleChange}
        name="instagram"
        placeholder="Other"
        className="w-full mb-4 border-[1px] p-2 rounded-md"
      />
        <input
          type="file"
          onChange={(e)=>setFile(e.target.files[0])}
          accept="image/gif, image/jpeg, image/png"
          className="mb-5 border-[1px] w-full"
        />
       {/* Render submit button only if the user is logged in */}
  {session ? (
    <button
                        type="submit"
                        className="bg-blue-500 w-full p-1 rounded-md text-white"
                    >
    Submit
    </button>
    ) : (
    <p className="text-red-500">
    Please Sign In to submit a post.
    </p>
)}
    </form>
    
  </div>
  )
}

export default CreatePost